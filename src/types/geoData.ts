export interface GeoData {
  ip?: string;
  network?: string;
  version?: string;
  city?: string;
  country?: string;
  country_name?: string;
  country_code?: string;
  country_code_iso3?: string;
  country_capital?: string;
  country_tld?: string;
  continent_code?: string;
  in_eu?: boolean;
  country_calling_code?: string;
  currency?: string;
  currency_name?: string;
  languages?: string;
  country_area?: number;
  country_population?: number;
  asn?: string;
  org?: string;
}

export interface GeoDataConverted extends GeoData {
  //below are the converted values
  network_provider?: string; //GeoData.org
}
