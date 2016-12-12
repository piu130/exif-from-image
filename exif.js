/**
 * Indicates start of a JPEG
 * @type {number}
 */
const jpegStartNumber = 0xFFD8;

/**
 * Indicates start of the EXIF attribute
 * @type {number}
 */
const exifStartNumber = 0xFFE1;

/**
 * Hex value for 'Exif'
 * @type {number}
 */
const exifString = 0x45786966; // Exif

/**
 * Hex value for 'II'. This indicates little endian.
 * @type {number}
 */
const littleEndianIndicator = 0x4949; // II

/**
 * Hex value for 'MM'. This indicates big endian.
 * @type {number}
 */
const bigEndianIndicator = 0x4D4D; // MM

/**
 *
 * @type {[number]}
 */
const exifPointers = [
  0x8769, // ExifIFDPointer
  0x8825, // GPSInfoIFDPointer
  0xA005  // InteroperabilityIFDPointer
];

/**
 * Filters pointer tags
 * @param tags
 * @returns {{pointerTags}}
 */
function filterPointerTags(tags) {
  const result = {};

  for (let key in tags) {
    if (tags.hasOwnProperty(key) && tags[key].pointer) {
      result[key] = tags[key];
    }
  }

  return result;
}

/**
 * Checks if dataView is from a JPEG file
 * @param {DataView} dataView
 * @returns {boolean}
 */
function isJPEG(dataView) {
  return dataView.getUint16(0, false) === jpegStartNumber;
}

/**
 * Reads the IFD data
 * @param {DataView} dataView
 * @param {number}   tiffStart
 * @param {number}   ifdOffset
 * @param {boolean}  littleEnd
 * @returns {{ifdOffset: number, numOfEntries: number, nextIfdOffset: number}}
 */
function readIFDData(dataView, tiffStart, ifdOffset, littleEnd) {
  let offset = tiffStart + ifdOffset;
  const numOfEntries = dataView.getUint16(offset, littleEnd);
  const nextIfdOffset = dataView.getUint16(offset + 2 + (numOfEntries * 12), littleEnd);

  return {
    ifdOffset,
    numOfEntries,
    nextIfdOffset
  };
}

/**
 * Read the tag at the offset of tagStart
 * @param {DataView} dataView
 * @param {number}   tiffStart
 * @param {number}   tagStart
 * @param {boolean}  littleEnd
 * @returns {{type: number, count: number, offset: number, [value]: number|string}}
 */
