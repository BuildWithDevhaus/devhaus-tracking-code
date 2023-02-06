import isGA4Exist from './isGA4Exist';

export default function gtag(...args: any[]) {
  if (isGA4Exist()) {
    window.dataLayer.push(args);
  }
}
