declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': {
      url?: string;
      style?: React.CSSProperties;
      className?: string;
    };
  }
}

declare global {
  interface Window {
    customElements: {
      get(name: string): any;
      define(name: string, constructor: any): void;
    };
  }
} 