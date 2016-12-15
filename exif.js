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

const exifPointer = {
  0x8769: 'ExifIFDPointer',
  0x8825: 'GPSInfoIFDPointer',
  0xA005: 'InteroperabilityIFDPointer'
};

const TIFF = {
  imageDataStructure: {
    0x0100: 'ImageWidth',
    0x0101: 'ImageLength',
    0x0102: 'BitsPerSample',
    0x0103: 'Compression',
    0x0106: 'PhotometricInterpretation',
    0x0112: 'Orientation',
    0x0115: 'SamplesPerPixel',
    0x011C: 'PlanarConfiguration',
    0x0212: 'YCbCrSubSampling',
    0x0213: 'YCbCrPositioning',
    0x011A: 'XResolution',
    0x011B: 'YResolution',
    0x0128: 'ResolutionUnit'
  },
  recordingOffset: {
    0x0111: 'StripOffsets',
    0x0116: 'RowsPerStrip',
    0x0117: 'StripByteCounts',
    0x0201: 'JPEGInterchangeFormat',
    0x0202: 'JPEGInterchangeFormatLength'
  },
  imageDataCharacteristic: {
    0x012D: 'TransferFunction',
    0x013E: 'WhitePoint',
    0x013F: 'PrimaryChromaticities',
    0x0211: 'YCbCrCoefficients',
    0x0214: 'ReferenceBlackWhite'
  },
  other: {
    0x0132: 'DateTime',
    0x010E: 'ImageDescription',
    0x010F: 'Make',
    0x0110: 'Model',
    0x0131: 'Software',
    0x013B: 'Artist',
    0x8298: 'Copyright'
  }
};
const EXIFIFD = {
  version: {
    0x9000: 'ExifVersion',
    0xA000: 'FlashpixVersion'
  },
  imageDataCharacteristic: {
    0xA001: 'ColorSpace',
    0xA500: 'Gamma'
  },
  imageConfiguration: {
    0x9101: 'ComponentsConfiguration',
    0x9102: 'CompressedBitsPerPixel',
    0xA002: 'PixelXDimension',
    0xA003: 'PixelYDimension'
  },
  userInformation: {
    0x927C: 'MakerNote',
    0x9286: 'UserComment'
  },
  fileInformation: {
    0xA004: 'RelatedSoundFile'
  },
  dateAndTime: {
    0x9003: 'DateTimeOriginal',
    0x9004: 'DateTimeDigitized',
    0x9010: 'Time',
    0x9011: 'OffsetTimeOriginal',
    0x9012: 'OffsetTimeDigitized',
    0x9290: 'SubSecTime',
    0x9291: 'SubSecTimeOriginal',
    0x9292: 'SubSecTimeDigitized'
  },
  pictureTakingConditions: {
    0x829A: 'ExposureTime',
    0x829D: 'FNumber',
    0x8822: 'ExposureProgram',
    0x8824: 'SpectralSensitivity',
    0x8827: 'PhotographicSensitivity',
    0x8828: 'OECF',
    0x8830: 'SensitivityType',
    0x8831: 'StandardOutputSensitivity',
    0x8832: 'RecommendedExposureIndex',
    0x8833: 'ISOSpeed',
    0x8834: 'ISOSpeedLatitudeyyy',
    0x8835: 'ISOSpeedLatitudezzz',
    0x9201: 'ShutterSpeedValue',
    0x9202: 'ApertureValue',
    0x9203: 'BrightnessValue',
    0x9204: 'ExposureBiasValue',
    0x9205: 'MaxApertureValue',
    0x9206: 'SubjectDistance',
    0x9207: 'MeteringMode',
    0x9208: 'LightSource',
    0x9209: 'Flash',
    0x920A: 'FocalLength',
    0x9214: 'SubjectArea',
    0xA20B: 'FlashEnergy',
    0xA20C: 'SpatialFrequencyResponse',
    0xA20E: 'FocalPlaneXResolution',
    0xA20F: 'FocalPlaneYResolution',
    0xA210: 'FocalPlaneResolutionUnit',
    0xA214: 'SubjectLocation',
    0xA215: 'ExposureIndex',
    0xA217: 'SensingMethod',
    0xA300: 'FileSource',
    0xA301: 'SceneType',
    0xA302: 'CFAPattern',
    0xA401: 'CustomRendered',
    0xA402: 'ExposureMode',
    0xA403: 'WhiteBalance',
    0xA404: 'DigitalZoomRatio',
    0xA405: 'FocalLengthIn35mmFilm',
    0xA406: 'SceneCaptureType',
    0xA407: 'GainControl',
    0xA408: 'Contrast',
    0xA409: 'Saturation',
    0xA40A: 'Sharpness',
    0xA40B: 'DeviceSettingDescription',
    0xA40C: 'SubjectDistanceRange'
  },
  shootingSituation: {
    0x9400: 'Temperature',
    0x9401: 'Humidity',
    0x9402: 'Pressure',
    0x9403: 'WaterDepth',
    0x9404: 'Acceleration',
    0x9405: 'CameraElevationAngle'
  },
  others: {
    0xA420: 'ImageUniqueID',
    0xA430: 'CameraOwnerName',
    0xA431: 'BodySerialNumber',
    0xA432: 'LensSpecification',
    0xA433: 'LensMake',
    0xA434: 'LensModel',
    0xA435: 'LensSerialNumber'
  }
};
const GPS = {
  0x0000: 'GPSVersionID',
  0x0001: 'GPSLatitudeRef',
  0x0002: 'GPSLatitude',
  0x0003: 'GPSLongitudeRef',
  0x0004: 'GPSLongitude',
  0x0005: 'GPSAltitudeRef',
  0x0006: 'GPSAltitude',
  0x0007: 'GPSTimeStamp',
  0x0008: 'GPSSatellites',
  0x0009: 'GPSStatus',
  0x000A: 'GPSMeasureMode',
  0x000B: 'GPSDOP',
  0x000C: 'GPSSpeedRef',
  0x000D: 'GPSSpeed ',
  0x000E: 'GPSTrackRef',
  0x000F: 'GPSTrack',
  0x0010: 'GPSImgDirectionRef',
  0x0011: 'GPSImgDirection',
  0x0012: 'GPSMapDatum',
  0x0013: 'GPSDestLatitudeRef',
  0x0014: 'GPSDestLatitude',
  0x0015: 'GPSDestLongitudeRef',
  0x0016: 'GPSDestLongitude',
  0x0017: 'GPSDestBearingRef',
  0x0018: 'GPSDestBearing',
  0x0019: 'GPSDestDistanceRef',
  0x001A: 'GPSDestDistance',
  0x001B: 'GPSProcessingMethod',
  0x001C: 'GPSAreaInformation',
  0x001D: 'GPSDateStamp',
  0x001E: 'GPSDifferential',
  0x001F: 'GPSHPositioningError'
};

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
    identifier,
    type,
    count,
    offset
  };

  if (exifPointer.hasOwnProperty(identifier)) {
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
