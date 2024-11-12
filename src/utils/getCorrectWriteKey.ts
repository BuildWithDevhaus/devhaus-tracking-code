import isDevEnvironment from './isDevEnvironment';

export default function getCorrectWriteKey(
  prodWriteKey?: string,
  devWriteKey?: string,
  stagingDomain?: string,
  isDev = false
) {
  if (isDevEnvironment(stagingDomain) && devWriteKey && isDev) {
    return devWriteKey;
  }
  return prodWriteKey;
}
