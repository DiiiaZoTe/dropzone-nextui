import React, { useEffect, useMemo } from 'react';
import { CSS, Text } from '@nextui-org/react';
import { ERROR_CODES, formatFileText } from './utils';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { UnstyledErrorDiv, StyledErrorBox, StyledErrorFiles } from './dropzone.styles';
import { useDropzoneContext } from './dropzone-context';

const TRUNCATION_LENGTH = 15;
const DURATION = 6000;

/** Error by code
 *  - code: the error code
 *  - files: the files with that error code
 */
export interface RejectionError {
  code: string;
  files: string[];
};

/** Custom error object for dropzone
 * - errors: {RejectionError[]} array of the errors by code
 * - timestamp: the time the error was created (for show/hide purposes).
 *   Use `Date.now()` to get the current timestamp.
 */
export interface DropzoneRejectionError {
  errors: RejectionError[];
  timestamp: number;
}

/** Dropzone error props */
export interface DropzoneErrorProps {
  /** @optional The error object
   *  @notice if provided, custom user error, otherwise get from context
   */
  error?: DropzoneRejectionError;
  /** @optional is the error visible
   *  @notice if provided, custom user error, otherwise get from context
   */
  isVisible?: boolean;
  /** @optional set the error visibility
   *  @notice if provided, custom user error, otherwise get from context
   */
  setIsVisible?: (isVisible: boolean) => void;
  /** @optional is the error animated
   *  @notice if provided, custom user error, otherwise get from context
   */
  animated?: boolean;
  /** @optional children
   *  @notice if provided, overrides the default error
   */
  children?: React.ReactNode;
  /** @optional css of the main error container */
  css?: CSS;
  /** @optional duration of the error on screen in ms
   *  @default 6000 = 6 seconds
   *  @notice 0 = no timeout
   */
  duration?: number;
  /** @optional add a margin above, below or both.
   *  Useful when changing the positon in the Dropzone
   */
  spaceY?: 'above' | 'below' | 'both';
  /** @optional display all the errors that occured */
  multipleErrors?: boolean;
  /** @optional change the message for too many files */
  tooManyFilesMessage?: string;
  /** @optional change the message for file too large */
  fileTooLargeMessage?: string;
  /** @optional change the message for invalid file type */
  invalidFileTypeMessage?: string;
}

/** Dropzone error component 
 *  @description 
 *  Used to display the errors of the dropzone
 *  @notice Passing children will override the default error view.
 *  You will then have to handle the error display yourself.
 *  If you wish to do so, passing the onReject prop to the dropzone can be useful to get the errors.
 */
export const DropzoneErrorComponent = (props: DropzoneErrorProps) => {
  /** get props */
  const { error: errorProp, isVisible, setIsVisible, animated, spaceY,
    children, duration, multipleErrors,
    tooManyFilesMessage, fileTooLargeMessage, invalidFileTypeMessage,
    ...otherProps
  } = props;

  // get context and merge with props (props override context)
  // for error, isVisible, setIsVisible, animated
  const ctx = useDropzoneContext();
  const { MaxFiles, MaxSize } = ctx;
  const error = errorProp ?? ctx.Error;
  const errorVisible = isVisible ?? ctx.IsErrorVisible;
  const setErrorVisible = setIsVisible ?? ctx.setIsErrorVisible;
  const errorAnimated = animated ?? ctx.Animated;

  // get error messages if not provided
  const errorMessages = {
    'too-many-files': tooManyFilesMessage ?? ERROR_CODES.TOO_MANY_FILES_MESSAGE(MaxFiles),
    'file-too-large': fileTooLargeMessage ?? ERROR_CODES.FILE_TOO_LARGE_MESSAGE(MaxSize),
    'file-invalid-type': invalidFileTypeMessage ?? ERROR_CODES.INVALID_FILE_TYPE_MESSAGE(),
  }

  /** get animation ref */
  const [errorRef, errorAnimation] = useAutoAnimate<any>();
  errorAnimation(errorAnimated);

  /** creates the timer for the error */
  useEffect(() => {
    let timer = null as any;
    const timerDuration = duration ?? DURATION;
    if (error && error.timestamp) {
      setErrorVisible(true);
      if (!timerDuration) return;
      timer = setTimeout(() => {
        setErrorVisible(false);
      }, timerDuration);
    }
    else setErrorVisible(false);
    return () => clearTimeout(timer);
  }, [error]);

  /** @funtion renderAllErrors 
   *  Renders all the errors that occured if multipleErrors prop is passed
   */
  const renderAllErrors = () => {
    if (!error) return <></>;
    const { errors } = error;
    return errors.map((error) => {
      const { code, files } = error;
      const message = errorMessages[code as keyof typeof errorMessages];
      return (
        <StyledErrorBox key={code}>
          <Text b color='$error' size='$sm'>{message}</Text>
          <StyledErrorFiles>
            {files.map((file) => (
              <Text color='$error' key={file} span css={{ marginLeft: '$md', marginRight: '$md' }} size='$xs'>
                {formatFileText(file, TRUNCATION_LENGTH)}
              </Text>
            ))}
          </StyledErrorFiles>
        </StyledErrorBox>
      );
    });
  }

  /** @funtion renderSingleError
   *  Renders the first error of the error that occured, if multipleErrors prop is not passed.
   *  This is the default behaviour.
   */
  const renderSingleError = () => {
    if (!error) return <></>;
    const firstError = error.errors[0];
    const { code, files } = firstError;
    const message = errorMessages[code as keyof typeof errorMessages];
    return (
      <>
        <Text b color='$error' size='$sm'>{message}</Text>
        <StyledErrorFiles>
          {files.map((file) => (
            <Text color='$error' key={file} span css={{ marginLeft: '$md', marginRight: '$md' }} size='$xs'>
              {formatFileText(file, TRUNCATION_LENGTH)}
            </Text>
          ))}
        </StyledErrorFiles>
      </>
    );
  }

  /** should the error be visible? */
  const showError = useMemo(() => {
    return (errorVisible && error.errors) as boolean;
  }, [errorVisible, error]);

  return (
    <UnstyledErrorDiv ref={errorRef}
      spaceY={showError ? spaceY : undefined} {...otherProps}
    >
      {
        // if error is visible, render children if provided (custom error), otherwise render default error
        showError && (
          (children !== undefined) ?
            children :
            <StyledErrorBox className='nextui-dropzone--Error'>
              {multipleErrors ? renderAllErrors() : renderSingleError()}
            </StyledErrorBox>
        )
      }
    </UnstyledErrorDiv>
  );

};
DropzoneErrorComponent.toString = () => '.nextui-dropzone-Error';
DropzoneErrorComponent.displayName = 'NextUI.Dropzone.Error';
export const DropzoneError = DropzoneErrorComponent;
