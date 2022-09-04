import { createContext } from "@utils/context/createContext";

/** The various dropzone statuses
 *  - Base: the dropzone is ready to receive files
 *  - Accept: drop in progress, files should be accepted
 *  - Reject: drop in progress, files should be rejected
 */
export interface DropzoneStatuses {
  Base: boolean;
  Accept: boolean;
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