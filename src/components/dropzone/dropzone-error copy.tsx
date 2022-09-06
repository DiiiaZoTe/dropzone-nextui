import React, { useEffect, useMemo, useState } from 'react';
import { CSS, Text, styled, Spacer } from '@nextui-org/react';
import { ERROR_CODES, getCodeMessage, formatFileText } from './utils';
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TRUNCATION_LENGTH = 15;
const TIME = 6000; //TODO: add option timer to props (number in ms or 0 for no limit)

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
 * - timestamp: the time the error was created (for timeout purposes)
 */
export interface DropzoneRejectionError {
  errors: RejectionError[];
  timestamp: number;
}

/** Dropzone error props
 *  //! to finish
 */
export interface DropzoneErrorProps {
  error?: DropzoneRejectionError;
  isVisible?: boolean;
  setIsVisible?: (isVisible: boolean) => void;
  animated?: boolean;
  maxFiles?: number;
  maxSize?: number;
  //all above to context
  children?: React.ReactNode;
  css?: CSS;
  tooManyFilesMessage?: string;
  fileTooBigMessage?: string;
  invalidFileTypeMessage?: string;
  spaceY?: 'above' | 'below' | 'both';
}

/** Unstyled main container */
const MainDivContainer = styled('div', {
  position: 'relative',
  width: '100%',
});

/** Container holding the error */
const ErrorBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  borderRadius: '$md',
  padding: '$md',
  margin: 'auto',
});

/** Container for files */
const BoxFiles = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
});

//TODO refactor this component to use context to pass error and visible state, maxFiles and maxSize
//if children, then let him do the rendering of the error...

//TODO then have it as Dropzone.Error and test if we can change CSS prop inside index

export const DropzoneErrorComponent = (props: DropzoneErrorProps) => {
  const { error, isVisible, setIsVisible, animated, maxSize, maxFiles, ...otherProps } = props;

  
  //! get this from props otherwise from context

  const [errorRef, errorAnimation] = useAutoAnimate<any>();
  errorAnimation(animated!);

  useEffect(() => {
    let timer = null as any;
    if (error && error.timestamp) {
      setIsVisible(true);
      if (!TIME) return;
      timer = setTimeout(() => {
        setIsVisible(false);
      }, TIME);
    }
    else setIsVisible(false);
    return () => clearTimeout(timer);
  }, [error]);

  const showError = useMemo(() => {
    return (isVisible && error.errors)
  }, [isVisible, error]);

  const renderError = () => {
    if (error.errors[0].code === ERROR_CODES.TOO_MANY_FILES) {
      return (
        <>
          <Text b color='$error' size='$sm'>
            {getCodeMessage(ERROR_CODES.TOO_MANY_FILES, maxSize!, maxFiles!)}
          </Text>
        </>
      );
    }
    return (
      <>
        <Text b color='$error' size='$sm'>{getCodeMessage(error.errors[0].code, maxSize!, maxFiles!)}</Text>
        <BoxFiles>
          {
            err.errors[0].files.map((file: string) => {
              return (
                <Text color='$error' key={file} span css={{ marginLeft: '$md', marginRight: '$md' }} size='$xs'>{formatFileText(file, TRUNCATION_LENGTH)}</Text>
              );
            })
          }
        </BoxFiles>
      </>
    )
  };

  return (
    <MainDivContainer ref={errorRef} >
      {
        showError &&
        <>
          <ErrorBox className='nextui-dropzone--Error' {...otherProps}>
            {renderError()}
          </ErrorBox>
          {
            /* <Spacer y={1} /> */ //TODO add option to add space above or after the error
          }
        </>
      }
    </MainDivContainer>
  );
};
DropzoneErrorComponent.toString = () => '.nextui-dropzone-Error';
DropzoneErrorComponent.displayName = 'NextUI.Dropzone.Error';
export const DropzoneError = DropzoneErrorComponent;



/* 
  err: props or context, props means it's a custom error, context means it's a dropzone error
  isVisible: props or context, props means it's a custom error, context means it's a dropzone error
  setIsVisible: props or context, if isVisible from props then this has to be from props too
  animated?: boolean;
  maxFiles?: context can be null (error will not trigger)
  maxSize?: context can be null (error will not trigger)
  
  all below to props only
  children?: React.ReactNode; // will be displayed before the error message if custom error
  css?: CSS;
  tooManyFilesMessage?: string; 
  fileTooBigMessage?: string;
  invalidFileTypeMessage?: string;
  spaceY: css variant 'above' 'below' 'both
*/