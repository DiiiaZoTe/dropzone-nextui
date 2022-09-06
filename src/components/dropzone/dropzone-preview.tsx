import React, { useCallback, useMemo } from 'react';
import { useDropzoneContext, DropzonePreviewProvider, useDropzonePreviewContext } from './dropzone-context';
import {
  StyledDropzonePreview, StyledDropzonePreviewItem, HiddenSpan,
  StyledCross, StyledButtonClose, TextFile, TextExtension
} from './dropzone.styles';
import { CSS, Tooltip } from '@nextui-org/react';
import { useFocusRing } from '@react-aria/focus';
import type { FocusRingAria } from '@react-aria/focus';
import { splitFileExtension } from './utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TRUNCATION_LENGTH = 12;

//! RemoveButton  --------------------------------------------------------

/** Remove button props
 *  @requires onclickCallback
 */
interface RemoveButtonProps {
  /** @required Callback to trigger when the button is clicked */
  onclickCallback: () => void;
  /** @optional should this button be displayed 
   *  @default true inherited from preview item
   */
  displayRemove?: boolean;
  /** @optional should the button be animated
   *  @default true inherited from preview item
   */
  animated?: boolean;
  /** @optional should the button be disabled
   *  @default false
   */
  disabled?: boolean;
}

/** focus ring aria interface for focus accessibility */
interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof RemoveButtonProps>;
}

/** Remove button component
 *  @notice this component is not exported,
 *  it is used internally by the DropzonePreviewItem component
 *  and only displayed if the displayRemove prop is set to true
 */
