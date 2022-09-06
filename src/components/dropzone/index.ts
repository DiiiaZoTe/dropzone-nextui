import Dropzone from './dropzone';

//TODO refactor this to export everything necessary and document

export type { DropzoneProps } from './dropzone';
export * from './dropzone.styles';
export * from './utils';
export type { DropzoneAcceptProps, DropzoneRejectProps } from './dropzone-status';
import { DropzoneBase, DropzoneAccept, DropzoneReject } from './dropzone-status';
import { DropzonePreview, DropzonePreviewItem } from './dropzone-preview';
import { DropzoneError } from './dropzone-error';


Dropzone.Base = DropzoneBase;
Dropzone.Accept = DropzoneAccept;
Dropzone.Reject = DropzoneReject;
Dropzone.Preview = DropzonePreview;
Dropzone.Item = DropzonePreviewItem;
Dropzone.Error = DropzoneError;

export default Dropzone;