const currentSearchQuery = window.location.search;
const urlParams = new URLSearchParams(currentSearchQuery);
export default function getUTM(content = '') {
  const fromURL = urlParams?.get(content);
  if (!fromURL && content === 'utm_source') {
    return 'direct';
  }
  return fromURL;
}
