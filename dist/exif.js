/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(exports, "bigEndianIndicator", function() { return bigEndianIndicator; });
/* harmony export (binding) */ __webpack_require__.d(exports, "jpegStartNumber", function() { return jpegStartNumber; });
/* harmony export (binding) */ __webpack_require__.d(exports, "exifStartNumber", function() { return exifStartNumber; });
/* harmony export (binding) */ __webpack_require__.d(exports, "exifString", function() { return exifString; });
/* harmony export (binding) */ __webpack_require__.d(exports, "littleEndianIndicator", function() { return littleEndianIndicator; });
/* harmony export (binding) */ __webpack_require__.d(exports, "exifPointer", function() { return exifPointer; });
/* harmony export (binding) */ __webpack_require__.d(exports, "tiff", function() { return tiff; });
/* harmony export (binding) */ __webpack_require__.d(exports, "exifIfd", function() { return exifIfd; });
/* harmony export (binding) */ __webpack_require__.d(exports, "gps", function() { return gps; });
/* harmony export (binding) */ __webpack_require__.d(exports, "allTags", function() { return allTags; });
/**
 * Hex value for 'MM'. This indicates big endian.
 * @type {number}
 */
const bigEndianIndicator = 0x4D4D // MM

/**
 * EXIF IFD tags
 * @type {object}
 */
const exifIfd = {
  0x9000: 'ExifVersion',
  0xA000: 'FlashpixVersion',
  0xA001: 'ColorSpace',
  0xA500: 'Gamma',
  0x9101: 'ComponentsConfiguration',
  0x9102: 'CompressedBitsPerPixel',
  0xA002: 'PixelXDimension',
  0xA003: 'PixelYDimension',
  0x927C: 'MakerNote',
  0x9286: 'UserComment',
  0xA004: 'RelatedSoundFile',
  0x9003: 'DateTimeOriginal',
  0x9004: 'DateTimeDigitized',
  0x9010: 'Time',
  0x9011: 'OffsetTimeOriginal',
  0x9012: 'OffsetTimeDigitized',
  0x9290: 'SubSecTime',
  0x9291: 'SubSecTimeOriginal',
  0x9292: 'SubSecTimeDigitized',
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
  0xA40C: 'SubjectDistanceRange',
  0x9400: 'Temperature',
  0x9401: 'Humidity',
  0x9402: 'Pressure',
  0x9403: 'WaterDepth',
  0x9404: 'Acceleration',
  0x9405: 'CameraElevationAngle',
  0xA420: 'ImageUniqueID',
  0xA430: 'CameraOwnerName',
  0xA431: 'BodySerialNumber',
  0xA432: 'LensSpecification',
  0xA433: 'LensMake',
  0xA434: 'LensModel',
  0xA435: 'LensSerialNumber',
  0xEA1D: 'OffsetSchema'
}

/**
 * EXIF pointers
 * @type {object}
 */
const exifPointer = {
  0x8769: 'ExifIFDPointer',
  0x8825: 'GPSInfoIFDPointer',
  0xA005: 'InteroperabilityIFDPointer'
}

/**
 * Indicates start of the EXIF attribute
 * @type {number}
 */
const exifStartNumber = 0xFFE1

/**
 * Hex value for 'Exif'
 * @type {number}
 */
const exifString = 0x45786966 // Exif

/**
 * GPS tags
 * @type {object}
 */
const gps = {
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
}

/**
 * Indicates start of a JPEG
 * @type {number}
 */
const jpegStartNumber = 0xFFD8

/**
 * Hex value for 'II'. This indicates little endian.
 * @type {number}
 */
const littleEndianIndicator = 0x4949 // II

/**
 * TIFF tags
 * @type {object}
 */
