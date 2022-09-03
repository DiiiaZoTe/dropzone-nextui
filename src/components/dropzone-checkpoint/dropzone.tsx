import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
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
  alwaysShowBase?: boolean;
  preview?: boolean;
  animated?: boolean;
  bordered?: boolean;
  background?: 'default' | 'primary' |
  'secondary' | 'transparent' | 'glass';
  color?: 'default' | 'primary' | 'secondary';
  borderColor?: 'default' | 'primary' | 'secondary';
  borderWeight?: 'light' | 'normal' |
  'bold' | 'extrabold' | 'black';
  borderStyle?: 'dashed' | 'solid' | 'dotted';
  className?: string;
}
export type DropzoneProps = Props;

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof DropzoneProps>;
}

const Dropzone = (props: DropzoneProps) => {
  const {
    children,
    css,
    files,
    setFiles,
    alwaysShowBase,
    preview,
    animated,
    bordered,
    background,
    color,
    borderColor,
    borderWeight,
    borderStyle,
    className,
    disabled,
    multiple,
    maxSize,
    accept,
    onDrop,
    onReject,
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
    preventDropOnDocument,
    ...otherProps
  } = props;

  const [invalidShake, setInvalidShake] = useState(false);
  const { isFocused, isFocusVisible, focusProps }: IFocusRingAria = useFocusRing({ autoFocus });
  console.log(isFocusVisible, isFocused);

  const defaultOnDrop = useCallback((acceptedFiles: File[]) => {
    if (!multiple) return setFiles([acceptedFiles[0]]);
    const newFiles = acceptedFiles.map((file: File) => (file)) as File[];
    const testMePlease = files.filter((file: File) =>
      !newFiles.find((newFile: File) =>
        newFile.name === file.name && newFile.size === file.size
      )
    );
    setFiles([...testMePlease, ...newFiles]);
  }, [files, setFiles]);

  const defautOnReject = useCallback((err: any) => {
    console.log('onReject: ', err);
    setInvalidShake(true);
    setTimeout(() => setInvalidShake(false), 500);
  }, [setInvalidShake]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open } = useDropzone({
    onError: defautOnReject,
    onDropAccepted: (onDrop !== undefined ? onDrop : defaultOnDrop),
    onDropRejected: (onReject !== undefined ? onReject : defautOnReject),
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
    preventDropOnDocument,
  });

  assignRef(openRef, open);

  const showBase = useMemo(() =>
    (!isDragActive) && (alwaysShowBase! || !files.length),
    [alwaysShowBase, isDragActive, files]);

  // helps to pass down animated props to children (statuses)
  const childrenWithProps = React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    if (child.props.animated !== null && child.props.animated !== undefined) return child;
    return React.cloneElement(child, { animated });
  });

  const status = useMemo(() => {
    return showBase ? 'Base' : isDragAccept ? 'Accept' : isDragReject ? 'Reject' : 'Base';
  }, [showBase, isDragAccept, isDragReject]);

  // manages css overrides of the dropzone based on the status (Base, Accept, Reject)
  const statusCSS = useMemo(() => {
    const filteredChildren: any[] = React.Children.toArray(children).filter((child: any) => child.type.displayName === `NextUI.Dropzone.${status}`);
    if (filteredChildren.length === 0) return {};
    return filteredChildren[0]!.props.css;
  }, [status]);

  const statusCSSOverride = (what: string) => {
    if (statusCSS === undefined) return false;
    return statusCSS[what] !== undefined;
  }


  return (
    <DropzoneProvider value={{ Base: showBase, Preview: preview!, Accept: isDragAccept, Reject: isDragReject, Files: files, setFiles: setFiles }}>
      <StyledDropzone
        data-base={showBase || undefined}
        data-accept={isDragAccept || undefined}
        data-reject={isDragReject || undefined}
        bordered={bordered}
        animated={animated}
        disabled={disabled}
        isFocusVisible={isFocusVisible && !disabled}
        mainBackground={!statusCSSOverride('background') ? background : undefined}
        mainTextColor={!statusCSSOverride('color') ? color : undefined}
        mainBorderColor={!statusCSSOverride('borderColor') ? borderColor : undefined}
        mainBorderStyle={!statusCSSOverride('borderStyle') ? borderStyle : undefined}
        mainBorderWeight={!statusCSSOverride('bw') ? borderWeight : undefined}
        className={clsx(
          'nextui-dropzone',
          `nextui-dropzone--${status}`,
          invalidShake && 'nextui-dropzone--invalid-shake',

          className
        )}
        css={{ ...statusCSS, ...(css as any) }}
        {...getRootProps({})}
        {...focusProps}
        {...otherProps}
      >
        <input {...getInputProps()} name={name} />
        {childrenWithProps}
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
};

Dropzone.toString = () => '.nextui-dropzone';
Dropzone.displayName = 'NextUI.Dropzone';

const defaultDropzoneProps: Partial<DropzoneProps> = {
  multiple: true,
  maxSize: Infinity,
  autoFocus: false,
  activateOnClick: true,
  activateOnDrag: true,
  dragEventsBubbling: true,
  activateOnKeyboard: true,
  alwaysShowBase: true,
  preview: true,
  animated: true,
  bordered: false,
  background: 'default',
  color: 'default',
  borderColor: 'default',
  borderStyle: 'dashed',
  borderWeight: 'normal',
  className: '',
};
Dropzone.defaultProps = defaultDropzoneProps;

export default Dropzone as DropzoneComponent<DropzoneProps>;