import initiateGA4 from 'utils/initiateGA4';

import bodyTagEvents from './events/bodyTagEvents';
import nonBodyTagEvents from './events/nonBodyTagEvents';

// Segment
export default function segmentTrackingCode() {
  const allSegmentElements = document.querySelectorAll('[data-segment-event]');
  const pageviewElements = document.querySelectorAll('[data-pageview-property-name]');

  initiateGA4();
  allSegmentElements.forEach((el) => {
    const element = el as HTMLElement;
    if (element.tagName === 'BODY') {
      bodyTagEvents(element, pageviewElements);
    } else {
      nonBodyTagEvents(element, pageviewElements);
    }
  });
}
