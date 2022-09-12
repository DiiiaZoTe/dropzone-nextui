import React, { DragEvent, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { assignRef } from '@utils/refs/assignRef';
import { useDropzoneProps } from './use-Dropzone';
import { DropzoneProvider } from './dropzone-context';
import { DropzoneBase, DropzoneAccept, DropzoneReject } from './dropzone-status';
import { DropzonePreview, DropzonePreviewItem } from './dropzone-preview';
import { StyledDropzone } from './dropzone.styles';
import { CSS } from '@nextui-org/react';
import { useFocusRing } from '@react-aria/focus';
import type { FocusRingAria } from '@react-aria/focus';
import clsx from '@utils/clsx';
import { DropzoneError, RejectionError, DropzoneRejectionError } from './dropzone-error';
import { ERROR_CODES, filesWithoutDuplicates } from './utils';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { DropzoneFullscreen } from './dropzone-fullscreen';

//! Dropzone  --------------------------------------------------------
interface Props extends useDropzoneProps {
  /** @required Files dropped on the dropzone */
  files: File[];

  /** @required File setter */
  setFiles: (files: File[]) => void;

  /** @optional should be the direct children of the dropzone
   * - base: default state
   * - accept: the dropzone is accepting files
   * - reject: the dropzone is rejecting files
   * - preview: the dropzone file preview
   * - error: the dropzone error to display
   */
  children?: ReactNode;

  /** @optional CSS properties that override the default styling */
  css?: CSS;

  /** @optional Allows to show/hide the Base, Accept, Reject status 
   *  when one accepted file is dropped
   *  @default true
   */
  alwaysShowStatus?: boolean;

  /** @optional Allows to active/deactivate the animation
   *  @default true
   */
  animated?: boolean;

  /** @optional Allows to add a border around the Dropzone
   *  @default false
   *  @notice default border is as below.
   *  Use these properties to override the default border
   *  - borderWeigth: $normal
   *  - borderStyle: dashed
   *  - borderColor: takes the color of the dropzone
   *  
   */
  bordered?: boolean;

  /** @optional Allows to change the overall style of the Dropzone
   *  @type 'flat' | 'light' | 'solid' | 'shadow'
   *  @default 'flat'
   *  @description
   *  - flat: has a light tone palette
   *  - light: has a transparent background
   *  - solid: has a solid background (more like a button)
   *  - shadow: same as solid but with a shadow 
   */
  variant?: 'flat' | ' light' | 'solid' | 'shadow' | 'shadow_flat' | any;

  /** @optional Allows to change the width of the Dropzone
   *  @type 'xs' | 'sm' | 'md' | 'lg' | 'full'
   *  @default 'lg'
   *  @description
   *  - xs: preview fits 1 file
   *  - sm: preview fits 2 files
   *  - md: preview fits 3 files
   *  - lg: preview fits 4 files
   *  - full: full width available
   */
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'full';

  /** @optional Allows to change the main color of the Dropzone
   *  @type 'default' | 'primary' | 'secondary' | 'warning'
   *  @default 'default'
   *  @description
   *  - default: default color
   *  - primary: primary color
   *  - secondary: secondary color
   *  - warning: warning color
   *  @notice
   *  If you overwrote NextUi's theme,
   *  ensure to override primary, secondary, warning, success, error colors
   */
  color?: 'default' | 'primary' | 'secondary' | 'warning';

  /** @optional Allows to change the main border color of the Dropzone
   *  @type 'default' | 'primary' | 'secondary' | 'warning'
   *  @default 'default'
   *  @description
   *  - default: default color
   *  - primary: primary color
   *  - secondary: secondary color
   *  - warning: warning color
   *  @notice
   *  If you overwrote NextUi's theme,
   *  ensure to override primary, secondary, warning, success, error colors
   */
  borderColor?: 'default' | 'primary' | 'secondary' | 'warning';

  /** @optional Allows to change the style of the Dropzone border
   *  @type 'dashed' | 'dotted' | 'solid'
   *  @default 'dashed'
   *  @description
   *  - dashed: dashed border
   *  - dotted: dotted border
   *  - solid:  solid border
   */
  borderStyle?: 'dashed' | 'dotted' | 'solid';

  /** @optional Allows to change the weight of the Dropzone border
   *  @type 'light' | 'normal' | 'bold' | 'extrabold' | 'black'
   *  @default 'normal'
   *  @description
   *  - light: 1px border
   *  - normal: 2px border
   *  - bold: 3px border
   *  - extrabold: 4px border
   *  - black: 5px border
   */
  borderWeight?: 'light' | 'normal' | 'bold' | 'extrabold' | 'black';

  /** @optional Allows to active/deactivate the shake animation after invalid file drop
   *  @default false
   */
  removeShake?: boolean;

  //! can remove this one once error component is done
  displayError?: boolean;

  /** @optional Allows to active/deactivate the error border
   *  @default true
   *  @notice
   *  If borderStyle and borderWeight are set, use them.
   *  Otherwise, the default border is: normal dashed
   */
  errorBorder?: boolean;

  /** @optional  extra className you wish to apply to the Dropzone*/
  className?: string;
}
/** Dropzone props 
 *  @requires Files
 *  @requires setFiles
 */
export type DropzoneProps = Props;

/** focus ring aria interface for focus accessibility */
interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof DropzoneProps>;
}
/** 
 *  Dropzone component
 *  @description Main component for the dropzone.
 *  Direct children include:
 *    - Dropzone.Base
 *    - Dropzone.Accept
 *    - Dropzone.Reject
 *    - Dropzone.Preview
 *    - Dropzone.Error
 */
