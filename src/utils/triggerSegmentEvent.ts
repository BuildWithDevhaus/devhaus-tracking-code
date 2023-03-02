import getUTM from './getUTM';
import triggerGA4Event from './triggerGA4Event';

//import triggerIdentifyGeo from './triggerIdentifyGeo';

export default function triggerSegmentEvent(eventName = '', data = {}) {
  //triggerIdentifyGeo();
  const dataSend = {
    ...data,
    metadata: {
      utm_source: getUTM('utm_source'),
      utm_medium: getUTM('utm_medium'),
      utm_campaign: getUTM('utm_campaign'),
    },
  };

  triggerGA4Event(eventName, data);

  //console.log('triggerSegmentEvent', eventName, dataSend);
  if (window?.analytics) {
    //console.log(window.analytics);
    window?.analytics?.track(eventName, dataSend);
  }
}
