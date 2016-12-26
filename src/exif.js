import {jpegStartNumber, exifPointer, exifStartNumber, exifString, littleEndianIndicator, getAllTags} from 'exif-tags'

/**
 * Transforms a file to a DataView
 * @param file      File to transform
 * @param onSuccess Success callback
 * @param onError   Error callback
 */
function fileToDataView (file, onSuccess, onError) {
  const reader = new FileReader()
  reader.onload = function (e) {
    onSuccess(new DataView(e.target.result))
  }
  reader.onerror = function (error) {
    onError(error)
  }
  reader.readAsArrayBuffer(file)
}

/**
 * Filters pointer tags
 * @param tags
 * @returns {{pointerTags}}
 */
function filterPointerTags (tags) {
  const result = {}

  for (let key in tags) {
    if (tags.hasOwnProperty(key) && tags[key].pointer) {
      result[key] = tags[key]
    }
  }

  return result
}

function getAllTagsFromFile (file, onSuccess, onError) {
  fileToDataView(
    file,
    function (dataView) {
      if (!isJPEG(dataView)) { throw new Error('No JPEG.') }

      const exifStart = searchStartOfExif(dataView, 0)

      let offset = exifStart + 2 // +2 skip exifStartNumber
      // const exifSectionLen = dataView.getUint16(offset)
      offset += 2
      if (dataView.getUint32(offset) !== exifString) return -1
      offset += 6 // +2 bytes zeroed

      const tiffStart = offset
      const littleEnd = dataView.getUint16(offset) === littleEndianIndicator
      offset += 4 // +2 2A00 = TIFF marker

      let ifdData = {}
      ifdData.nextIfdOffset = dataView.getUint32(offset, littleEnd) // first 4 byte in dir indicates the start of the IFD -> 0x08 if direct after header
      const tags = {}

      do {
        ifdData = readIFDData(dataView, tiffStart, ifdData.nextIfdOffset, littleEnd)
        const currentTags = readTags(dataView, tiffStart, ifdData.ifdOffset, littleEnd, ifdData.numOfEntries)

        Object.assign(tags, currentTags)

        const pointers = filterPointerTags(currentTags)
        for (let pointer in pointers) {
          Object.assign(tags, readTags(dataView, tiffStart, pointers[pointer].offset, littleEnd, undefined))
        }
      } while (ifdData.nextIfdOffset !== 0x00)

      onSuccess(tags)
    },
    onError
  )
}

/**
 * Checks if dataView is from a JPEG file
 * @param {DataView} dataView
 * @returns {boolean}
 */
function isJPEG (dataView) {
  return dataView.getUint16(0, false) === jpegStartNumber
}

/**
 * Reads the IFD data
 * @param {DataView} dataView
 * @param {number}   tiffStart
 * @param {number}   ifdOffset
 * @param {boolean}  littleEnd
 * @returns {{ifdOffset: number, numOfEntries: number, nextIfdOffset: number}}
 */
function readIFDData (dataView, tiffStart, ifdOffset, littleEnd) {
  let offset = tiffStart + ifdOffset
  const numOfEntries = dataView.getUint16(offset, littleEnd)
  const nextIfdOffset = dataView.getUint16(offset + 2 + (numOfEntries * 12), littleEnd)

  return {
    ifdOffset,
    numOfEntries,
    nextIfdOffset
  }
}

/**
 * Read the tag at the offset of tagStart
 * @param {DataView} dataView
 * @param {number}   tiffStart
 * @param {number}   tagStart
 * @param {boolean}  littleEnd
 * @returns {{type: number, count: number, offset: number, [value]: number|string, [values]: [number]}}
 */
