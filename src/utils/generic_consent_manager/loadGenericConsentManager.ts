import displayGenericConsentManagerBanner from './displayGenericConsentManagerBanner';
import toggleConsent from './toggleConsent';

export default function loadGenericConsentManager(tools: string[]) {
  //4 components needed,
  //1. div with id 'consent-manager'
  //2. a button with id 'consent-manager-accept' inside the div with id 'consent-manager'
  //3. a button with id 'consent-manager-decline' inside the div with id 'consent-manager'
  //4. a button with id 'open-consent-manager'
  const consentManagerDiv = document.getElementById('consent-manager');
  if (!consentManagerDiv) {
    console.error(
      `enable-consent-manager is ${document
        .getElementById('devhaus-tracking-code')
        ?.getAttribute(
          'enable-consent-manager'
        )}, but no div with id 'consent-manager' found. Please update your Webflow project.`
    );
    return;
  }
  const acceptButton = consentManagerDiv.querySelector('#consent-manager-accept');
  if (!acceptButton) {
    console.error(
      `enable-consent-manager is ${document
        .getElementById('devhaus-tracking-code')
        ?.getAttribute(
          'enable-consent-manager'
        )}, but no button with id 'consent-manager-accept' found inside div with id 'consent-manager'. Please update your Webflow project.`
    );
    return;
  }
  const declineButton = consentManagerDiv.querySelector('#consent-manager-decline');
  if (!declineButton) {
    console.error(
      `enable-consent-manager is ${document
        .getElementById('devhaus-tracking-code')
        ?.getAttribute(
          'enable-consent-manager'
        )}, but no button with id 'consent-manager-decline' found inside div with id 'consent-manager'. Please update your Webflow project.`
    );
    return;
  }
  const openConsentManagerButton = document.getElementById('open-consent-manager');
  if (!openConsentManagerButton) {
    console.warn(
      `enable-consent-manager is ${document
        .getElementById('devhaus-tracking-code')
        ?.getAttribute(
          'enable-consent-manager'
        )}, but no button with id 'open-consent-manager' found. Please update your Webflow project.`
    );
  }
  //check devhaus-tracking-code-allow-consent in local storage
  const allowConsent = localStorage.getItem('devhaus-tracking-code-allow-consent');
  if (allowConsent === 'true') {
    toggleConsent(tools, true);
  } else {
    toggleConsent(tools, false);
    //if devhaus-tracking-code-allow-consent is not in local storage, show consent manager
    if (!allowConsent) displayGenericConsentManagerBanner(true);
  }

  acceptButton.addEventListener('click', () => {
    displayGenericConsentManagerBanner(false);
    toggleConsent(tools, true);
    localStorage.setItem('devhaus-tracking-code-allow-consent', 'true');
  });

  declineButton.addEventListener('click', () => {
    displayGenericConsentManagerBanner(false);
    toggleConsent(tools, false);
    localStorage.setItem('devhaus-tracking-code-allow-consent', 'false');
  });

  openConsentManagerButton?.addEventListener('click', () => {
    displayGenericConsentManagerBanner(true);
  });
}
