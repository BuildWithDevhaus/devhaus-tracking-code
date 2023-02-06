export default function isGA4Exist() {
  //Returns true if the script tag has the "ga4" attribute
  const scriptTag = document.querySelector('#devhaus-tracking-code') as HTMLScriptElement;
  return scriptTag.hasAttribute('ga4');
}
