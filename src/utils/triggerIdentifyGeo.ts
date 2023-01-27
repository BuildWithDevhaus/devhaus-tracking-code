import filterGeoData from './filterGeoData';

export default async function triggerIdentifyGeo() {
  const data = await fetch('https://ipapi.co/json/').then((res) => res.json());
  //console.log(`Segment - Identify`, data);
  //console.log(filterGeoData(data));
  if (window.analytics) {
    // if (isDev) console.log(`Segment - Identify`, data);
    window.analytics.identify(filterGeoData(data));
  } else {
  }
}
