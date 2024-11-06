import triggerFullstoryIdentify from './triggerFullstoryIdentify';

export default function triggerSegmentIdentify(data = {}, isDev = false) {
  triggerFullstoryIdentify(data); //dont worry, if fullstory is not enabled, this will not be called
  if (window.analytics) {
    window.analytics.identify(data);
  }
  if (isDev) console.log(`Segment - Identify`, data);
}
