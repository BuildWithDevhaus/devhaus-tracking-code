import type { GeoData, GeoDataConverted } from 'types/geoData';

export default function filterGeoData(geoData: GeoData) {
  const geoDataConverted: GeoDataConverted = {
    ...geoData,
    network_provider: geoData.org,
  };
  delete geoDataConverted.org;
  return geoDataConverted;
}
