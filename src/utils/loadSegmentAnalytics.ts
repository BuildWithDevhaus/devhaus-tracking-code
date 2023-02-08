import getCorrectWriteKey from './getCorrectWriteKey';

export default function loadSegmentAnalytics(
  prodWriteKey: string,
  devWriteKey?: string,
  enableConsentManager = false
) {
  if (enableConsentManager) {
    window.consentManagerConfig = function (exports) {
      const { React } = exports;
      const { inEU } = exports;

      const bannerContent = React.createElement(
        'span',
        null,
        'We use cookies (and other similar technologies) to collect data to improve your experience on our site. By using our website, you՚re agreeing to the collection of data as described in our',
        ' ',
        React.createElement(
          'a',
          { href: '/docs/legal/website-data-collection-policy/', target: '_blank' },
          'Website Data Collection Policy'
        ),
        '.'
      );
      const bannerSubContent = 'You can change your preferences at any time.';
      const preferencesDialogTitle = 'Website Data Collection Preferences';
      const preferencesDialogContent =
        'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.';
      const cancelDialogTitle = 'Are you sure you want to cancel?';
      const cancelDialogContent =
        'Your preferences have not been saved. By continuing to use our website, you՚re agreeing to our Website Data Collection Policy.';

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@segment/consent-manager@5.7.0/standalone/consent-manager.js';
      script.defer = true;
      document.body.appendChild(script);

      return {
        container: '#consent-manager',
        writeKey: getCorrectWriteKey(prodWriteKey, undefined, devWriteKey),
        shouldRequireConsent: inEU,
        bannerContent: bannerContent,
        bannerSubContent: bannerSubContent,
        preferencesDialogTitle: preferencesDialogTitle,
        preferencesDialogContent: preferencesDialogContent,
        cancelDialogTitle: cancelDialogTitle,
        cancelDialogContent: cancelDialogContent,
      };
    };
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
        'addIntegrationMiddleware',
        'setAnonymousId',
        'addDestinationMiddleware',
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
      if (!enableConsentManager)
        analytics.load(getCorrectWriteKey(prodWriteKey, undefined, devWriteKey));
      analytics.page();
    }
}
