import React from 'react';
import { DropzoneContextValue, useDropzoneContext } from './dropzone-context';
import { StyledDropzoneStatus } from './dropzone.styles';
import { CSS } from '@nextui-org/react';

export interface DropzoneStatusProps {
  children?: React.ReactNode;
  css?: CSS;
  animated?: boolean;
}

const createDropzoneStatus = (status: keyof DropzoneContextValue) => {
  const Component = (props: DropzoneStatusProps): JSX.Element => {
    const { children, animated } = props;

    const ctx = useDropzoneContext();
    if (ctx[status]) {
      return (
        <StyledDropzoneStatus
          animated={animated}
        >
          {children}
        </StyledDropzoneStatus>
      );
    }
    return <></>;
  };

  Component.displayName = `NextUI.Dropzone.${status}`;
  return Component;
}


export const DropzoneBase = createDropzoneStatus('Base');
export const DropzoneAccept = createDropzoneStatus('Accept');
export const DropzoneReject = createDropzoneStatus('Reject');

export type DropzoneBaseProps = DropzoneStatusProps;
export type DropzoneAcceptProps = DropzoneStatusProps;
export type DropzoneRejectProps = DropzoneStatusProps;