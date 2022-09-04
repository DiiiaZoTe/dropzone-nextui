import React, { useCallback, useMemo } from 'react';
import { useDropzoneContext } from './dropzone-context';
import {
  StyledDropzonePreview, StyledDropzonePreviewItem, HiddenSpan,
  StyledCross, StyledButtonClose, TextFile, TextExtension
} from './dropzone.styles';
import { CSS } from '@nextui-org/react';
import { useFocusRing } from '@react-aria/focus';
import type { FocusRingAria } from '@react-aria/focus';
import { splitFileExtension } from './utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TRUNCATION_LENGTH = 12;

//! RemoveButton  --------------------------------------------------------

// Remove button props 
interface RemoveButtonProps {
  onclickCallback: () => void;
  displayRemove?: boolean;
  animated?: boolean;
  disabled?: boolean;
}
interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof RemoveButtonProps>;
}

// Remove button component 
const RemoveButtonComponent = (props: RemoveButtonProps) => {
  const { onclickCallback, displayRemove, animated, disabled } = props;
  const { isFocusVisible, focusProps }: IFocusRingAria = useFocusRing({ autoFocus: false });

  // do not display if not wanted
  if (!displayRemove) return <></>;
  // on click trigger callback to parent
  const clicked = (e: any) => {
    e.stopPropagation();
    onclickCallback();
  }
  return (
    <StyledButtonClose
      animated={animated && !disabled} onClick={clicked}
      className='nextui-dropzone--Preview-item-close'
      isFocusVisible={isFocusVisible && !disabled}
      {...focusProps}
    >
      <StyledCross animated={animated && !disabled} className='close'></StyledCross>
      <HiddenSpan>Remove</HiddenSpan>
    </StyledButtonClose>
  )
}
RemoveButtonComponent.defaultProps = {
  animated: true,
  displayRemove: true
}
RemoveButtonComponent.toString = () => '.nextui-dropzone-remove';
RemoveButtonComponent.displayName = 'NextUI.Dropzone.Remove';
export const RemoveButton = RemoveButtonComponent;

//! Dropzone.Item  --------------------------------------------------------

// dropzone preview item props
export interface DropzonePreviewItemProps {
  /**
   * @required file to preview
   */
  file: File;
  /**
   * @required key
   */
  key: string;
  children?: React.ReactNode | any;
  css?: CSS;
  animated?: boolean;
  displayRemove?: boolean;
}

const DropzonePreviewItemComponent = (props: DropzonePreviewItemProps) => {
  const {
    children,
    animated,
    file,
    displayRemove,
    ...otherProps
  } = props;
  const ctx = useDropzoneContext();
  const animatedItem = animated ?? ctx.Animated;

  // remove current file
  const removeFile = (fileToRemove: File) => {
    const { Files, setFiles } = ctx;
    setFiles(Files.filter((file: File) =>
      fileToRemove.name !== file.name && fileToRemove.size !== file.size
    ));
  };

  // callback fx passed to the remove button
  const removeCallback = useCallback(() => removeFile(file),
    [file, removeFile]);

  // if the user wants to render custom preview let him do so
  if (children !== null && children !== undefined) {
    return (
      <StyledDropzonePreviewItem animated={animatedItem} {...otherProps}>
        <RemoveButton
          disabled={ctx.Disabled} animated={animatedItem}
          displayRemove={displayRemove} onclickCallback={removeCallback}
        />
        {children}
      </StyledDropzonePreviewItem>
    );
  }

  //! passed this point, default item is rendered

  const { fileName, fileExtension } = splitFileExtension(file!.name, TRUNCATION_LENGTH);

  return (
    <StyledDropzonePreviewItem
      animated={animatedItem} defaultStyle={true}
      className='nextui-dropzone--Preview-item'
    >
      <RemoveButton animated={animated} onclickCallback={removeCallback} />
      <TextFile b color='currentColor'>{fileName}</TextFile>
      <TextExtension animated={animated} b color='currentColor' className='nextui-dropzone--Preview-item-extension'>
        {fileExtension}
      </TextExtension>


    </StyledDropzonePreviewItem>
  );
}
DropzonePreviewItemComponent.defaultProps = {
  displayRemove: true
}
DropzonePreviewItemComponent.toString = () => '.nextui-dropzone-item';
DropzonePreviewItemComponent.displayName = 'NextUI.Dropzone.Item';
export const DropzonePreviewItem = DropzonePreviewItemComponent;


//! Dropzone.Preview  --------------------------------------------------------
//TODO: remove all button should be straight forward, can be passed as a prop as well


export interface DropzonePreviewProps {
  children?: React.ReactNode | any;
  css?: CSS;
  animated?: boolean;
  defaultStyle?: boolean;
}

const DropzonePreviewComponent = (props: DropzonePreviewProps) => {
  const { children, animated, defaultStyle, ...others } = props;
  const ctx = useDropzoneContext();
  const files = ctx.Files;
  // const setFiles = ctx.setFiles;
  const animatedPreview = animated ?? ctx.Animated;

  const [previewRef, previewAnimation] = useAutoAnimate<any>();
  previewAnimation(animatedPreview!);

  const shouldRenderChildren = useMemo(() => {
    return (children !== null && children !== undefined) ? true : false;
  }, [children]);

  const shouldRenderFiles = useMemo(() => {
    return !files ? false : !files.length ? false : true;
  }, [files]);

  const hasItemsToShow = useMemo(() => {
    return shouldRenderChildren || shouldRenderFiles;
  }, [shouldRenderChildren, shouldRenderFiles]);

  // const removeAllFiles = useCallback(() => {
  //   setFiles([]);
  // }, [setFiles])

  const renderPreview = () => {
    if (shouldRenderChildren)
      return children;
    if (shouldRenderFiles && !shouldRenderChildren)
      return (
        files.map((file: any) => (
          <DropzonePreviewItem
            animated={animatedPreview} file={file}
            key={file.name + '/' + file.size.toString()}
          />
        ))
      );
    return <></>;
  }

  return (
    <StyledDropzonePreview ref={previewRef}
      hasItems={hasItemsToShow} defaultStyle={defaultStyle ?? true}
      className='nextui-dropzone--Preview' {...others}
    >
      {renderPreview()}
    </StyledDropzonePreview>
  );
}
DropzonePreviewComponent.defaultProps = {
  defaultStyle: true
}
DropzonePreviewComponent.toString = () => '.nextui-dropzone-preview';
DropzonePreviewComponent.displayName = 'NextUI.Dropzone.Preview';
export const DropzonePreview = DropzonePreviewComponent;