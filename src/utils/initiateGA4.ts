export default function initiateGA4() {
  const scriptTag = document.querySelector('#devhaus-tracking-code') as HTMLScriptElement;
  //check if scriptTag has "enable-ga4" attribute
  if (scriptTag.hasAttribute('ga4')) {
    //if so, create a gtag script tag
    try {
      const ga4MeasurementId = scriptTag.getAttribute('ga4');
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
      document.head.appendChild(gtagScript);
      //create a gtag function
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', ga4MeasurementId);
      //console.log('GA4 is enabled!');
    } catch (error) {
      // console.log('GA4 is not enabled!');
    }
  }
}
