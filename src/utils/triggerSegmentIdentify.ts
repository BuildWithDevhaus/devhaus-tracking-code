import triggerFullstoryIdentify from './triggerFullstoryIdentify';

export default function triggerSegmentIdentify(data = {}) {
  //triggerIdentifyGeo();
  //console.log(`Segment - Identify`, data);

  triggerFullstoryIdentify(data);
  if (window.analytics) {
    // if (isDev) console.log(`Segment - Identify`, data);
    window.analytics.identify(data);
  } else {
    //console.log(`Segment - Identify`, data);
  }
}
