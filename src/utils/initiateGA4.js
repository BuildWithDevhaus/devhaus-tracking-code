import gtag from './gtag';

export default function initiateGA4() {
  const scriptTag = document.querySelector('#devhaus-tracking-code');
  if (scriptTag.hasAttribute('ga4')) {
    try {
      const ga4MeasurementId = scriptTag.getAttribute('ga4');
      const ga4Debug = scriptTag.getAttribute('ga4-debug-mode');
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
      gtagScript.setAttribute('async', 'true');
      document.head.appendChild(gtagScript);
      window.dataLayer = window.dataLayer || [];
      gtag('js', new Date());
      if (!ga4Debug && ga4MeasurementId) {
        gtag('config', ga4MeasurementId);
      }
      if (ga4Debug && ga4MeasurementId) {
        gtag('config', ga4MeasurementId, {
          send_page_view: true,
          debug_mode: true,
        });
      }
    } catch (error) {
      // GA4 fails to load
    }
  }
}
