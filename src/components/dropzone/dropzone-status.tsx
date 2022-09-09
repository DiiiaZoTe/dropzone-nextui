import React from 'react';
import { DropzoneContextValue, useDropzoneContext } from './dropzone-context';
import { StyledDropzoneStatus } from './dropzone.styles';
import { CSS } from '@nextui-org/react';


export interface DropzoneStatusProps {
  /** @optional children are the elements to display when status is displaying */
  children?: React.ReactNode;
  /** @optional used to override the main dropzone when that status is active */
  css?: CSS;
  /** @optional animated is whether the status should be animated
   *  @default true inherited from the dropzone component
   */
  animated?: boolean;
  /** @optional add a margin above, below or both.
   *  Useful when changing positon in the Dropzone
   */
  spaceY?: 'above' | 'below' | 'both';
}

/** dropzone status component
 *  @function createDropzoneStatus
 *  returns the component associated to the current context status.
 *  Otherwise doesn't return anything (doesn't render anything)
 *  @param {keyof createDropzoneStatus} status - the status to create
 */
const createDropzoneStatus = (status: keyof DropzoneContextValue) => {
  const Component = (props: DropzoneStatusProps): JSX.Element => {
    /** get props */
    const { children, animated, spaceY, ...otherProps } = props;
    /** get context, if status' context value true render it */
    const ctx = useDropzoneContext();
    if (ctx[status]) {
      const animatedStatus = animated ?? ctx.Animated;
      return (
        <StyledDropzoneStatus
          spaceY={ctx.Files.length ? spaceY : undefined}
          animated={animatedStatus}
          className={`nextui-dropzone--${status}`}
          {...otherProps}
        >
          {children}
        </StyledDropzoneStatus>
      );
    }
    return <></>;
  };

  Component.toString = () => `.nextui - dropzone - ${status} `;
  Component.displayName = `NextUI.Dropzone.${status} `;
  return Component;
}

export const DropzoneBase = createDropzoneStatus('Base');
export const DropzoneAccept = createDropzoneStatus('Accept');
export const DropzoneReject = createDropzoneStatus('Reject');

export type DropzoneBaseProps = DropzoneStatusProps;
export type DropzoneAcceptProps = DropzoneStatusProps;
export type DropzoneRejectProps = DropzoneStatusProps;