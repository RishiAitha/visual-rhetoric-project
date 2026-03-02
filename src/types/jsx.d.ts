/// <reference types="react" />

// Provide a minimal JSX.IntrinsicElements declaration to satisfy TS in this workspace.
// This keeps element typings permissive for dynamic SVG injection used by the VisualStage.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export {}
