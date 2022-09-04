import React, { ReactNode, useCallback, useMemo, useState } from 'react';
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
import { DropzoneError, RejectionError, CustomRejectionError } from './dropzone-error';
import { ERROR_CODES, filesWithoutDuplicates } from './utils';
import { useAutoAnimate } from '@formkit/auto-animate/react'

//! Dropzone  --------------------------------------------------------
interface Props extends useDropzoneProps {
  /**
   * should be the different statuses of the dropzone
   * - base: default state
   * - accept: the dropzone is accepting files
   * - reject: the dropzone is rejecting files
   * - preview: the dropzone file preview
   */
  children?: ReactNode;
  css?: CSS;
  /**
   * @required Files dropped on the dropzone
   */
  files: File[];
  /**
   * @required File setter
   */
  setFiles: (files: File[]) => void;
  alwaysShowStatus?: boolean;
  animated?: boolean;
  bordered?: boolean;
  variant?: 'flat' | ' light' | 'solid' | 'shadow' | any; // default flat
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'full'; // default lg
  color?: 'default' | 'primary' | 'secondary' | 'warning';
  borderColor?: 'default' | 'primary' | 'secondary' | 'warning';
  borderStyle?: 'dashed' | 'dotted' | 'solid'; // default dashed
  borderWeight?: 'light' | 'normal' | 'bold' | 'extrabold' | 'black'; // default normal'
  removeShake?: boolean;
  displayError?: boolean;
  errorBorder?: boolean;
  className?: string;
}
export type DropzoneProps = Props;

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof DropzoneProps>;
}

/** Dropzone component
 *  Main component for the dropzone
 *  Direct children:
 *    - Dropzone.Base
 *    - Dropzone.Accept
 *    - Dropzone.Reject
 *    - Dropzone.Preview
 */
const Dropzone = (props: DropzoneProps) => {
  // get all the props for dropzone and react-dropzone
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

  console.log('dropzone rendered');
  const [dropzoneRef, dropzoneAnimation] = useAutoAnimate<any>();
  dropzoneAnimation(animated! && !disabled);

  // init other variables
  const { isFocusVisible, focusProps }: IFocusRingAria = useFocusRing({ autoFocus });
  const [invalidShake, setInvalidShake] = useState(false);
  const [dropzoneError, setDropzoneError] = useState({} as CustomRejectionError);

  const execFilesAccepted = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const totalDropFiles = acceptedFiles.length + rejectedFiles.length;
    // handle single file dropzone
    if (!multiple && totalDropFiles === 1) {
      setFiles([acceptedFiles[0]]);
      return null;
    }
    // get files without duplicates from accepted files
    const withoutDuplicates = filesWithoutDuplicates(files, acceptedFiles) as File[];
    // if no maxFiles issues, proceed normally
    if (maxFiles === undefined || withoutDuplicates.length + acceptedFiles.length <= maxFiles) {
      // remove old errors and set new files
      setDropzoneError({} as CustomRejectionError);
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

  const execFilesRejected = (err: FileRejection[]) => {
    const error = getErrorMessage(err);
    if (onReject !== undefined) onReject(error);
    setInvalidShake(true);
    setTimeout(() => setInvalidShake(false), 500);
    setDropzoneError({ errors: error, timestamp: Date.now() });
  };

  const testOnDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles.length)
      rejectedFiles = execFilesAccepted(acceptedFiles, rejectedFiles) ?? rejectedFiles;
    if (!rejectedFiles.length) return;
    execFilesRejected(rejectedFiles);

  }, [files, setFiles, maxFiles, dropzoneError, setDropzoneError, onAccept, onReject, setInvalidShake]);

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

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open } = useDropzone({
    onDrop: testOnDrop,

    // onError: defaultOnReject,
    // onDropAccepted: defaultOnDrop,
    // onDropRejected: defaultOnReject,
    accept: Array.isArray(accept) ? accept.reduce((r, key) => ({ ...r, [key]: [] }), {}) : accept,
    disabled,
    multiple,
    maxSize,
    maxFiles,
    autoFocus,
    noClick: !activateOnClick,
    noDrag: !activateOnDrag,
    noDragEventsBubbling: !dragEventsBubbling,
    noKeyboard: !activateOnKeyboard,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onFileDialogCancel,
    onFileDialogOpen,
    validator,
    preventDropOnDocument,
  });

  assignRef(openRef, open);

  const showStatus = useMemo(() => {
    return (alwaysShowStatus! || !files.length)
  }, [alwaysShowStatus, files]);

  const showBase = useMemo(() => {
    return (!isDragActive)
  }, [isDragActive]);

  const showAccept = useMemo(() => {
    return (isDragAccept && (maxFiles ? files.length < maxFiles : true))
  }, [isDragAccept, files, maxFiles]);

  const showReject = useMemo(() => {
    return (isDragReject || (isDragActive && (maxFiles ? files.length >= maxFiles : false)));
  }, [isDragReject, isDragActive, files, maxFiles]);

  const status = useMemo(() => {
    return showBase ? 'Base' : showAccept ? 'Accept' : showReject ? 'Reject' : 'Base';
  }, [showBase, showAccept, showReject]);

  const colorStatus = useMemo(() => {
    if (status == 'Accept') return 'success';
    if (status == 'Reject') return 'error';
    return color;
  }, [status, color]);
  const borderColorStatus = useMemo(() => {
    if (status == 'Accept') return 'success';
    if (status == 'Reject') return 'error';
    if (borderColor !== undefined) return borderColor;
    return colorStatus;
  }, [status, borderColor, colorStatus]);

  // manages css overrides of the dropzone based on the status (Base, Accept, Reject)
  const statusCSS = useMemo(() => {
    const filteredChildren: any[] =
      React.Children.toArray(children).filter((child: any) =>
        child.type.displayName === `NextUI.Dropzone.${status}`
      );
    if (filteredChildren.length === 0) return {};
    return filteredChildren[0]!.props.css;
  }, [status]);


  const [errorVisible, setErrorVisible] = useState(false);

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
        {
          displayError &&
          <DropzoneError
            setIsVisible={setErrorVisible} isVisible={errorVisible}
            err={dropzoneError} animated={animated!}
            maxFiles={maxFiles!} maxSize={maxSize!}
          />
        }
        <input {...getInputProps()} name={name} />
        {children}
      </StyledDropzone>
    </DropzoneProvider >
  );
};

