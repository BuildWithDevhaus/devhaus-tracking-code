export default function isDevEnvironment(stagingDomain?: string) {
  return window.location.hostname.includes(stagingDomain || 'webflow.io');
}
