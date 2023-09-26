import isDevEnvironment from './isDevEnvironment';

export default function getCorrectWriteKey(
  writeKey?: string,
  prodWriteKey?: string,
  devWriteKey?: string,
  stagingDomain?: string,
  productionDomain?: string
) {
  //prioritise prodWriteKey
  if (isDevEnvironment(stagingDomain) && devWriteKey) {
    return devWriteKey;
  }
  const isCorrectProductionDomain = window.location.hostname === productionDomain
  if (prodWriteKey && (productionDomain ? isCorrectProductionDomain : true)) {
    return prodWriteKey;
  }
  return writeKey;
}
