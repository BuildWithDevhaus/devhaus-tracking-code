import triggerFullstoryIdentify from './triggerFullstoryIdentify';

export default function triggerSegmentIdentify(data = {}, isDev = false) {
  //triggerIdentifyGeo();
  //console.log(`Segment - Identify`, data);

  triggerFullstoryIdentify(data);
  if (window.analytics) {
    window.analytics.identify(data);
  }
  if (isDev) console.log(`Segment - Identify`, data);
}
