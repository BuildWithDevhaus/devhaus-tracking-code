import getCorrectWriteKey from './getCorrectWriteKey';

export default function loadConsentManager(
  prodWriteKey: string,
  alwaysRequireConsent: 'true' | 'false' | 'eu' = 'eu',
  devWriteKey?: string
) {
  if (alwaysRequireConsent === 'false') {
    //check if there is any script tag that has src includes consent-manager.js
    return;
  }
  window.consentManagerConfig = function (exports) {
    let inEU, React;
    try {
      //somehow the exports returns undefined but somehow if I wrap it in a try block it works???
      // exports.preferences.onPreferencesSaved(function () {
      //   console.log('preferences saved');
      // });
      React = exports.React;
      inEU = exports.inEU;
    } finally {
      //Banner Preferences
      const devhausTrackingCode = document.getElementById('devhaus-tracking-code');
      const bannerColor =
        devhausTrackingCode?.getAttribute('consent-banner-color') ?? 'rgba(0,0,0,0)';
      const bannerTextColor =
        devhausTrackingCode?.getAttribute('consent-banner-text-color') ?? '#ffffff';

      const bannerContentText =
        devhausTrackingCode?.getAttribute('consent-banner-content') ??
        'We use cookies to improve your experience.';
      const bannerContent = React.createElement(
        'span',
        { className: 'consent-banner-content' },
        bannerContentText
      );
      const bannerSubContentText =
        devhausTrackingCode?.getAttribute('consent-banner-sub-content') ??
        'You can change your preferences at any time.';
      const bannerSubContent = React.createElement(
        'span',
        { className: 'consent-banner-sub-content' },
        bannerSubContentText
      );

      return {
        container: '#consent-manager',
        writeKey: getCorrectWriteKey(prodWriteKey, prodWriteKey, devWriteKey),
        bannerContent: bannerContent,
        bannerSubContent: bannerSubContent,
        preferencesDialogTitle: 'Website Data Collection Preferences',
        bannerTextColor: bannerTextColor,
        bannerBackgroundColor: bannerColor,
        preferencesDialogContent:
          'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.',
        cancelDialogTitle: 'Are you sure you want to cancel?',
        cancelDialogContent:
          "Your preferences have not been saved. By continuing to use our website, you're agreeing to our Website Data Collection Policy",
        closeBehavior: 'accept',
        initialPreferences: {
          marketingAndAnalytics: true,
          advertising: true,
          functional: true,
        },
        shouldRequireConsent: () =>
          alwaysRequireConsent === 'true' || (alwaysRequireConsent === 'eu' && inEU()),
      };
    }
  };

  //load consent manager script
  const consentManagerScript = document.createElement('script');
  consentManagerScript.defer = true;
  consentManagerScript.src =
    'https://unpkg.com/@segment/consent-manager@5.7.0/standalone/consent-manager.js';
  document.body.appendChild(consentManagerScript);
  const devhausTrackingCode = document.getElementById('devhaus-tracking-code');
  const includeBuiltInBanner =
    devhausTrackingCode?.getAttribute('include-built-in-banner') ?? 'false';
  if (includeBuiltInBanner === 'true') {
    //put banner in the body
    const banner = document.createElement('div');
    banner.id = 'consent-manager';
    document.body.appendChild(banner);
  }

  const buttonConsentManager = document.getElementById('open-consent-manager');
  if (!buttonConsentManager) {
    console.warn("#open-consent-manager Button doesn't exist. Please update your Webflow project.");
  }

  const openConsentManager = function () {
    window.consentManager.openConsentManager();
  };
  buttonConsentManager?.addEventListener('click', openConsentManager);
}
