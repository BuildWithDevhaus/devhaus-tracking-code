import gtag from './gtag';
import isGA4Exist from './isGA4Exist';

export default function triggerGA4Event(eventName: string, properties: any) {
  if (isGA4Exist()) {
    gtag('event', eventName, properties);
  }
}