const Dropzone = (props: DropzoneProps) => {
  /** get all the props for dropzone and react-dropzone */
  const {
    children,
    css,
    files,
    setFiles,
    alwaysShowStatus,
    animated,
    bordered,
    variant,
    width,
    color,
    borderColor,
    borderStyle,
    borderWeight,
    removeShake,
    displayError,
    errorBorder,
    className,
    disabled,
    multiple,
    maxSize,
    accept,
    onDrop,
    onReject,
    onAccept,
    openRef,
    name,
    maxFiles,
    autoFocus,
    activateOnClick,
    activateOnDrag,
    dragEventsBubbling,
    activateOnKeyboard,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onFileDialogCancel,
    onFileDialogOpen,
    validator,
    preventDropOnDocument,
    ...otherProps
  } = props;

  /** dropzone ref for animation */
  const [dropzoneRef, dropzoneAnimation] = useAutoAnimate<any>();
  dropzoneAnimation(animated! && !disabled);

  /** init other variables and states for focus ring and error */
  const { isFocusVisible, focusProps }: IFocusRingAria = useFocusRing({ autoFocus });
  const [invalidShake, setInvalidShake] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [dropzoneError, setDropzoneError] = useState({} as DropzoneRejectionError);
  const [filesDragAmount, setFilesDragAmount] = useState(0);

  /** invalid shake in useEffect triggered when error occurs (does not apply)*/
  useEffect(() => {
    let timer = null as any;
    if (invalidShake)
      timer = setTimeout(() => setInvalidShake(false), 500);
    return () => clearTimeout(timer);
  }, [invalidShake]);

  /**
   * @function getErrorMessage
   * creates a custom error object by combining the rejected files by error code
   * @param {FileRejection[]} error - array of rejected files with reason
   * @returns {RejectionError[]} array of rejected files sorted by error code
   */
  const getErrorMessage = useCallback((error: FileRejection[]) => {
    // remove files already uploaded from the error
    const filteredError = error.filter((errorFile: FileRejection) => {
      return !files.some((file: File) =>
        file.name === errorFile.file.name && file.size === errorFile.file.size);
    });
    let errorReturn = [] as RejectionError[]; // init error return
    // check for too many files error
    if (maxFiles && (filteredError.length + files.length) > maxFiles!) {
      errorReturn.push({
        code: ERROR_CODES.TOO_MANY_FILES,
        files: filteredError.map((err: any) => err.file.name)
      });
    }
    // check for invalid file type error
    const invalidType = error.filter((err: any) =>
      err.errors[0].code === ERROR_CODES.INVALID_FILE_TYPE
    );
    if (invalidType.length) {
      errorReturn.push({
        code: ERROR_CODES.INVALID_FILE_TYPE,
        files: invalidType.map((err: any) => err.file.name)
      });
    }
    // check for file too large error
    const tooLarge = error.filter((err: any) =>
      err.errors[0].code === ERROR_CODES.FILE_TOO_LARGE
    );
    if (tooLarge.length) {
      errorReturn.push({
        code: ERROR_CODES.FILE_TOO_LARGE,
        files: tooLarge.map((err: any) => err.file.name)
      });
    }
    return errorReturn;
  }, [files, maxFiles, maxSize]);

  /**
  * @function execFilesAccepted
  * - checks for duplicate files
  * - deals with the max files limit
  * - calls the users onAccept function or sets the files state
  * @param {File[]} acceptedFiles - array of accepted files
  * @param {FileRejection[]} rejectedFiles - array of rejected files with reason
  * @returns {FileRejection[]} null if no extra errors or array of rejected files with reason
  * @notice edge case:
  * - the user will be displayed that the files will be rejected because of max files limit,
  *   but after dropping they will be accepted. This is because some duplicates were removed
  *   and now the max files limit is not reached anymore.
  *   => Cannot do anything about this as DataTransferItem does not provide 
  *   a way to get the file name or size to check for duplicates during drag (only at drop)
  */
  const execFilesAccepted = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const totalDropFiles = acceptedFiles.length + rejectedFiles.length;
    // handle single file dropzone
    if (!multiple && totalDropFiles === 1) {
      setFiles([acceptedFiles[0]]);
      return null;
    }
    // get files without duplicates from accepted files
    const withoutDuplicates = filesWithoutDuplicates(files, acceptedFiles);
    // if no maxFiles issues, proceed normally
    if (maxFiles === undefined || withoutDuplicates.length + acceptedFiles.length <= maxFiles) {
      // remove old errors and set new files
      setDropzoneError({} as DropzoneRejectionError);
      if (onAccept === undefined) setFiles([...withoutDuplicates, ...acceptedFiles]);
      else onAccept(filesWithoutDuplicates(acceptedFiles, files));
      return null;
    }
    // handle maxFiles issues by adding accepted files to rejected files
    return [
      ...acceptedFiles.map((file: File) => ({
        file: file,
        errors: [{
          code: ERROR_CODES.TOO_MANY_FILES,
          message: 'Too many files'
        }]
      })),
      ...rejectedFiles
    ]
  }

  /**
   * @function execFilesRejected
   * - get error in custom format
   * - call user's onReject if provided
   * - start shake animation
   * - set error state
   * @param {FileRejection[]} rejectedFiles - array of rejected files with reason
   */
  const execFilesRejected = useCallback((err: FileRejection[]) => {
    const error = getErrorMessage(err);
    // console.log(error);
    // if (!error.length) return;
    if (onReject !== undefined) onReject(error);
    setInvalidShake(true);
    setDropzoneError({ errors: error, timestamp: Date.now() });
  }, [getErrorMessage, onReject, setInvalidShake, setDropzoneError]);

  /**
   * @function defaultOnDrop
   * - handles accepted files first using execFilesAccepted
   * - then handles rejected files using execFilesRejected
   * @param {File[]} acceptedFiles - array of accepted files
   * @param {FileRejection[]} rejectedFiles - array of rejected files with reason
   */
  const defaultOnDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles.length)
      rejectedFiles = execFilesAccepted(acceptedFiles, rejectedFiles) ?? rejectedFiles;
    if (!rejectedFiles.length) return;
    execFilesRejected(rejectedFiles);
  }, [files, setFiles, maxFiles, dropzoneError, setDropzoneError, onAccept, onReject, setInvalidShake]);


  const defaultOnDragEnter = useCallback((event: DragEvent<HTMLElement>) => {
    setFilesDragAmount(event.dataTransfer.items.length);
    if (onDragEnter !== undefined) onDragEnter(event);
  }, [setFilesDragAmount]);

  /** initialize react-dropzone using props provided
   *  retrieves the necessary variables as well */
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open } = useDropzone(
    {
      onDrop: defaultOnDrop,
      accept: Array.isArray(accept) ? accept.reduce((r, key) => ({ ...r, [key]: [] }), {}) : accept,
      disabled,
      multiple,
      maxSize,
      maxFiles,
      autoFocus,
      // noClick: !(activateOnClick && !fullscreen),
      noClick: !activateOnClick,
      noDrag: !activateOnDrag,
      noDragEventsBubbling: !dragEventsBubbling,
      noKeyboard: !activateOnKeyboard,
      onDragEnter: defaultOnDragEnter,
      onDragLeave,
      onDragOver,
      onFileDialogCancel,
      onFileDialogOpen,
      validator,
      preventDropOnDocument,
    });

  /** Assigns the openRef to the open function to allow dropzone to open with a ref */
  assignRef(openRef, open);

  /** Should the status (Base, Accept, Reject) be displayed now? */
  const showStatus = useMemo(() => {
    return (alwaysShowStatus! || !files.length)
  }, [alwaysShowStatus, files]);

  /** Should the Base be displayed now? */
  const showBase = useMemo(() => {
    return (!isDragActive)
  }, [isDragActive]);

  /** Should the Accept be displayed now? */
  const showAccept = useMemo(() => {
    return (isDragAccept && (maxFiles ? files.length + filesDragAmount <= maxFiles : true))
  }, [isDragAccept, files, maxFiles, filesDragAmount]);

  /** Should the Reject be displayed now? */
  const showReject = useMemo(() => {
    return (
      isDragReject ||
      (isDragActive && (maxFiles ? files.length + filesDragAmount > maxFiles : false))
    );
  }, [isDragReject, isDragActive, files, maxFiles, filesDragAmount]);

  /** What is the current status of the dropzone?*/
  const status = useMemo(() => {
    return showBase ? 'Base' : showAccept ? 'Accept' : showReject ? 'Reject' : 'Base';
  }, [showBase, showAccept, showReject]);

  /** Based on the status, what color will the dropzone be? */
  const colorStatus = useMemo(() => {
    if (status == 'Accept') return 'success';
    if (status == 'Reject') return 'error';
    return color;
  }, [status, color]);

  /** Based on the status, what color will the dropzone border be? */
  const borderColorStatus = useMemo(() => {
    if (status == 'Accept') return 'success';
    if (status == 'Reject') return 'error';
    if (borderColor !== undefined) return borderColor;
    return colorStatus;
  }, [status, borderColor, colorStatus]);

  /** Manages css overrides of the dropzone based on the status (Base, Accept, Reject) */
  const statusCSS = useMemo(() => {
    const filteredChildren: any[] =
      React.Children.toArray(children).filter((child: any) =>
        child.type.displayName === `NextUI.Dropzone.${status}`
      );
    if (filteredChildren.length === 0) return {};
    return filteredChildren[0]!.props.css;
  }, [status]);

  /** Should the error border be displayed? */
  const showErrorBorder = useMemo(() => {
    return (errorVisible && dropzoneError.errors && displayError && errorBorder);
  }, [errorVisible, dropzoneError, displayError, errorBorder]);

  return (
    <DropzoneProvider
      value={{
        Base: showBase && showStatus,
        Accept: showAccept && showStatus,
        Reject: showReject && showStatus,
        Files: files, setFiles: setFiles,
        Disabled: disabled!,
        Animated: animated! && !isFocusVisible,
        MaxFiles: maxFiles!,
        MaxSize: maxSize!,
        Error: dropzoneError,
        IsErrorVisible: errorVisible,
        setIsErrorVisible: setErrorVisible,
      }}
    >
      <StyledDropzone
        ref={dropzoneRef}
        data-base={(showBase && showStatus) || undefined}
        data-accept={(showAccept && showStatus) || undefined}
        data-reject={(isDragReject && showStatus) || undefined}
        bordered={bordered}
        animated={animated && !isFocusVisible}
        width={width}
        variant={variant}
        color={colorStatus}
        borderColor={borderColorStatus}
        borderStyle={borderStyle}
        borderWeight={borderWeight}
        isFocusVisible={isFocusVisible && !disabled}
        disabled={disabled}
        showErrorBorder={showErrorBorder}
        className={clsx(
          'nextui-dropzone',
          `nextui-dropzone--${status}`,
          !removeShake && invalidShake && 'nextui-dropzone--invalid-shake',
          className
        )}
        css={{ ...statusCSS, ...(css as any) }}
        {...getRootProps({})}
        {...focusProps}
        {...otherProps}
      >
        <input {...getInputProps()} name={name} />
        {children}
      </StyledDropzone>
    </DropzoneProvider >
  );
};

