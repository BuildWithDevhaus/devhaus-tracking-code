import * as FullStory from '@fullstory/browser';

export default function triggerFullstoryEvent(eventName = '', data = {}) {
  if (!document.getElementById('devhaus-tracking-code')?.getAttribute('fullstory')) return;
  FullStory.event(eventName, data);
}