const tiff = {
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
  0x0128: 'ResolutionUnit',
  0x0111: 'StripOffsets',
  0x0116: 'RowsPerStrip',
  0x0117: 'StripByteCounts',
  0x0201: 'JPEGInterchangeFormat',
  0x0202: 'JPEGInterchangeFormatLength',
  0x012D: 'TransferFunction',
  0x013E: 'WhitePoint',
  0x013F: 'PrimaryChromaticities',
  0x0211: 'YCbCrCoefficients',
  0x0214: 'ReferenceBlackWhite',
  0x0132: 'DateTime',
  0x010E: 'ImageDescription',
  0x010F: 'Make',
  0x0110: 'Model',
  0x0131: 'Software',
  0x013B: 'Artist',
  0x8298: 'Copyright'
}

/**
 * Returns all tags in a flat structure
 * @returns {*}
 */
const allTags = Object.assign({},
  exifPointer,
  tiff,
  exifIfd,
  gps
)




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTagsFromFile = exports.searchStartOfExif = exports.readTags = exports.readTag = exports.readIFDData = exports.isJPEG = exports.filterPointerTags = exports.fileToDataView = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _exifTags = __webpack_require__(0);

/**
 * Transforms a file to a DataView
 * @param file      File to transform
 * @param onSuccess Success callback
 * @param onError   Error callback
 */
function fileToDataView(file, onSuccess, onError) {
  var reader = new FileReader();
  reader.onload = function (e) {
    onSuccess(new DataView(e.target.result));
  };
  reader.onerror = function (error) {
    onError(error);
  };
  reader.readAsArrayBuffer(file);
}

/**
 * Filters pointer tags
 * @param tags
 * @returns {{pointerTags}}
 */
function filterPointerTags(tags) {
  var result = {};

  for (var key in tags) {
    if (tags.hasOwnProperty(key) && tags[key].pointer) {
      result[key] = tags[key];
    }
  }

  return result;
}

/**
 * Returns all tags from a file
 * @param file
 * @param onSuccess
 * @param onError
 */
function getAllTagsFromFile(file, onSuccess, onError) {
  fileToDataView(file, function (dataView) {
    if (!isJPEG(dataView)) {
      throw new Error('No JPEG.');
    }

    var exifStart = searchStartOfExif(dataView, 0);

    var offset = exifStart + 2; // +2 skip exifStartNumber
    // const exifSectionLen = dataView.getUint16(offset)
    offset += 2;
    if (dataView.getUint32(offset) !== _exifTags.exifString) return -1;
    offset += 6; // +2 bytes zeroed

    var tiffStart = offset;
    var littleEnd = dataView.getUint16(offset) === _exifTags.littleEndianIndicator;
    offset += 4; // +2 2A00 = TIFF marker

    var ifdData = {};
    ifdData.nextIfdOffset = dataView.getUint32(offset, littleEnd); // first 4 byte in dir indicates the start of the IFD -> 0x08 if direct after header
    var tags = {};

    do {
      ifdData = readIFDData(dataView, tiffStart, ifdData.nextIfdOffset, littleEnd);
      var currentTags = readTags(dataView, tiffStart, ifdData.ifdOffset, littleEnd, ifdData.numOfEntries);

      Object.assign(tags, currentTags);

      var pointers = filterPointerTags(currentTags);
      for (var pointer in pointers) {
        Object.assign(tags, readTags(dataView, tiffStart, pointers[pointer].offset, littleEnd, undefined));
      }
    } while (ifdData.nextIfdOffset !== 0x00);

    onSuccess(tags);
  }, onError);
}

/**
 * Checks if dataView is from a JPEG file
 * @param {DataView} dataView
 * @returns {boolean}
 */
