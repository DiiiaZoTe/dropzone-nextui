import React from 'react';
import { DropzoneContextValue, useDropzoneContext } from './dropzone-context';
import { StyledDropzoneStatus } from './dropzone.styles';
import { CSS } from '@nextui-org/react';

// Dropzone status props
export interface DropzoneStatusProps {
  children?: React.ReactNode;
  css?: CSS;
  animated?: boolean;
}

/** dropzone status component
 *  Returns the component associated to the current context status
 *  Otherwise doesn't return anything
 */
const createDropzoneStatus = (status: keyof DropzoneContextValue) => {
  const Component = (props: DropzoneStatusProps): JSX.Element => {
    const { children, animated, ...otherProps } = props;
    const ctx = useDropzoneContext();
    const animatedStatus = animated ?? ctx.Animated;
    if (ctx[status]) {
      return (
        <StyledDropzoneStatus
          animated={animatedStatus}
          {...otherProps}
        >
          {children}
        </StyledDropzoneStatus>
      );
    }
    return <></>;
  };

  Component.toString = () => `.nextui-dropzone-${status}`;
  Component.displayName = `NextUI.Dropzone.${status}`;
  return Component;
}

export const DropzoneBase = createDropzoneStatus('Base');
export const DropzoneAccept = createDropzoneStatus('Accept');
export const DropzoneReject = createDropzoneStatus('Reject');

export type DropzoneBaseProps = DropzoneStatusProps;
export type DropzoneAcceptProps = DropzoneStatusProps;
export type DropzoneRejectProps = DropzoneStatusProps;