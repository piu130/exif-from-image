import {
  jpegStartNumber,
  exifPointerTags,
  exifStartNumber,
  exifString,
  littleEndianIndicator,
  allTags
} from 'exif-tags'
import { readValue } from './readType'

/**
 * Filters pointer tags.
 * @param {Object.<number, tag>} tags Tags to filter.
 * @returns {{pointerTags}} Pointer tags.
 */
export const filterPointerTags = (tags) => {
  const result = {}

  for (let key in tags) {
    if (tags.hasOwnProperty(key) && tags[key].pointer) {
      result[key] = tags[key]
    }
  }

  return result
}

/**
 * Returns all tags is data view.
 * @param {DataView} dataView DataView.
 * @returns {Object.<number, tag>} Tags.
 */
export const getAllTags = (dataView) => {
  if (!isJPEG(dataView)) throw new Error('No JPEG.')

  const exifStart = searchStartOfExif(dataView)

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
      Object.assign(tags, readTags(dataView, tiffStart, pointers[pointer].offset, littleEnd))
    }
  } while (ifdData.nextIfdOffset !== 0x00)

  return tags
}

/**
 * Checks if dataView is from a JPEG file.
 * @param {DataView} dataView DataView to check.
 * @returns {boolean} True if JPEG, otherwise false.
 */
export const isJPEG = (dataView) => dataView.getUint16(0, false) === jpegStartNumber

/**
 * @typedef ifdData
 * @type {Object}
 * @property {number} ifdOffset
 * @property {number} numOfEntries
 * @property {number} nextIfdOffset
 */

/**
 * Reads the IFD data.
 * @param {DataView} dataView DataView.
 * @param {number}   tiffStart Start of tiff.
 * @param {number}   ifdOffset Offset of ifd data.
 * @param {boolean}  littleEnd Flag defining reading in little or big endian.
 * @returns {ifdData} IFD data.
 */
export const readIFDData = (dataView, tiffStart, ifdOffset, littleEnd) => {
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
 * @typedef tag
 * @type {Object}
 * @property {string} tagName Human readable tag name.
 * @property {number} identifier Tag identifier.
 * @property {number} type EXIF type of the tag.
 * @property {number} count Number of tags.
 * @property {number} offset Offset of the tag.
 * @property {number} tagStart Start of tag in data view.
 * @property {number|string|Array<number>} value
 */

/**
 * Read the tag at the offset of tagStart.
 * @param {DataView} dataView DataView.
 * @param {number} tiffStart Start offset of tiff.
 * @param {number} tagStart Start offset for the tag.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @returns {tag} Read tag.
 */
export function readTag (dataView, tiffStart, tagStart, littleEnd) {
  let pointer = tagStart
  const identifier = dataView.getUint16(pointer, littleEnd); pointer += 2
  const type = dataView.getUint16(pointer, littleEnd); pointer += 2
  const count = dataView.getUint32(pointer, littleEnd); pointer += 4
  let offset = dataView.getUint32(pointer, littleEnd)

  const tagName = allTags[identifier] || 'unknown'

  const tag = {
    tagName,
    identifier,
    type,
    count,
    offset,
    tagStart
  }

  if (exifPointerTags.hasOwnProperty(identifier)) {
    tag.pointer = true
    return tag
  }

  return {
    ...tag,
    value: readValue(dataView, type, offset + tiffStart, pointer, littleEnd, count)
  }
}

/**
 * Reads the tags in the IFD.
 * @param {DataView} dataView DataView.
 * @param {number} tiffStart Start offset of tiff tags.
 * @param {number} ifdOffset Start offset of idf tags.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=undefined} [count] Tags to read. If not specified it's fetched from the next 16 bits.
 * @returns {Object<number, tag>} Tags by identifier.
 */
export const readTags = (dataView, tiffStart, ifdOffset, littleEnd, count = undefined) => {
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
 * Returns the offset of the marker start.
 * @param {DataView} dataView DataView.
 * @param {number} marker Marker (e.g. ffe1).
 * @param {number=0} startOffset Offset to skip for searching next start.
 * @returns {number} Offset of EXIF start, -1 if no start found.
 */
export const searchMarker = (dataView, marker, startOffset = 0) => {
  for (let offset = startOffset + 2; offset < dataView.byteLength; offset += 2) {
    if (dataView.getUint16(offset) === marker) return offset
  }

  return -1
}

/**
 * Returns the offset of the EXIF start.
 * @param {DataView} dataView DataView.
 * @param {number=0} startOffset Offset to skip for searching next start.
 * @returns {number} Offset of EXIF start, -1 if no start found.
 */
export const searchStartOfExif = (dataView, startOffset = 0) => searchMarker(dataView, exifStartNumber, startOffset)
