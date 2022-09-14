import getUTM from './getUTM';

export default function triggerSegmentEvent(eventName = '', data = {}, isDev = false) {
  const dataSend = {
    ...data,
    metadata: {
      utm_source: getUTM('utm_source'),
      utm_medium: getUTM('utm_medium'),
      utm_campaign: getUTM('utm_campaign'),
    },
  };
  if (window?.analytics) {
    if (isDev) console.log(`Segment - ${eventName}`, dataSend);
    window?.analytics?.track(eventName, dataSend);
  } else {
    console.log(`FAILED SEND TO SEGMENT: ${eventName}`);
  }
}
