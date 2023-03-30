import * as FullStory from '@fullstory/browser';

export default function fullstoryConsentChecker(enableTracking: boolean) {
  FullStory.consent(enableTracking);
}
