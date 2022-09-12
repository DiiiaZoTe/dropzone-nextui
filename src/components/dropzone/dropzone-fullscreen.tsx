import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzoneContext } from './dropzone-context';
import { StyledFullscreen } from './dropzone.styles';


export interface DropzoneFullScrenProps {
  contentAccept?: ReactNode;
  contentReject?: ReactNode;
}

const DropzoneFullscreenComponent = (props: DropzoneFullScrenProps) => {
  const { contentAccept, contentReject } = props;

  const ctx = useDropzoneContext();

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
  }, []);

  const renderContent = () => {
    if (ctx.Accept && contentAccept !== undefined) return contentAccept;
    if (ctx.Reject && contentReject !== undefined) return contentReject;
    return <></>;
  }

  return (
    <StyledFullscreen visible={isDragging} animated={true}>
      {renderContent()}
    </StyledFullscreen>
  );
};
DropzoneFullscreenComponent.toString = () => '.nextui-dropzone-fullscreen';
DropzoneFullscreenComponent.displayName = 'NextUI.Dropzone.Fullscreen';
export const DropzoneFullscreen = DropzoneFullscreenComponent;