function readTag(dataView, tiffStart, tagStart, littleEnd) {
  // TODO refactor whole function
  let pointer = tagStart;
  const identifier = dataView.getUint16(pointer, littleEnd); pointer += 2;
  const type = dataView.getUint16(pointer, littleEnd); pointer += 2;
  const count = dataView.getUint32(pointer, littleEnd); pointer += 4;
  let offset = dataView.getUint32(pointer, littleEnd);

  const tag = {
    type,
    count,
    offset
  };

  if (exifPointers.includes(identifier)) {
    tag.pointer = true;
    return tag;
  }

  offset += tiffStart;

  let numerator, denominator;
  let value = "";

  // TODO use object spread ( {..., value} )
  switch (type) {
    case 1: // 1 BYTE 8-bit unsigned integer
      pointer = count > 4 ? offset : pointer;
      for (let i = 0; i < count; i++) {
        value += dataView.getUint8(pointer + i);
      }
      tag.value = parseInt(value, 10);
      return tag;
    case 2: // 2 ASCII 8-bit, NULL-terminated string
      pointer = count > 4 ? offset : pointer;
      for (let i = 0; i < count - 1; i++) { // -1 to remove 0x00
        value += String.fromCharCode(dataView.getUint8(pointer + i));
      }
      tag.value = value;
      return tag;
    case 3: // 3 SHORT 16-bit unsigned integer
      pointer = count > 2 ? offset : pointer;
      for (let i = 0; i < count; i++) {
        value += dataView.getUint16(pointer + 2 * i, littleEnd);
      }
      tag.value = parseInt(value, 10);
      return tag;
    case 4: // 4 LONG 32-bit unsigned integer
      pointer = count > 1 ? offset : pointer;
      for (let i = 0; i < count; i++) {
        value += dataView.getUint32(pointer + 4 * i, littleEnd);
      }
      tag.value = parseInt(value, 10);
      return tag;
    case 5: // 5 RATIONAL Two 32-bit unsigned integers
      pointer = count > 1 ? offset : pointer;
      if(count === 1) {
        numerator = dataView.getUint32(pointer, littleEnd);
        denominator = dataView.getUint32(pointer + 4, littleEnd);
        tag.value = numerator / denominator;
      } else {
        const values = [];
        for (let i = 0; i < count; i++) {
          numerator = dataView.getUint32(pointer + 4 * i, littleEnd);
          denominator = dataView.getUint32(pointer + 4 * i + 4, littleEnd);
          values.push(numerator/denominator);
        }
        tag.values = values;
      }
      return tag;
    case 6: // 6 SBYTE 8-bit signed integer
      pointer = count > 4 ? offset : pointer;
      for (let i = 0; i < count; i++) {
        value += dataView.getInt8(pointer + i);
      }
      tag.value = parseInt(value, 10);
      return tag;
    case 7: // 7 UNDEFINE 8-bit byte
      // TODO
      tag.value = "TODO";
      return tag;
    case 8: // 8 SSHORT 16-bit signed integer
      pointer = count > 2 ? offset : pointer;
      for (let i = 0; i < count; i++) {
        value += dataView.getInt16(pointer + 2 * i, littleEnd);
      }
      tag.value = parseInt(value, 10);
      return tag;
    case 9: // 9 SLONG 32-bit signed integer
      pointer = count > 1 ? offset : pointer;
      for (let i = 0; i < count; i++) {
        value += dataView.getInt32(pointer + 4 * i, littleEnd);
      }
      tag.value = parseInt(value, 10);
      return tag;
    case 10: // 10 SRATIONAL Two 32-bit signed integers
      pointer = count > 1 ? offset : pointer;
      if(count === 1) {
        numerator = dataView.getInt32(pointer, littleEnd);
        denominator = dataView.getInt32(pointer + 4, littleEnd);
        tag.value = numerator / denominator;
      } else {
        const values = [];
        for (let i = 0; i < count; i++) {
          numerator = dataView.getInt32(pointer + 4 * i, littleEnd);
          denominator = dataView.getInt32(pointer + 4 * i + 4, littleEnd);
          values.push(numerator/denominator);
        }
        tag.values = values;
      }
      return tag;
    case 11: // 11 FLOAT 4-byte single-precision IEEE floating-point value
      // TODO
      console.log("TODO: Double is currently not supported because I don't have any examples. Please provide an example.");
      tag.value = "TODO";
      return tag;
    case 12: // 12 DOUBLE 8-byte double-precision IEEE floating-point value
      // TODO
      console.log("TODO: Double is currently not supported because I don't have any examples. Please provide an example.");
      tag.value = "TODO";
      return tag;
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
function readTags(dataView, tiffStart, ifdOffset, littleEnd, count) {
  let offset = tiffStart + ifdOffset;

  const numOfEntries = count || dataView.getUint16(offset, littleEnd); offset += 2;
  const tags = {};

  for (let i = 0; i < numOfEntries; i++) {
    const identifier = dataView.getUint16(offset + (12 * i), littleEnd);
    tags[identifier] = readTag(dataView, tiffStart, offset + (12 * i), littleEnd);
  }

  return tags;
}

/**
 * Returns the offset of the EXIF start
 * @param {DataView} dataView
 * @returns {number} -1 if no start found
 */
function searchStartOfExif(dataView) {
  const length = dataView.byteLength;
  let offset = 2; // +2 to skip jpegStartNumber
  while (offset < length) {
    const marker = dataView.getUint16(offset);
    if (marker === exifStartNumber) {
      return offset;
    }
    else if ((marker & 0xFF00) != 0xFF00) break; // not start with 0xFF -> no marker
    else offset += 2;
  }

  return -1;
}
