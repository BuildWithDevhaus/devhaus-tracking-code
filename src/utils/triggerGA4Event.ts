import gtag from './gtag';

export default function triggerGA4Event(eventName: string, properties: any) {
  const eventNameConverted = eventName.replace(/ /g, '_').toLowerCase();
  gtag('event', eventNameConverted, properties);
}
