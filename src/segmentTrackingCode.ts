import bodyTagEvents from './events/bodyTagEvents';
import nonBodyTagEvents from './events/nonBodyTagEvents';

// Segment
export default function segmentTrackingCode() {
  const allSegmentElements = document.querySelectorAll('[data-segment-event]');
  const pageviewElements = document.querySelectorAll('[data-pageview-property-name]');

  allSegmentElements.forEach((el) => {
    const element = el as HTMLElement;
    if (element.tagName === 'BODY') {
      bodyTagEvents(element, pageviewElements);
    } else {
      nonBodyTagEvents(element, pageviewElements);
    }
  });
}
