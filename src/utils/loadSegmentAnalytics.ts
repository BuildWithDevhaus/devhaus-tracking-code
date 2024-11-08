import getCorrectWriteKey from './getCorrectWriteKey';
import loadSegmentConsentManager from './loadSegmentConsentManager';

export default function loadSegmentAnalytics(
  prodWriteKey: string,
  enableConsentManager: 'true' | 'false' | 'eu' | null = 'true',
  devWriteKey?: string,
  stagingDomain?: string,
  productionDomain?: string
) {
  if (enableConsentManager !== null) {
    loadSegmentConsentManager(
      prodWriteKey,
      enableConsentManager,
      devWriteKey,
      stagingDomain,
      productionDomain
    );
  }
  const analytics = (window.analytics = window.analytics ?? []);
  if (!analytics.initialize)
    if (analytics.invoked) throw new Error('Segment snippet included twice.');
    else {
      analytics.invoked = !0;
      analytics.methods = [
        'trackSubmit',
        'trackClick',
        'trackLink',
        'trackForm',
        'pageview',
        'identify',
        'reset',
        'group',
        'track',
        'ready',
        'alias',
        'debug',
        'page',
        'once',
        'off',
        'on',
        'addSourceMiddleware',
        // 'addIntegrationMiddleware',
        // 'setAnonymousId',
        // 'addDestinationMiddleware',
      ];
      analytics.factory = function (e) {
        return function () {
          const t = Array.prototype.slice.call(arguments);
          t.unshift(e);
          analytics.push(t);
          return analytics;
        };
      };
      for (let e = 0; e < analytics.methods.length; e++) {
        const key = analytics.methods[e];
        analytics[key] = analytics.factory(key);
      }
      analytics.load = function (key, e) {
        const t = document.createElement('script');
        t.type = 'text/javascript';
        t.async = !0;
        t.src = 'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js';
        const n = document.getElementsByTagName('script')[0];
        n.parentNode?.insertBefore(t, n);
        analytics._loadOptions = e;
      };

      analytics._writeKey = getCorrectWriteKey(prodWriteKey, undefined, devWriteKey);
      analytics.SNIPPET_VERSION = '4.15.3';
      if (enableConsentManager === 'false')
        analytics.load(getCorrectWriteKey(prodWriteKey, undefined, devWriteKey));
      analytics.page();
    }
}
