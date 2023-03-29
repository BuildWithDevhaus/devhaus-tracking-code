import fullstoryConsentChecker from './consent_checker/fullstoryConsentChecker';
import ga4ConsentChecker from './consent_checker/ga4ConsentChecker';

export default function toggleConsent(tools: string[], enableTracking: boolean) {
  tools.forEach((tool) => {
    switch (tool) {
      case 'fullstory':
        fullstoryConsentChecker(enableTracking);
        break;
      default:
        ga4ConsentChecker(enableTracking);
    }
  });
}
