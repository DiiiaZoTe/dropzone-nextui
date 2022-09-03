import Dropzone from './dropzone';

export type { DropzoneProps } from './dropzone';
export * from './dropzone.styles';
export type { DropzoneAcceptProps, DropzoneRejectProps } from './dropzone-status';
import { DropzoneBase, DropzoneAccept, DropzoneReject } from './dropzone-status';
import { DropzonePreview } from './dropzone-preview';

Dropzone.Base = DropzoneBase;
Dropzone.Accept = DropzoneAccept;
Dropzone.Reject = DropzoneReject;
Dropzone.Preview = DropzonePreview;

export default Dropzone;