type DropzoneComponent<P = {}> = React.FC<P> & {
  Base: typeof DropzoneBase;
  Accept: typeof DropzoneAccept;
  Reject: typeof DropzoneReject;
  Preview: typeof DropzonePreview;
  Item: typeof DropzonePreviewItem;
  Error: typeof DropzoneError;
};

Dropzone.toString = () => '.nextui-dropzone';
Dropzone.displayName = 'NextUI.Dropzone';

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





  // default onDrop function, can be overriden by the user using the onDrop prop
  // adds the accepted files, takes care of duplicates and maxFiles
  // @notice by overriding the default on drop function,
  //         the dropzone will act like the default react-dropzone.
  //         You must take care of the files yourself.
  //         (e.g. duplicates, maxFiles, etc.)
  //         and considerer that maxFiles is not a limit but max per drop
  // const defaultOnDrop = useCallback((acceptedFiles: File[]) => {
  //   if (!multiple) return setFiles([acceptedFiles[0]]); // handle single file dropzone
  //   console.log('accepted files', acceptedFiles);
  //   // handle duplicates
  //   const newFiles = acceptedFiles.map((file: File) => (file)) as File[];
  //   const withoutDuplicates = filesWithoutDuplicates(files, newFiles) as File[];
  //   // handles maxFiles error issue of react-dropzone and call reject
  //   if (maxFiles && (newFiles.length + withoutDuplicates.length) > maxFiles!) {
  //     const error = [
  //       ...newFiles.map((file: File) => ({
  //         file: file,
  //         errors: [{
  //           code: ERROR_CODES.TOO_MANY_FILES,
  //           message: 'Too many files'
  //         }]
  //       }))
  //     ] as FileRejection[];
  //     return defaultOnReject(error);
  //   }
  //   // call onDrop override and set files
  //   if (onDrop !== undefined) onDrop(filesWithoutDuplicates(newFiles, files));
  //   // if (dropzoneError.timestamp && dropzoneError.timestamp > Date.now() - 1000) return;
  //   setFiles([...withoutDuplicates, ...newFiles]);
  // }, [files, setFiles, maxFiles, dropzoneError, setDropzoneError]);

  // // default onReject function, can be overriden by the user using the onReject prop
  // const defaultOnReject = useCallback((err: FileRejection[] | any) => {
  //   console.log('rejected files', err);
  //   const error = getErrorMessage(err);
  //   if (getError !== undefined) getError(error);
  //   if (onReject !== undefined) return onReject(err);
  //   setInvalidShake(true);
  //   setTimeout(() => setInvalidShake(false), 500);
  //   setDropzoneError({ errors: error, timestamp: Date.now() });
  // }, [setInvalidShake, setDropzoneError, files]);