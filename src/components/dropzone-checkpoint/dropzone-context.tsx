import { createContext } from "@utils/context/createContext";

export interface DropzoneStatuses {
  Base: boolean;
  Preview: boolean;
  Accept: boolean;
  Reject: boolean;
}

export interface DropzoneContextValue extends DropzoneStatuses {
  Files: File[];
  setFiles: (files: File[]) => void;
};

export const [DropzoneProvider, useDropzoneContext] =
  createContext<DropzoneContextValue>({
    name: 'DropzoneContext',
    errorMessage:
      'useDropzoneContext: `context` is undefined. Seems you forgot to wrap all components within `<Dropzone />`'
  });