import checkForExistingCookies from './checkForExistingCookies';

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
  consentManagerDiv.style.display = 'none';
  //check for existing cookies depending on tools
  checkForExistingCookies(tools);
  acceptButton.addEventListener('click', () => {
    consentManagerDiv.style.display = 'none';
  });
}
