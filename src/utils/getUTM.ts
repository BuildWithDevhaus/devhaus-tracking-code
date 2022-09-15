import cookie from 'cookie';

export default function getUTM(content = '') {
  const currentSearchQuery = window.location.search;
  const urlParams = new URLSearchParams(currentSearchQuery);
  const fromURL = urlParams?.get(content);
  if (!fromURL) {
    const cookies = cookie.parse(document.cookie);
    const fromCookie = cookies[content];
    if (!fromCookie) {
      if (content === 'utm_source') return 'direct';
      return null;
    }
    return fromCookie;
  }
  //if url params is not empty, return the value then update the cookie with the value
  //cookie expires in 7 days
  if (fromURL) {
    document.cookie = cookie.serialize(content, fromURL, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return fromURL;
  }
}
