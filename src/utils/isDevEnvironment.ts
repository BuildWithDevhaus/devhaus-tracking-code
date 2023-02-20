export default function isDevEnvironment() {
  return window.location.hostname.includes('webflow.io');
}
