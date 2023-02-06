import getUTM from './getUTM';
import triggerGA4Event from './triggerGA4Event';
import triggerIdentifyGeo from './triggerIdentifyGeo';

export default function triggerSegmentEvent(eventName = '', data = {}) {
  triggerIdentifyGeo();
  const dataSend = {
    ...data,
    metadata: {
      utm_source: getUTM('utm_source'),
      utm_medium: getUTM('utm_medium'),
      utm_campaign: getUTM('utm_campaign'),
    },
  };
  //console.log(`Segment - ${eventName}`, dataSend);
  triggerGA4Event(eventName, data);

  if (window?.analytics) {
    window?.analytics?.track(eventName, dataSend);
  } else {
    //console.log(`Segment - ${eventName}`, dataSend);
  }
}
