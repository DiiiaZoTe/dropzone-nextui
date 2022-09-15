// import components
import Dropzone from './dropzone';

// export styles
export * from './dropzone.styles';

// export types
export type { DropzoneProps } from './dropzone';
export type { DropzoneBaseProps, DropzoneAcceptProps, DropzoneRejectProps } from './dropzone-status';
export type { DropzonePreviewItemProps, DropzonePreviewProps } from './dropzone-preview';
export type { RejectionError, DropzoneRejectionError, DropzoneCustomError, DropzoneErrorProps } from './dropzone-error';
export type { DropzoneFullScrenProps } from './dropzone-fullscreen';

// export utility functions
export * from './utils';

// import subcomponents
import { DropzoneBase, DropzoneAccept, DropzoneReject } from './dropzone-status';
import { DropzonePreview, DropzonePreviewItem } from './dropzone-preview';
import { DropzoneError } from './dropzone-error';
import { DropzoneFullscreen } from './dropzone-fullscreen';

// assign subcomponents to Dropzone
Dropzone.Base = DropzoneBase;
Dropzone.Accept = DropzoneAccept;
Dropzone.Reject = DropzoneReject;
Dropzone.Preview = DropzonePreview;
Dropzone.Item = DropzonePreviewItem;
Dropzone.Error = DropzoneError;
Dropzone.Fullscreen = DropzoneFullscreen;

export default Dropzone;