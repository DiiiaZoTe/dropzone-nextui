/** All the dropzone error codes and their default error messages */
export const ERROR_CODES = {
  TOO_MANY_FILES: 'too-many-files',
  FILE_TOO_LARGE: 'file-too-large',
  INVALID_FILE_TYPE: 'file-invalid-type',
  TOO_MANY_FILES_MESSAGE: (maxFiles: number) => `Upload ${maxFiles} file${maxFiles > 1 ? 's' : ''} maximum.`,
  FILE_TOO_LARGE_MESSAGE: (maxFileSize: number) => `File size must be less than ${formatBytes(maxFileSize)}.`,
  INVALID_FILE_TYPE_MESSAGE: () => 'Invalid file type.',
};

/** 
 *  @function splitFileExtension
 *  Splits the file name and extension. Truncate the file if truncation provided
 *  @param {string} name - The file name
 *  @param {number} [trunctation] - The number of characters 
 *  to truncate the file name. Will add ... at the end
 *  @return {{filename: string, fileExtension: string}} The file name and extension
 */
export const splitFileExtension = (name: string, truncation?: number) => {
  let [fileName, fileExtension] = name.split('.');
  fileName.length > (truncation || fileName.length + 1)
    ? fileName = fileName.substring(0, truncation) + '...'
    : fileName = fileName;
  return { fileName, fileExtension };
}

/** 
 * @function formatFileText
 * Formats the file name and extension. Truncate the file if truncation provided
 * @param {string} name - The file name
 * @param {number} [trunctation] - The number of characters
 * to truncate the file name. Will add ... at the end
 * @return {string} The formatted file name
 */
export const formatFileText = (name: string, truncation?: number) => {
  const { fileName, fileExtension } = splitFileExtension(name, truncation);
  return `${fileName} (${fileExtension})`;
}

/**
 * @function filesWithoutDuplicates
 * Filters out duplicate files
 * @param {File[]} toFilter - The files array to use as base of filtering
 * and remove the duplicates from
 * @param {File[]} intersection - The files array to interect with
 * @return {File[]} The filtered files array
 */
export const filesWithoutDuplicates = (toFilter: File[], intersecting: File[]) => {
  return toFilter.filter((file: File) =>
    !intersecting.find((otherFile: File) =>
      otherFile.name === file.name && otherFile.size === file.size
    )
  );
}

// /**
//  * @function getCodeMessage
//  * Returns the error message for the given error code
//  * @param {string} code - The error code
//  * @param {number} [maxSize] - The maximum file size in bytes
//  * @param {number} [maxFiles] - The maximum number of files
//  * @return {string} The error message
//  */
// export const getCodeMessage = (code: string, maxSize: number, maxFiles: number) => {
//   switch (code) {
//     case ERROR_CODES.INVALID_FILE_TYPE:
//       return ERROR_CODES.INVALID_FILE_TYPE_MESSAGE();
//     case ERROR_CODES.FILE_TOO_LARGE:
//       return ERROR_CODES.FILE_TOO_LARGE_MESSAGE(maxSize);
//     case ERROR_CODES.TOO_MANY_FILES:
//       return ERROR_CODES.TOO_MANY_FILES_MESSAGE(maxFiles);
//     default:
//       return 'An error occured, try again.';
//   }
// };

/**
 * @function formatBytes
 * Formats the bytes to a human readable format
 * @param {number} bytes - The number of bytes
 * @param {number} [decimals] - The number of decimals to use
 * @return {string} The formatted bytes
 * @notice
 * Goes from bytes to yottabytes
 * @see https://stackoverflow.com/a/18650828/10090458
 */
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * @function getBytes
 * Converts the amount in the given unit to bytes
 * @param {number} amount - The amount
 * @param {string} unit - The unit
 * @return {number} The amount in bytes
 * @example getBytes(1, 'MB') returns 1048576
 */
export const getBytes = (amount: number, format: string) => {
  const sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const index = sizes.indexOf(format);
  return index === -1 ? amount : amount * Math.pow(1024, index + 1);

}