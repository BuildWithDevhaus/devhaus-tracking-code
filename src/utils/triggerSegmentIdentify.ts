export default function triggerSegmentIdentify(data = {}, isDev = false) {
  if (window.analytics) {
    if (isDev) console.log(`Segment - Identify`, data);
    window.analytics.identify(data);
  }
}
