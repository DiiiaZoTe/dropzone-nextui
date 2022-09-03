import React, { useMemo } from 'react';
import { useDropzoneContext } from './dropzone-context';
import { StyledDropzonePreview, StyledDropzonePreviewItem, HiddenSpan } from './dropzone.styles';
import { Badge, Text, CSS } from '@nextui-org/react';
import { Close } from './icons/dropzone'

const TRUNCATION_LENGTH = 12;

const formatFileText = (name: string) => {
  // split the file name and extension
  let [fileName, fileExtension] = name.split('.');
  // if the file name is longer than 20 characters, truncate it
  fileName.length > TRUNCATION_LENGTH
    ? fileName = fileName.substring(0, TRUNCATION_LENGTH) + '...'
    : fileName = fileName;

  return { fileName, fileExtension };
}

export interface DropzonePreviewItemProps {
  file?: File;
  children?: React.ReactNode | any;
  css?: CSS;
  animated?: boolean;
}

const DropzonePreviewItemComponent = (props: DropzonePreviewItemProps) => {
  const { children, ...otherProps } = props;
  if (children !== null && children !== undefined) {
    return (
      <StyledDropzonePreviewItem {...otherProps}>
        <Badge
          content={<Close />}
        >
          {children}
        </Badge>
      </StyledDropzonePreviewItem>
    );
  }
  //TODO: test about code to see if badge renders correctly, then add remove button to remove item

  //TODO: then refactor below to display default if no child is provided

  //TODO: add remove button and extension to default item

  const { file, animated } = otherProps;
  const { fileName, fileExtension } = formatFileText(file.name);

  const renderItem = () => {
    if (children) {

    }

  }

  return (
    <StyledDropzonePreviewItem
      animated={animated as any}
      className='nextui-dropzone--Preview-item'
    >
      {fileName}
    </StyledDropzonePreviewItem>
  );
}
DropzonePreviewItemComponent.defaultProps = {
  animated: true
}
export const DropzonePreviewItem = DropzonePreviewItemComponent;


export interface DropzonePreviewProps {
  children?: React.ReactNode | any;
  css?: CSS;
  animated?: boolean;
}

const DropzonePreviewComponent = (props: DropzonePreviewProps) => {
  const { children, animated } = props;
  const ctx = useDropzoneContext();
  const files = ctx.Files;

  const shouldRenderChildren = useMemo(() => {
    return (children !== null && children !== undefined) ? true : false;
  }, [children]);

  const shouldRenderFiles = useMemo(() => {
    return !files ? false : !files.length ? false : true;
  }, [files]);

  const renderPreview = () => {
    if (!ctx.Preview) return <></>;
    if (shouldRenderChildren)
      return <>{children}</>;
    if (shouldRenderFiles && !shouldRenderChildren)
      return (
        <StyledDropzonePreview className='nextui-dropzone--Preview' {...props}>
          {
            files.map((file: any) => (
              <DropzonePreviewItem animated={animated}
                file={file} key={file.name + '/' + file.size.toString()} />
            ))
          }
        </StyledDropzonePreview>
      )
    return <></>;
  }

  return (
    renderPreview()
  );
}
DropzonePreviewComponent.displayName = 'NextUI.Dropzone.Preview';
export const DropzonePreview = DropzonePreviewComponent;