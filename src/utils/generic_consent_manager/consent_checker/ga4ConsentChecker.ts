export default function ga4ConsentChecker(enableTracking: boolean) {
  window.gtag('consent', 'update', {
    ad_storage: enableTracking ? 'granted' : 'denied',
    analytics_storage: enableTracking ? 'granted' : 'denied',
  });
}
