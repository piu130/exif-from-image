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
  0xA005 // InteroperabilityIFDPointer
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
