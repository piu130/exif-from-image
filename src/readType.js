export const readValue = (dataView, type, offset, pointer, littleEnd, count) => {
  let value
  switch (type) {
    case 1: // 1 BYTE 8-bit unsigned integer
    case 7: {
      value = readByte(dataView, offset, pointer, count)
      break
    }
    case 2: { // 2 ASCII 8-bit, NULL-terminated string
      value = readAscii(dataView, offset, pointer, count)
      break
    }
    case 3: { // 3 SHORT 16-bit unsigned integer
      value = readShort(dataView, offset, pointer, littleEnd, count)
      break
    }
    case 4: { // 4 LONG 32-bit unsigned integer
      value = readLong(dataView, offset, littleEnd, count)
      break
    }
    case 5: { // 5 RATIONAL Two 32-bit unsigned integers
      value = readRational(dataView, offset, littleEnd, count)
      break
    }
    case 6: { // 6 SBYTE 8-bit signed integer
      value = readSByte(dataView, offset, pointer, littleEnd, count)
      break
    }
    case 8: { // 8 SSHORT 16-bit signed integer
      value = readSShort(dataView, offset, pointer, littleEnd, count)
      break
    }
    case 9: { // 9 SLONG 32-bit signed integer
      value = readSLong(dataView, offset, littleEnd, count)
      break
    }
    case 10: { // 10 SRATIONAL Two 32-bit signed integers
      value = readSRational(dataView, offset, littleEnd, count)
      break
    }
    case 11: { // 11 FLOAT 4-byte single-precision IEEE floating-point value
      // TODO
      console.log("TODO: Double is currently not tested because I don't have an example. Please provide one.")
      value = readFloat(dataView, offset, littleEnd, count)
      break
    }
    case 12: { // 12 DOUBLE 8-byte double-precision IEEE floating-point value
      // TODO
      console.log("TODO: Double is currently not tested because I don't have an example. Please provide one.")
      value = readDouble(dataView, offset, littleEnd, count)
      break
    }
  }
  return value
}

/**
 * Reads byte value(s).
 * @param {DataView} dataView DataView.
 * @param {number} offset Offset.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readByte = (dataView, offset, pointer, count = 1) => {
  if (count === 1) {
    return dataView.getUint8(pointer)
  }

  pointer = count > 4 ? offset : pointer
  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    values[i] = dataView.getUint8(pointer + i)
  }

  return values
}

/**
 * Reads ascii value(s).
 * @param {DataView} dataView DataView.
 * @param {number} offset Offset.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readAscii = (dataView, offset, pointer, count = 1) => {
  let value

  if (count === 1) {
    value = String.fromCharCode(dataView.getUint8(pointer))
  } else {
    value = ''
    pointer = count > 4 ? offset : pointer
    for (let i = 0; i < count - 1; i++) { // -1 to remove 0x00
      value += String.fromCharCode(dataView.getUint8(pointer + i))
    }
  }

  return value
}

/**
 * Reads short value(s).
 * @param {DataView} dataView DataView.
 * @param {number} offset Offset.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readShort = (dataView, offset, pointer, littleEnd, count = 1) => {
  if (count === 1) {
    return dataView.getUint16(pointer, littleEnd)
  }

  pointer = count > 2 ? offset : pointer
  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    values[i] = dataView.getUint16(pointer + 2 * i, littleEnd)
  }

  return values
}

/**
 * Reads long value(s).
 * @param {DataView} dataView DataView.
 * @param {number} offset Offset.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readLong = (dataView, pointer, littleEnd, count = 1) => {
  if (count === 1) {
    return dataView.getUint32(pointer, littleEnd)
  }

  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    values[i] = dataView.getUint32(pointer + 4 * i, littleEnd)
  }

  return values
}

/**
 * Reads rational value(s).
 * @param {DataView} dataView DataView.
 * @param {number} offset Offset.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readRational = (dataView, pointer, littleEnd, count = 1) => {
  let numerator
  let denominator

  if (count === 1) {
    numerator = dataView.getUint32(pointer, littleEnd)
    denominator = dataView.getUint32(pointer + 4, littleEnd)
    return numerator / denominator
  }

  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    numerator = dataView.getUint32(pointer + 4 * i, littleEnd)
    denominator = dataView.getUint32(pointer + 4 * i + 4, littleEnd)
    values[i] = numerator / denominator
  }

  return values
}

/**
 * Reads s byte value(s).
 * @param {DataView} dataView DataView.
 * @param {number} offset Offset.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readSByte = (dataView, offset, pointer, littleEnd, count = 1) => {
  if (count === 1) {
    return dataView.getInt8(pointer)
  }

  pointer = count > 4 ? offset : pointer
  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    values[i] = dataView.getInt8(pointer + i)
  }

  return values
}

/**
 * Reads s short value(s).
 * @param {DataView} dataView DataView.
 * @param {number} offset Offset.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readSShort = (dataView, offset, pointer, littleEnd, count = 1) => {
  if (count === 1) {
    return dataView.getInt16(pointer, littleEnd)
  }

  pointer = count > 2 ? offset : pointer
  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    values[i] = dataView.getInt16(pointer + 2 * i, littleEnd)
  }

  return values
}

/**
 * Reads s long value(s).
 * @param {DataView} dataView DataView.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readSLong = (dataView, pointer, littleEnd, count = 1) => {
  if (count === 1) {
    return dataView.getInt32(pointer, littleEnd)
  }

  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    values[i] = dataView.getInt32(pointer + 4 * i, littleEnd)
  }

  return values
}

/**
 * Reads s rational value(s).
 * @param {DataView} dataView DataView.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readSRational = (dataView, pointer, littleEnd, count = 1) => {
  let numerator
  let denominator

  if (count === 1) {
    numerator = dataView.getInt32(pointer, littleEnd)
    denominator = dataView.getInt32(pointer + 4, littleEnd)
    return numerator / denominator
  }

  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    numerator = dataView.getInt32(pointer + 4 * i, littleEnd)
    denominator = dataView.getInt32(pointer + 4 * i + 4, littleEnd)
    values[i] = numerator / denominator
  }

  return values
}

/**
 * Reads float value(s).
 * @param {DataView} dataView DataView.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readFloat = (dataView, pointer, littleEnd, count = 1) => {
  if (count === 1) {
    return dataView.getFloat32(pointer, littleEnd)
  }

  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    values[i] = dataView.getFloat32(pointer + 4 * i, littleEnd)
  }

  return values
}

/**
 * Reads double value(s).
 * @param {DataView} dataView DataView.
 * @param {number} pointer Pointer.
 * @param {boolean} littleEnd Flag defining reading in little or big endian.
 * @param {number=1} [count] Number to read.
 * @returns {number|number[]} Value(s).
 */
export const readDouble = (dataView, pointer, littleEnd, count = 1) => {
  if (count === 1) {
    return dataView.getFloat64(pointer, littleEnd)
  }

  const values = new Array(count)
  for (let i = 0; i < count; i++) {
    values[i] = dataView.getFloat64(pointer + 8 * i, littleEnd)
  }
  return values
}