function isJPEG(dataView) {
  return dataView.getUint16(0, false) === _exifTags.jpegStartNumber;
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
  var offset = tiffStart + ifdOffset;
  var numOfEntries = dataView.getUint16(offset, littleEnd);
  var nextIfdOffset = dataView.getUint16(offset + 2 + numOfEntries * 12, littleEnd);

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
 * @returns {{type: number, count: number, offset: number, [value]: number|string, [values]: [number]}}
 */
function readTag(dataView, tiffStart, tagStart, littleEnd) {
  var pointer = tagStart;
  var identifier = dataView.getUint16(pointer, littleEnd);pointer += 2;
  var type = dataView.getUint16(pointer, littleEnd);pointer += 2;
  var count = dataView.getUint32(pointer, littleEnd);pointer += 4;
  var offset = dataView.getUint32(pointer, littleEnd);

  var tagName = _exifTags.allTags[identifier] || 'unknown';

  var tag = {
    tagName,
    identifier,
    type,
    count,
    offset,
    tagStart
  };

  if (_exifTags.exifPointer.hasOwnProperty(identifier)) {
    tag.pointer = true;
    return tag;
  }

  offset += tiffStart;

  var numerator = void 0,
      denominator = void 0;
  var value = void 0;
  var values = [];

  switch (type) {
    case 1: // 1 BYTE 8-bit unsigned integer
    case 7:
      {
        if (count === 1) {
          return _extends({}, tag, {
            value: dataView.getUint8(pointer)
          });
        }
        pointer = count > 4 ? offset : pointer;
        for (var i = 0; i < count; i++) {
          values.push(dataView.getUint8(pointer + i));
        }
        return _extends({}, tag, {
          values
        });
      }
    case 2:
      {
        // 2 ASCII 8-bit, NULL-terminated string
        if (count === 1) {
          value = String.fromCharCode(dataView.getUint8(pointer));
        } else {
          value = '';
          pointer = count > 4 ? offset : pointer;
          for (var _i = 0; _i < count - 1; _i++) {
            // -1 to remove 0x00
            value += String.fromCharCode(dataView.getUint8(pointer + _i));
          }
        }

        return _extends({}, tag, {
          value
        });
      }
    case 3:
      {
        // 3 SHORT 16-bit unsigned integer
        if (count === 1) {
          return _extends({}, tag, {
            value: dataView.getUint16(pointer, littleEnd)
          });
        }
        pointer = count > 2 ? offset : pointer;
        for (var _i2 = 0; _i2 < count; _i2++) {
          values.push(dataView.getUint16(pointer + 2 * _i2, littleEnd));
        }

        return _extends({}, tag, {
          values
        });
      }
    case 4:
      {
        // 4 LONG 32-bit unsigned integer
        if (count === 1) {
          return _extends({}, tag, {
            value: dataView.getUint32(pointer, littleEnd)
          });
        }
        pointer = offset;
        for (var _i3 = 0; _i3 < count; _i3++) {
          values.push(dataView.getUint32(pointer + 4 * _i3, littleEnd));
        }

        return _extends({}, tag, {
          values
        });
      }
    case 5:
      {
        // 5 RATIONAL Two 32-bit unsigned integers
        pointer = offset;
        if (count === 1) {
          numerator = dataView.getUint32(pointer, littleEnd);
          denominator = dataView.getUint32(pointer + 4, littleEnd);
          return _extends({}, tag, {
            value: numerator / denominator
          });
        }
        for (var _i4 = 0; _i4 < count; _i4++) {
          numerator = dataView.getUint32(pointer + 4 * _i4, littleEnd);
          denominator = dataView.getUint32(pointer + 4 * _i4 + 4, littleEnd);
          values.push(numerator / denominator);
        }

        return _extends({}, tag, {
          values
        });
      }
    case 6:
      {
        // 6 SBYTE 8-bit signed integer
        if (count === 1) {
          return _extends({}, tag, {
            value: dataView.getInt8(pointer)
          });
        }
        pointer = count > 4 ? offset : pointer;
        for (var _i5 = 0; _i5 < count; _i5++) {
          values.push(dataView.getInt8(pointer + _i5));
        }

        return _extends({}, tag, {
          values
        });
      }
    case 8:
      {
        // 8 SSHORT 16-bit signed integer
        if (count === 1) {
          return _extends({}, tag, {
            value: dataView.getInt16(pointer, littleEnd)
          });
        }
        pointer = count > 2 ? offset : pointer;
        for (var _i6 = 0; _i6 < count; _i6++) {
          values.push(dataView.getInt16(pointer + 2 * _i6, littleEnd));
        }

        return _extends({}, tag, {
          values
        });
      }
    case 9:
      {
        // 9 SLONG 32-bit signed integer
        if (count === 1) {
          return _extends({}, tag, {
            value: dataView.getInt32(pointer, littleEnd)
          });
        }
        pointer = offset;
        for (var _i7 = 0; _i7 < count; _i7++) {
          values.push(dataView.getInt32(pointer + 4 * _i7, littleEnd));
        }

        return _extends({}, tag, {
          values
        });
      }
    case 10:
      {
        // 10 SRATIONAL Two 32-bit signed integers
        pointer = offset;
        if (count === 1) {
          numerator = dataView.getInt32(pointer, littleEnd);
          denominator = dataView.getInt32(pointer + 4, littleEnd);
          return _extends({}, tag, {
            value: numerator / denominator
          });
        }
        for (var _i8 = 0; _i8 < count; _i8++) {
          numerator = dataView.getInt32(pointer + 4 * _i8, littleEnd);
          denominator = dataView.getInt32(pointer + 4 * _i8 + 4, littleEnd);
          values.push(numerator / denominator);
        }

        return _extends({}, tag, {
          values
        });
      }
    case 11:
      {
        // 11 FLOAT 4-byte single-precision IEEE floating-point value
        // TODO
        console.log("TODO: Double is currently not tested because I don't have any examples. Please provide an example.");
        if (count === 1) {
          return _extends({}, tag, {
            value: dataView.getFloat32(pointer, littleEnd)
          });
        }
        pointer = offset;
        for (var _i9 = 0; _i9 < count; _i9++) {
          values.push(dataView.getFloat32(pointer + 4 * _i9, littleEnd));
        }

        return _extends({}, tag, {
          values
        });
      }
    case 12:
      {
        // 12 DOUBLE 8-byte double-precision IEEE floating-point value
        // TODO
        console.log("TODO: Double is currently not tested because I don't have any examples. Please provide an example.");
        pointer = offset;
        if (count === 1) {
          return _extends({}, tag, {
            value: dataView.getFloat64(pointer, littleEnd)
          });
        }
        for (var _i10 = 0; _i10 < count; _i10++) {
          values.push(dataView.getFloat64(pointer + 8 * _i10, littleEnd));
        }

        return _extends({}, tag, {
          values
        });
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
function readTags(dataView, tiffStart, ifdOffset, littleEnd, count) {
  var offset = tiffStart + ifdOffset;

  var numOfEntries = count || dataView.getUint16(offset, littleEnd);offset += 2;
  var tags = {};

  for (var i = 0; i < numOfEntries; i++) {
    var identifier = dataView.getUint16(offset + 12 * i, littleEnd);

    tags[identifier] = readTag(dataView, tiffStart, offset + 12 * i, littleEnd);
  }

  return tags;
}

/**
 * Returns the offset of the EXIF start
 * @param {DataView} dataView
 * @param {number}   startOffset To search next start (e.g. FFE2)
 * @returns {number} -1 if no start found
 */
function searchStartOfExif(dataView, startOffset) {
  var length = dataView.byteLength;

  var offset = startOffset + 2 || 2; // +2 to skip jpegStartNumber
  while (offset < length) {
    var marker = dataView.getUint16(offset);
    if (marker === _exifTags.exifStartNumber) {
      return offset;
    } else if ((marker & 0xFF00) !== 0xFF00) break; // not start with 0xFF -> no marker
    else offset += 2;
  }

  return -1;
}

exports.fileToDataView = fileToDataView;
exports.filterPointerTags = filterPointerTags;
exports.isJPEG = isJPEG;
exports.readIFDData = readIFDData;
exports.readTag = readTag;
exports.readTags = readTags;
exports.searchStartOfExif = searchStartOfExif;
exports.getAllTagsFromFile = getAllTagsFromFile;

/***/ }
/******/ ]);