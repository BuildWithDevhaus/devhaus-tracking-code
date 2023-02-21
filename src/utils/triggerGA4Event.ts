import gtag from './gtag';
import isGA4Exist from './isGA4Exist';

export default function triggerGA4Event(eventName: string, properties: any) {
  const eventNameConverted = eventName.replace(/ /g, '_').toLowerCase();
  if (isGA4Exist()) gtag('event', eventNameConverted, properties);
}
