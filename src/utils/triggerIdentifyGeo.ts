export default async function triggerIdentifyGeo() {
  const data = await fetch('https://ipapi.co/json/').then((res) => res.json());
  if (window.analytics) {
    // if (isDev) console.log(`Segment - Identify`, data);
    window.analytics.identify(data);
  } else {
    //console.log(`Segment - Identify`, data);
  }
}
