import gtag from './gtag';
import isGA4Exist from './isGA4Exist';

export default function triggerGA4Event(eventName: string, properties: any) {
  if (isGA4Exist()) {
    //convert event name from "Event Name" to "event_name"
    const eventNameConverted = eventName.replace(/ /g, '_').toLowerCase();
    console.log(`GA4--${eventNameConverted}`, properties);
    gtag('event', eventNameConverted, properties);
  }
}
