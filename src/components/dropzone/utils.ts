export const ERROR_CODES = {
  TOO_MANY_FILES: 'too-many-files',
  FILE_TOO_LARGE: 'file-too-large',
  INVALID_FILE_TYPE: 'file-invalid-type',
  TOO_MANY_FILES_MESSAGE: (maxFiles: number) => `Upload ${maxFiles} file${maxFiles > 1 ? 's' : ''} maximum.`,
  FILE_TOO_LARGE_MESSAGE: (maxFileSize: number) => `File size must be less than ${formatBytes(maxFileSize)}.`,
  INVALID_FILE_TYPE_MESSAGE: () => 'Invalid file type.',
};

export const splitFileExtension = (name: string, truncation?: number) => {
  let [fileName, fileExtension] = name.split('.');
  fileName.length > (truncation || fileName.length + 1)
    ? fileName = fileName.substring(0, truncation) + '...'
    : fileName = fileName;
  return { fileName, fileExtension };
}

export const formatFileText = (name: string, truncation?: number) => {
  const { fileName, fileExtension } = splitFileExtension(name, truncation);
  return `${fileName} (${fileExtension})`;
}

export const filesWithoutDuplicates = (toFilter: File[], intersecting: File[]) => {
  return toFilter.filter((file: File) =>
    !intersecting.find((otherFile: File) =>
      otherFile.name === file.name && otherFile.size === file.size
    )
  );
}

export const getCodeMessage = (code: string, maxSize: number, maxFiles: number) => {
  switch (code) {
    case ERROR_CODES.INVALID_FILE_TYPE:
      return ERROR_CODES.INVALID_FILE_TYPE_MESSAGE();
    case ERROR_CODES.FILE_TOO_LARGE:
      return ERROR_CODES.FILE_TOO_LARGE_MESSAGE(maxSize);
    case ERROR_CODES.TOO_MANY_FILES:
      return ERROR_CODES.TOO_MANY_FILES_MESSAGE(maxFiles);
    default:
      return 'An error occured, try again.';
  }
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const getBytes = (amount: number, format: string) => {
  const sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const index = sizes.indexOf(format);
  return index === -1 ? amount : amount * Math.pow(1024, index + 1);

}