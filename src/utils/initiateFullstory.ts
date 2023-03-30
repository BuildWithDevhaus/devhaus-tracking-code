import * as FullStory from '@fullstory/browser';

export default function initiateFullstory(key: string) {
  FullStory.init({
    orgId: key,
    debug:
      document.getElementById('devhaus-tracking-code')?.getAttribute?.('fullstory-debug-mode') ===
      'true',
  });
}
