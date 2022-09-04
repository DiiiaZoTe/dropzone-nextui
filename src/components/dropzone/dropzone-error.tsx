import React, { useEffect, useMemo } from 'react';
import { CSS, Text, styled, Spacer } from '@nextui-org/react';
import { ERROR_CODES, getCodeMessage, formatFileText } from './utils';
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TRUNCATION_LENGTH = 15;
const TIME = 6000; //TODO: add option timer to props (number in ms or 0 for no limit)

export interface RejectionError {
  code: string;
  files: string[];
};

export interface CustomRejectionError {
  errors: RejectionError[];
  timestamp: number;
}

interface DropzoneErrorProps {
  err: CustomRejectionError;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  animated: boolean;
  maxFiles?: number;
  maxSize?: number;
  children?: React.ReactNode;
  css?: CSS;
}

const FullDiv = styled('div', {
  position: 'relative',
  width: '100%',
});

const Box = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  borderRadius: '$md',
  padding: '$md',
  margin: 'auto',
});

const Box2 = styled('div', {
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

export const DropzoneError = (props: DropzoneErrorProps) => {
  const { err, isVisible, setIsVisible, animated, maxSize, maxFiles, ...otherProps } = props;

  const [errorRef, errorAnimation] = useAutoAnimate<any>();
  errorAnimation(animated!);

  useEffect(() => {
    let timer = null as any;
    if (err.timestamp) {
      setIsVisible(true);
      if (!TIME) return;
      timer = setTimeout(() => {
        setIsVisible(false);
      }, TIME);
    }
    else setIsVisible(false);
    return () => clearTimeout(timer);
  }, [err]);

  const showError = useMemo(() => {
    return (isVisible && err.errors)
  }, [isVisible, err]);

  const renderError = () => {
    if (err.errors[0].code === ERROR_CODES.TOO_MANY_FILES) {
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
        <Text b color='$error' size='$sm'>{getCodeMessage(err.errors[0].code, maxSize!, maxFiles!)}</Text>
        <Box2>
          {
            err.errors[0].files.map((file: string) => {
              return (
                <Text color='$error' key={file} span css={{ marginLeft: '$md', marginRight: '$md' }} size='$xs'>{formatFileText(file, TRUNCATION_LENGTH)}</Text>
              );
            })
          }
        </Box2>
      </>
    )
  };

  return (
    <FullDiv ref={errorRef} >
      {
        showError &&
        <>
          <Box className='nextui-dropzone--Error' {...otherProps}>
            {renderError()}
          </Box>
          <Spacer y={1} />
        </>
      }
    </FullDiv>
  );
};