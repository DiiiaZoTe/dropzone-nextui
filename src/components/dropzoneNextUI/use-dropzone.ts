import type { FileRejection, Accept, FileError, DropEvent } from 'react-dropzone';
import type { RejectionError } from './dropzone-error';

export interface useDropzoneProps extends Omit<React.ComponentPropsWithRef<'div'>, 'onDrop'> {

  /** @optional Disable files capturing */
  disabled?: boolean;

  /** @optional Called when files are dropped into dropzone 
   *  @notice We recommend implementing onReject and onAccept instead of this function
   *  @notice Overriding this function will override our file handling logic,
   *  so you will have to handle all the logic yourself. We handled file duplication,
   *  and some extra maxFiles react-dropzone logic for you. You will need to handle
   *  accepting files, rejecting files, updating the files state and the errors.
   */
  onDrop?<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent): void;

  /** @optional Called during onDrop to retrieve rejected files after our handling
   *  fileRejections are grouped by error code
   *  you can import ERROR_CODES for reference
   *  @notice this does not override our error display logic
   *  if you wish to do so, set displayError to false 
   */
  onReject?(fileRejections: RejectionError[]): void;

  /** @optional Called during onDrop to retrieve accepted files after our handling
   *  @notice By overriding this function, you will have to handle the files state yourself
   *  but you will keep our onDrop handling (duplicates, extra maxFiles logic etc...)
   */
  onAccept?(acceptedFiles: File[]): void;

  /** @optional File types to accept 
   *  @notice By default, accepts all file types
   *  Check out MIME types for reference
   */
  accept?: Accept | string[];

  /** @optional Get open function as ref 
   *  @description Usefull if you want to open the dropzone programmatically or with a button
   */
  openRef?: React.ForwardedRef<() => void | undefined>;

  /** @optional Allow selection of multiple files 
   *  @default true 
   */
  multiple?: boolean;

  /** @optional Set maximum file size in bytes
   *  @default undefined There is no limit
   *  @notice You can import the getBytes function
   *  to help setting appropriate values
   *  @example getBytes(1, 'MB') will return the number of bytes in 1MB
   */
  maxSize?: number;

  /** @optional Name of the form control. Submitted with the form as part of a name/value pair. */
  name?: string;

  /** @optional Limit the number of files that user can pick */
  maxFiles?: number;

  /** @optional Set to true to autofocus the root element */
  autoFocus?: boolean;

  /** @optional If false, disables click to open the native file selection dialog */
  activateOnClick?: boolean;

  /** @optional If false, disables drag 'n' drop */
  activateOnDrag?: boolean;

  /** @optional If false, disables Space/Enter to open the native file selection dialog. 
   * Note that it also stops tracking the focus state. 
   */
  activateOnKeyboard?: boolean;

  /** @optional If false, stops drag event propagation to parents */
  dragEventsBubbling?: boolean;

  /** @optional Called when the `dragenter` event occurs */
  onDragEnter?(event: React.DragEvent<HTMLElement>): void;

  /** @optional Called when the `dragleave` event occurs */
  onDragLeave?(event: React.DragEvent<HTMLElement>): void;

  /** @optional Called when the `dragover` event occurs */
  onDragOver?(event: React.DragEvent<HTMLElement>): void;

  /** @optional Called when user closes the file selection dialog with no selection */
  onFileDialogCancel?(): void;

  /** @optional Called when user opens the file selection dialog */
  onFileDialogOpen?(): void;

  /** @optional Custom validator,
   *  @param File accepts a File object
   *  @return 
   *  - null if accepted
   *  - error object/array of error objects if file rejected 
   */
  validator?(file: File): null | FileError | FileError[];

  /** @optional  If false, allow dropped items to take over the current browser window */
  preventDropOnDocument?: boolean;
}