/** Dropzone type */
type DropzoneComponent<P = {}> = React.FC<P> & {
  Base: typeof DropzoneBase;
  Accept: typeof DropzoneAccept;
  Reject: typeof DropzoneReject;
  Preview: typeof DropzonePreview;
  Item: typeof DropzonePreviewItem;
  Error: typeof DropzoneError;
  Fullscreen: typeof DropzoneFullscreen;
};

Dropzone.toString = () => '.nextui-dropzone';
Dropzone.displayName = 'NextUI.Dropzone';

/** Default Dropzone props */
const defaultDropzoneProps: Partial<DropzoneProps> = {
  disabled: false,
  multiple: true,
  maxSize: Infinity,
  autoFocus: false,
  activateOnClick: true,
  activateOnDrag: true,
  dragEventsBubbling: true,
  activateOnKeyboard: true,
  alwaysShowStatus: true,
  animated: true,
  bordered: false,
  variant: 'flat',
  width: 'lg',
  color: 'default',
  borderColor: undefined,
  borderStyle: 'dashed',
  borderWeight: 'normal',
  displayError: true,
  removeShake: false,
  errorBorder: true,
  className: '',
};
Dropzone.defaultProps = defaultDropzoneProps;
export default Dropzone as DropzoneComponent<DropzoneProps>;