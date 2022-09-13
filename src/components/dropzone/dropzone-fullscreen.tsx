import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzoneContext } from './dropzone-context';
import { StyledFullscreen } from './dropzone.styles';


export interface DropzoneFullScrenProps {
  /** @optional Fullscreen content to display if files are accepted */
  contentAccept?: ReactNode;
  /** @optional Fullscreen content to display if files are rejected */
  contentReject?: ReactNode;
  /** @optional should the fullscreen be animated */
  animated?: boolean;
}

const DropzoneFullscreenComponent = (props: DropzoneFullScrenProps) => {
  /** get props */
  const { contentAccept, contentReject, ...others } = props;

  /** get context */
  const ctx = useDropzoneContext();
  const animatedFullscreen = props.animated ?? ctx.Animated;

  /** init fullscreen variables */
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  /** handle drag in events */
  const handleDragIn = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current++;
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  /** handle drag out events */
  const handleDragOut = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current > 0) return;
    setIsDragging(false);
  }, []);

  /** handle drop events */
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

  /** add/remove event listeners */
  useEffect(() => {
    window.addEventListener("dragenter", handleDragIn);
    window.addEventListener("dragleave", handleDragOut);
    window.addEventListener("drop", handleDrop);
    return function cleanUp() {
      window.removeEventListener("dragenter", handleDragIn);
      window.removeEventListener("dragleave", handleDragOut);
      window.removeEventListener("drop", handleDrop);
    };
  });

  return (
    <StyledFullscreen visible={true} pointers={isDragging} animated={animatedFullscreen}
      aria-label="Drop files anywhere on the screen"
    >
      <StyledFullscreen visible={ctx.Accept && contentAccept !== undefined} animated={animatedFullscreen} {...others} >{contentAccept}</StyledFullscreen>
      <StyledFullscreen visible={ctx.Reject && contentReject !== undefined} animated={animatedFullscreen} {...others} >{contentReject}</StyledFullscreen>
    </StyledFullscreen>
  );
};
DropzoneFullscreenComponent.toString = () => '.nextui-dropzone-fullscreen';
DropzoneFullscreenComponent.displayName = 'NextUI.Dropzone.Fullscreen';
export const DropzoneFullscreen = DropzoneFullscreenComponent;