import filterGeoData from './filterGeoData';

export default async function triggerIdentifyGeo() {
  const data = await fetch('https://ipapi.co/json/').then((res) => res.json());
  if (window.analytics) {
    window.analytics.identify(filterGeoData(data));
  }
}