function readTag (dataView, tiffStart, tagStart, littleEnd) {
  let pointer = tagStart
  const identifier = dataView.getUint16(pointer, littleEnd); pointer += 2
  const type = dataView.getUint16(pointer, littleEnd); pointer += 2
  const count = dataView.getUint32(pointer, littleEnd); pointer += 4
  let offset = dataView.getUint32(pointer, littleEnd)

  const tagName = getAllTags()[identifier] || identifier

  const tag = {
    tagName,
    identifier,
    type,
    count,
    offset
  }

  if (exifPointer.hasOwnProperty(identifier)) {
    tag.pointer = true
    return tag
  }

  offset += tiffStart

  let numerator, denominator
  let value
  const values = []

  switch (type) {
    case 1: { // 1 BYTE 8-bit unsigned integer
      if (count === 1) {
        return {
          ...tag,
          value: dataView.getUint8(pointer)
        }
      }
      pointer = count > 4 ? offset : pointer
      for (let i = 0; i < count; i++) {
        values.push(dataView.getUint8(pointer + i))
      }
      return {
        ...tag,
        values
      }
    }
    case 2: { // 2 ASCII 8-bit, NULL-terminated string
      if (count === 1) {
        value = String.fromCharCode(dataView.getUint8(pointer))
      } else {
        value = ''
        pointer = count > 4 ? offset : pointer
        for (let i = 0; i < count - 1; i++) { // -1 to remove 0x00
          value += String.fromCharCode(dataView.getUint8(pointer + i))
        }
      }

      return {
        ...tag,
        value
      }
    }
    case 3: { // 3 SHORT 16-bit unsigned integer
      if (count === 1) {
        return {
          ...tag,
          value: dataView.getUint16(pointer, littleEnd)
        }
      }
      pointer = count > 2 ? offset : pointer
      for (let i = 0; i < count; i++) {
        values.push(dataView.getUint16(pointer + 2 * i, littleEnd))
      }

      return {
        ...tag,
        values
      }
    }
    case 4: { // 4 LONG 32-bit unsigned integer
      if (count === 1) {
        return {
          ...tag,
          value: dataView.getUint32(pointer, littleEnd)
        }
      }
      pointer = offset
      for (let i = 0; i < count; i++) {
        values.push(dataView.getUint32(pointer + 4 * i, littleEnd))
      }

      return {
        ...tag,
        values
      }
    }
    case 5: { // 5 RATIONAL Two 32-bit unsigned integers
      pointer = offset
      if (count === 1) {
        numerator = dataView.getUint32(pointer, littleEnd)
        denominator = dataView.getUint32(pointer + 4, littleEnd)
        return {
          ...tag,
          value: numerator / denominator
        }
      }
      for (let i = 0; i < count; i++) {
        numerator = dataView.getUint32(pointer + 4 * i, littleEnd)
        denominator = dataView.getUint32(pointer + 4 * i + 4, littleEnd)
        values.push(numerator / denominator)
      }

      return {
        ...tag,
        values
      }
    }
    case 6: { // 6 SBYTE 8-bit signed integer
      if (count === 1) {
        return {
          ...tag,
          value: dataView.getInt8(pointer)
        }
      }
      pointer = count > 4 ? offset : pointer
      for (let i = 0; i < count; i++) {
        values.push(dataView.getInt8(pointer + i))
      }

      return {
        ...tag,
        values
      }
    }
    case 7: { // 7 UNDEFINE 8-bit byte
      // TODO
      tag.value = 'TODO'
      return tag
    }
    case 8: { // 8 SSHORT 16-bit signed integer
      if (count === 1) {
        return {
          ...tag,
          value: dataView.getInt16(pointer, littleEnd)
        }
      }
      pointer = count > 2 ? offset : pointer
      for (let i = 0; i < count; i++) {
        values.push(dataView.getInt16(pointer + 2 * i, littleEnd))
      }

      return {
        ...tag,
        values
      }
    }
    case 9: { // 9 SLONG 32-bit signed integer
      if (count === 1) {
        return {
          ...tag,
          value: dataView.getInt32(pointer, littleEnd)
        }
      }
      pointer = offset
      for (let i = 0; i < count; i++) {
        values.push(dataView.getInt32(pointer + 4 * i, littleEnd))
      }

      return {
        ...tag,
        values
      }
    }
    case 10: { // 10 SRATIONAL Two 32-bit signed integers
      pointer = offset
      if (count === 1) {
        numerator = dataView.getInt32(pointer, littleEnd)
        denominator = dataView.getInt32(pointer + 4, littleEnd)
        return {
          ...tag,
          value: numerator / denominator
        }
      }
      for (let i = 0; i < count; i++) {
        numerator = dataView.getInt32(pointer + 4 * i, littleEnd)
        denominator = dataView.getInt32(pointer + 4 * i + 4, littleEnd)
        values.push(numerator / denominator)
      }

      return {
        ...tag,
        values
      }
    }
    case 11: { // 11 FLOAT 4-byte single-precision IEEE floating-point value
      // TODO
      console.log("TODO: Double is currently not tested because I don't have any examples. Please provide an example.")
      if (count === 1) {
        return {
          ...tag,
          value: dataView.getFloat32(pointer, littleEnd)
        }
      }
      pointer = offset
      for (let i = 0; i < count; i++) {
        values.push(dataView.getFloat32(pointer + 4 * i, littleEnd))
      }

      return {
        ...tag,
        values
      }
    }
    case 12: { // 12 DOUBLE 8-byte double-precision IEEE floating-point value
      // TODO
      console.log("TODO: Double is currently not tested because I don't have any examples. Please provide an example.")
      pointer = offset
      if (count === 1) {
        return {
          ...tag,
          value: dataView.getFloat64(pointer, littleEnd)
        }
      }
      for (let i = 0; i < count; i++) {
        values.push(dataView.getFloat64(pointer + 8 * i, littleEnd))
      }

      return {
        ...tag,
        values
      }
    }
  }
}

/**
 * Reads the tags in the IFD
 * @param {DataView}         dataView
 * @param {number}           tiffStart
 * @param {number}           ifdOffset
 * @param {boolean}          littleEnd
 * @param {number|undefined} count if undefined I fetch it from the next 16 bits
 * @returns {{tags}} see readTag
 */
function readTags (dataView, tiffStart, ifdOffset, littleEnd, count) {
  let offset = tiffStart + ifdOffset

  const numOfEntries = count || dataView.getUint16(offset, littleEnd); offset += 2
  const tags = {}

  for (let i = 0; i < numOfEntries; i++) {
    const identifier = dataView.getUint16(offset + (12 * i), littleEnd)

    tags[identifier] = readTag(dataView, tiffStart, offset + (12 * i), littleEnd)
  }

  return tags
}

/**
 * Returns the offset of the EXIF start
 * @param {DataView} dataView
 * @param {number}   startOffset To search next start (e.g. FFE2)
 * @returns {number} -1 if no start found
 */
function searchStartOfExif (dataView, startOffset) {
  const length = dataView.byteLength

  let offset = startOffset + 2 || 2 // +2 to skip jpegStartNumber
  while (offset < length) {
    const marker = dataView.getUint16(offset)
    if (marker === exifStartNumber) {
      return offset
    } else if ((marker & 0xFF00) !== 0xFF00) break // not start with 0xFF -> no marker
    else offset += 2
  }

  return -1
}

export {fileToDataView, filterPointerTags, isJPEG, readIFDData, readTag, readTags, searchStartOfExif, getAllTagsFromFile}
