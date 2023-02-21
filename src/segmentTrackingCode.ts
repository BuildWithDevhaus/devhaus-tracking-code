import triggerIdentifyGeo from 'utils/triggerIdentifyGeo';

import bodyTagEvents from './events/bodyTagEvents';
import nonBodyTagEvents from './events/nonBodyTagEvents';

// Segment
export default function segmentTrackingCode() {
  const allSegmentElements = document.querySelectorAll('[data-segment-event]');
  const allEvents = document.querySelectorAll('[data-event]');
  const pageviewElements = document.querySelectorAll('[data-pageview-property-name]');

  triggerIdentifyGeo();
  [...allEvents, ...allSegmentElements].forEach((el) => {
    const element = el as HTMLElement;
    //event name is either data-event or data-segment-event
    const eventName = element.dataset['event'] ?? element.dataset['segmentEvent'];
    if (element.tagName === 'BODY' && eventName) {
      bodyTagEvents(eventName, element, pageviewElements);
    }

    if (eventName && element.tagName !== 'BODY') {
      nonBodyTagEvents(eventName, element, pageviewElements);
    }
    //remove any data-event, data-segment-event, data-pageview-property-name, data-property-name{x}, data-property-value{x} attributes
    element.removeAttribute('data-event');
    element.removeAttribute('data-segment-event');
    element.removeAttribute('data-pageview-property-name');
    [...element.attributes].forEach((attr) => {
      if (attr.name.includes('data-property-name')) {
        element.removeAttribute(attr.name);
      }
      if (attr.name.includes('data-property-value')) {
        element.removeAttribute(attr.name);
      }
    });
  });
}
