export {};

declare global {
  interface Window {
    analytics: any;
    Webflow: any;
    dataLayer: any;
  }
}
