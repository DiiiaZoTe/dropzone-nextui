import { createContext } from "@utils/context/createContext";

/** The various dropzone statuses 
 *  - Base
 *  - Accept
 *  - Reject
 */
export interface DropzoneStatuses {
  /** Base: the dropzone is ready to receive files */
  Base: boolean;
  /** Accept: drop in progress, files should be accepted */
  Accept: boolean;
  /** Reject: drop in progress, files should be rejected */
  Reject: boolean;
}

/** The values stored in the dropzone context 
 * - all the statuses (DropzoneStatuses)
 * - Files: the files currently in the dropzone
 * - setFiles: a function to set the files in the dropzone
 * - Disabled: whether the dropzone is disabled
 * - Animated: whether the dropzone is animated
 */
export interface DropzoneContextValue extends DropzoneStatuses {
  Files: File[];
  setFiles: (files: File[]) => void;
  Disabled: boolean;
  Animated: boolean;
};

/** Creates the dropzone context provider */
export const [DropzoneProvider, useDropzoneContext] =
  createContext<DropzoneContextValue>({
    name: 'DropzoneContext',
    errorMessage:
      'useDropzoneContext: `context` is undefined. Seems you forgot to wrap all components within `<Dropzone />`'
  });

/** The context of the preview
 *  - DisplayRemove: whether the remove buttons should be displayed
 */
export interface DropzonePreviewContextValue {
  Animated: boolean;
  DisplayRemove: boolean;
};

/** Creates the dropzone preview context provider */
export const [DropzonePreviewProvider, useDropzonePreviewContext] =
  createContext<DropzonePreviewContextValue>({
    name: 'DropzonePreviewContext',
    errorMessage:
      'useDropzonePreviewContext: `context` is undefined. Seems you forgot to wrap all components within `<Dropzone.Preview />`'
  });