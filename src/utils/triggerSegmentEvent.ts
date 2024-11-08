import getUTM from './getUTM';
import triggerFullstoryEvent from './triggerFullstoryEvent';
import triggerGA4Event from './triggerGA4Event';

//import triggerIdentifyGeo from './triggerIdentifyGeo';

export default function triggerSegmentEvent(eventName = '', data = {}, isDev = false) {
  //triggerIdentifyGeo();
  const dataSend = {
    ...data,
    metadata: {
      utm_source: getUTM('utm_source'),
      utm_medium: getUTM('utm_medium'),
      utm_campaign: getUTM('utm_campaign'),
    },
  };

  if (isDev) {
    console.log(`Segment - Event`, eventName, dataSend);
  }
  triggerGA4Event(eventName, data);
  triggerFullstoryEvent(eventName, dataSend);
  if (window?.analytics) {
    //console.log(window.analytics);
    window?.analytics?.track(eventName, dataSend);
  }
}