const RemoveButtonComponent = (props: RemoveButtonProps) => {
  /** get props and focus ring */
  const { onclickCallback, displayRemove, animated, disabled } = props;
  const { isFocusVisible, focusProps }: IFocusRingAria = useFocusRing({ autoFocus: false });
  // do not display if not wanted
  if (!displayRemove) return <></>;
  // on click trigger callback to parent
  const clicked = (e: any) => {
    e.stopPropagation();
    onclickCallback();
  }
  /** @notice HiddenSpan is for accessibility */
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
RemoveButtonComponent.toString = () => '.nextui-dropzone-remove';
RemoveButtonComponent.displayName = 'NextUI.Dropzone.Remove';
export const RemoveButton = RemoveButtonComponent;

//! Dropzone.Item  --------------------------------------------------------

/** Dropzone items props
 *  @requires file
 *  @requires key
 */
export interface DropzonePreviewItemProps {
  /** @required file to preview */
  file: File;
  /** @required key (use file name) */
  key: string;
  /** @optional children of the items (content) */
  children?: React.ReactNode | any;
  /** @optional custom css prop */
  css?: CSS;
  /** @optional should the item be animated
   *  @default true inherited from Dropzone Preview via context
   */
  animated?: boolean;
  /** @optional should the remove button be displayed
   *  @default true inherited from Dropzone Preview via context
   */
  displayRemove?: boolean;
}

/** 
 *  Dropzone preview item component
 *  @description 
 *  Used to display the preview of a file
 *  @notice this component should only be used if you want to customize the preview
 *  @requires file
 */
const DropzonePreviewItemComponent = (props: DropzonePreviewItemProps) => {
  /** get props */
  const {
    children,
    animated,
    file,
    displayRemove,
    ...otherProps
  } = props;
  /** get contexts */
  const ctx = useDropzoneContext();
  const ctxPreview = useDropzonePreviewContext();
  const animatedItem = animated ?? ctxPreview.Animated;
  const itemDisplayRemove = displayRemove ?? ctxPreview.DisplayRemove;

  /** @function removeFile
   *  Removes this file from the dropzone
   *  @param {File} fileToRemove
   */
  const removeFile = (fileToRemove: File) => {
    const { Files, setFiles } = ctx;
    setFiles(Files.filter((file: File) =>
      fileToRemove.name !== file.name && fileToRemove.size !== file.size
    ));
  };

  /** @function removeCallback
   *  Callback passed to the remove button
   *  to trigger when the remove button is clicked
   */
  const removeCallback = useCallback(() => removeFile(file),
    [file, removeFile]);

  /*  
   !  User custom preview.
   *  If the user provides Dropzone.Item, then we override the default preview.
   *  We then render the children within our item (without our default style)
   */
  if (children !== null && children !== undefined) {
    return (
      <StyledDropzonePreviewItem animated={animatedItem} {...otherProps}>
        <RemoveButton
          disabled={ctx.Disabled} animated={animatedItem}
          displayRemove={itemDisplayRemove} onclickCallback={removeCallback}
        />
        {children}
      </StyledDropzonePreviewItem>
    );
  }

  /*
   !  Default preview item rendered if no children are provided.
   *  We render the file name and extension 
   */

  // get file name and extension
  const { fileName, fileExtension } = splitFileExtension(file!.name, TRUNCATION_LENGTH);

  /** should we use a tooltip to display the full name because truncated? */
  const useTooltip = useMemo(() => {
    return fileName.length > TRUNCATION_LENGTH;
  }, [fileName]);

  const renderDefaultItem = () => {
    return (
      <StyledDropzonePreviewItem
        animated={animatedItem} defaultStyle={true}
        className='nextui-dropzone--Preview-item'
      >
        <RemoveButton animated={animatedItem} displayRemove={itemDisplayRemove} onclickCallback={removeCallback} />
        <TextFile b color='currentColor'>{fileName}</TextFile>
        <TextExtension animated={animatedItem} b color='currentColor' className='nextui-dropzone--Preview-item-extension'>
          {fileExtension}
        </TextExtension>
      </StyledDropzonePreviewItem>
    );
  }

  return (
    useTooltip
      ? <Tooltip content={file.name.split('.')[0]}> {renderDefaultItem()} </Tooltip >
      : renderDefaultItem()
  );
}
DropzonePreviewItemComponent.toString = () => '.nextui-dropzone-item';
DropzonePreviewItemComponent.displayName = 'NextUI.Dropzone.Item';
export const DropzonePreviewItem = DropzonePreviewItemComponent;

//! Dropzone.Preview  --------------------------------------------------------

/** Dropzone Preview props */
export interface DropzonePreviewProps {
  /** @optional children of the preview
   *  @notice this will override the default preview (user custom)
   */
  children?: React.ReactNode | any;
  /** @optional custom css prop */
  css?: CSS;
  /** @optional should the preview be animated
   *  @default true inherited from Dropzone via context
   */
  animated?: boolean;
  /** @optional should you keep the default styling (grid layout)
   *  @default true 
   */
  defaultStyle?: boolean;
  /** @optional should the preview items be removable
   *  @default true
   */
  displayRemove?: boolean;
  /** @optional add a margin above, below or both.
   *  Useful when changing the positon in the Dropzone
   */
  spaceY?: 'above' | 'below' | 'both';
}

/** 
 *  Dropzone preview component
 *  @description 
 *  Used to display the preview of a file
 *  @notice Passing children will override the default preview.
 *  You will then have to handle the preview yourself.
 *  Using Dropzone.Item will allow you to customize the preview.
 */
const DropzonePreviewComponent = (props: DropzonePreviewProps) => {
  /** get props */
  const { children, animated, defaultStyle, displayRemove, spaceY, ...others } = props;
  /** get context and values */
  const ctx = useDropzoneContext();
  const files = ctx.Files;
  // const setFiles = ctx.setFiles;
  const animatedPreview = animated ?? ctx.Animated;
  /** animation ref */
  const [previewRef, previewAnimation] = useAutoAnimate<any>();
  previewAnimation(animatedPreview!);
  /** render the children if provided */
  const shouldRenderChildren = useMemo(() => {
    return (children !== null && children !== undefined) ? true : false;
  }, [children]);
  /** render default preview files, if any */
  const shouldRenderFiles = useMemo(() => {
    return !files ? false : !files.length ? false : true;
  }, [files]);

  /** @function renderPreview
   *  Renders the preview of the files
   *  - if children are provided, we render the children
   *  - if no children are provided, we render the default preview (if any files)
   *  @notice this function is mostly for readability purposes of the return
   */
  const renderPreview = () => {
    if (shouldRenderChildren)
      return children;
    if (shouldRenderFiles && !shouldRenderChildren)
      return (
        files.map((file: any) => (
          <DropzonePreviewItem
            animated={animatedPreview} displayRemove={displayRemove} file={file}
            key={file.name + '/' + file.size.toString()}
          />
        ))
      );
    return <></>;
  }

  return (
    <DropzonePreviewProvider value={{ Animated: animatedPreview!, DisplayRemove: displayRemove! }}>
      <StyledDropzonePreview ref={previewRef}
        spaceY={shouldRenderFiles ? spaceY : undefined} defaultStyle={defaultStyle}
        className='nextui-dropzone--Preview' {...others}
      >
        {renderPreview()}
      </StyledDropzonePreview>
    </DropzonePreviewProvider >
  );
}
DropzonePreviewComponent.defaultProps = {
  defaultStyle: true,
  displayRemove: true,
}
DropzonePreviewComponent.toString = () => '.nextui-dropzone-preview';
DropzonePreviewComponent.displayName = 'NextUI.Dropzone.Preview';
export const DropzonePreview = DropzonePreviewComponent;