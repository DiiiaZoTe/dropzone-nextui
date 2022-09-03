import type { FileRejection, Accept, FileError, DropEvent } from 'react-dropzone';
import type { RejectionError } from './dropzone-error';

export interface useDropzoneProps extends Omit<React.ComponentPropsWithRef<'div'>, 'onDrop'> {

  /** Disable files capturing */
  disabled?: boolean;

  /** Called when files are dropped into dropzone 
   *  @notice We recommend implementing onReject and onAccept instead of this function
   *  @notice Overriding this function will override our file handling logic,
   *  so you will have to handle all the logic yourself. We handled file duplication,
   *  and some extra maxFiles react-dropzone logic for you. You will need to handle
   *  accepting files, rejecting files, updating the files state and the errors.
   */
  onDrop?<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent): void;

  /** Called during onDrop to retrieve rejected files after our handling
   *  fileRejections are grouped by error code
   *  you can import ERROR_CODES for reference
   *  @notice this does not override our error display logic
   *  if you wish to do so, set displayError to false 
   */
  onReject?(fileRejections: RejectionError[]): void;

  /** Called during onDrop to retrieve accepted files after our handling
   *  @notice By overriding this function, you will have to handle the files state yourself
   *  but you will keep our onDrop handling (duplicates, extra maxFiles logic etc...)
   */
  onAccept?(acceptedFiles: File[]): void;

  /** File types to accept  */
  accept?: Accept | string[];

  /** Get open function as ref */
  openRef?: React.ForwardedRef<() => void | undefined>;

  /** Allow selection of multiple files */
  multiple?: boolean;

  /** Set maximum file size in bytes */
  maxSize?: number;

  /** Name of the form control. Submitted with the form as part of a name/value pair. */
  name?: string;

  /** Number of files that user can pick */
  maxFiles?: number;

  /** Set to true to autofocus the root element */
  autoFocus?: boolean;

  /** If false, disables click to open the native file selection dialog */
  activateOnClick?: boolean;

  /** If false, disables drag 'n' drop */
  activateOnDrag?: boolean;

  /** If false, disables Space/Enter to open the native file selection dialog. Note that it also stops tracking the focus state. */
  activateOnKeyboard?: boolean;

  /** If false, stops drag event propagation to parents */
  dragEventsBubbling?: boolean;

  /** Called when the `dragenter` event occurs */
  onDragEnter?(event: React.DragEvent<HTMLElement>): void;

  /** Called when the `dragleave` event occurs */
  onDragLeave?(event: React.DragEvent<HTMLElement>): void;

  /** Called when the `dragover` event occurs */
  onDragOver?(event: React.DragEvent<HTMLElement>): void;

  /** Called when user closes the file selection dialog with no selection */
  onFileDialogCancel?(): void;

  /** Called when user opens the file selection dialog */
  onFileDialogOpen?(): void;

  /** Custom validar, accepts a File object and return null if accepted or error object/array of error objects if file rejected  */
  validator?(file: File): null | FileError | FileError[];

  /** If false, allow dropped items to take over the current browser window */
  preventDropOnDocument?: boolean;
}