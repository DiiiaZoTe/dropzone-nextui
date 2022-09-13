import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzoneContext } from './dropzone-context';
import { StyledFullscreen } from './dropzone.styles';

export interface DropzoneFullScrenProps {
  contentAccept?: ReactNode;
  contentReject?: ReactNode;
  animated?: boolean;
}

const DropzoneFullscreenComponent = (props: DropzoneFullScrenProps) => {
  const { contentAccept, contentReject, ...others } = props;

  const ctx = useDropzoneContext();
  const animatedFullscreen = props.animated ?? ctx.Animated;

  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDrag = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragIn = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current++;
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current > 0) return;
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dragCounter.current = 0;
      console.log(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("dragenter", handleDragIn);
    window.addEventListener("dragleave", handleDragOut);
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("drop", handleDrop);
    return function cleanUp() {
      window.removeEventListener("dragenter", handleDragIn);
      window.removeEventListener("dragleave", handleDragOut);
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("drop", handleDrop);
    };
  });

  return (
    <StyledFullscreen visible={true} pointers={isDragging} animated={animatedFullscreen} >
      <StyledFullscreen visible={ctx.Accept && contentAccept !== undefined} animated={animatedFullscreen} {...others} >{contentAccept}</StyledFullscreen>
      <StyledFullscreen visible={ctx.Reject && contentReject !== undefined} animated={animatedFullscreen} {...others} >{contentReject}</StyledFullscreen>
    </StyledFullscreen>
  );
};
DropzoneFullscreenComponent.toString = () => '.nextui-dropzone-fullscreen';
DropzoneFullscreenComponent.displayName = 'NextUI.Dropzone.Fullscreen';
export const DropzoneFullscreen = DropzoneFullscreenComponent;