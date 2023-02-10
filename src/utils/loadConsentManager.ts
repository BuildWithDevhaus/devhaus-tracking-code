import inEU from '@segment/in-eu';
import cookie from 'cookie';

import getCorrectWriteKey from './getCorrectWriteKey';

export default function loadConsentManager(
  prodWriteKey: string,
  alwaysRequireConsent: 'true' | 'false' | 'eu' = 'eu',
  devWriteKey?: string
) {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@segment/consent-manager@5.7.0/standalone/consent-manager.js';
  script.defer = true;
  document.body.appendChild(script);
  window.consentManagerConfig = function (exports) {
    try {
      //somehow the exports returns undefined but somehow if I wrap it in a try block it works???
      exports.preferences.onPreferencesSaved(function () {
        console.log('preferences saved');
        const consentManagerBanner = document.getElementById('consent-manager-banner');
        if (consentManagerBanner) {
          consentManagerBanner.classList.add('hidden');
        }
      });
    } finally {
      return {
        container: '#consent-manager',
        writeKey: getCorrectWriteKey(prodWriteKey, undefined, devWriteKey),
        bannerContent: 'We use cookies to improve your browsing experience.',
        bannerSubContent: 'You can change your preferences at any time.',
        preferencesDialogTitle: 'Website Data Collection Preferences',
        preferencesDialogContent:
          'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.',
        cancelDialogTitle: 'Are you sure you want to cancel?',
        cancelDialogContent:
          "Your preferences have not been saved. By continuing to use our website, you're agreeing to our Website Data Collection Policy",
        closeBehavior: 'accept',
        shouldRequireConsent: () =>
          alwaysRequireConsent === 'true' || (alwaysRequireConsent === 'eu' && inEU),
      };
    }
  };

  // window.consentManager.preferences.onPreferencesSaved(function () {
  //   // could be used to store consent server side, or send it into an API
  //   const consentManagerBanner = document.getElementById('consent-manager-banner');
  //   consentManagerBanner?.classList.add('hidden');
  //   console.log('preferences saved');
  // });

  const consentManagerBanner = document.getElementById('consent-manager-banner');
  const buttonConsentManager = document.getElementById('open-consent-manager');
  if (!consentManagerBanner || !buttonConsentManager) {
    console.error(
      "#consent-manager-banner or #open-consent-manager doesn't exist. Please update your Webflow project."
    );
  }

  const cookies = cookie.parse(document.cookie);
  const consentCookie = cookies['tracking-preferences'];
  if (
    window.consentManagerConfig().shouldRequireConsent() &&
    !consentCookie &&
    consentManagerBanner?.classList.contains('hidden')
  ) {
    consentManagerBanner?.classList.remove('hidden');
  }
  const openConsentManager = function () {
    window.consentManager.openConsentManager();
  };
  buttonConsentManager?.addEventListener('click', openConsentManager);
}
