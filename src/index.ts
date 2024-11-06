//import jotformTrackingCode from 'jotformTrackingCode';
import segmentTrackingCode from 'segmentTrackingCode';
import loadGenericConsentManager from 'utils/generic_consent_manager/loadGenericConsentManager';
import initiateFullstory from 'utils/initiateFullstory';
import initiateGA4 from 'utils/initiateGA4';
import loadSegmentAnalytics from 'utils/loadSegmentAnalytics';

const scriptTag = document.getElementById('devhaus-tracking-code');
//check if script tag has segment-production-write-key,segment-dev-write-key, and enable-consent-manager attributes
const segmentProductionWriteKey = scriptTag?.getAttribute('segment-prod-write-key');
const segmentDevWriteKey = scriptTag?.getAttribute('segment-dev-write-key') ?? undefined;
const stagingDomain = scriptTag?.getAttribute('staging-domain') ?? undefined;
const productionDomain = scriptTag?.getAttribute('production-domain') ?? undefined;
const enableConsentManager = scriptTag?.getAttribute('enable-consent-manager') ?? 'eu';
const ga4 = scriptTag?.getAttribute('ga4') ?? 'false';
const fullstory = scriptTag?.getAttribute('fullstory') ?? 'false';
const isDev = scriptTag?.getAttribute('is-dev') ?? false;

if (segmentProductionWriteKey) {
  loadSegmentAnalytics(
    segmentProductionWriteKey,
    enableConsentManager as 'true' | 'false' | 'eu',
    segmentDevWriteKey,
    stagingDomain,
    productionDomain
  );
}
const enabledStandaloneTools: string[] = [];
if (!segmentProductionWriteKey) {
  if (ga4 !== 'false') {
    initiateGA4();
    enabledStandaloneTools.push('ga4');
  }
  if (fullstory !== 'false') {
    initiateFullstory(fullstory);
    enabledStandaloneTools.push('fullstory');
  }
  if (enableConsentManager !== 'false') {
    loadGenericConsentManager(enabledStandaloneTools);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  segmentTrackingCode(isDev === 'true' ? true : false);
});
//window.addEventListener('load', jotformTrackingCode); //sunsetting jotform tracking
