import isDevEnvironment from './isDevEnvironment';

export default function getCorrectWriteKey(
  writeKey?: string,
  prodWriteKey?: string,
  devWriteKey?: string
) {
  //prioritise prodWriteKey
  if (isDevEnvironment() && devWriteKey) {
    return devWriteKey;
  }
  if (prodWriteKey) {
    return prodWriteKey;
  }
  return writeKey;
}
