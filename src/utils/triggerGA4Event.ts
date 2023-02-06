import gtag from './gtag';

export default function triggerGA4Event(eventName: string, properties: any) {
  //convert event name from "Event Name" to "event_name"
  const eventNameConverted = eventName.replace(/ /g, '_').toLowerCase();
  gtag('event', eventNameConverted, properties);
  //gtag('event', 'purchase', properties);
}
