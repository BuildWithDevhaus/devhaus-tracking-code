import jotformTrackingCode from 'jotformTrackingCode';
import segmentTrackingCode from 'segmentTrackingCode';
import loadGenericConsentManager from 'utils/generic_consent_manager/loadGenericConsentManager';
import initiateFullstory from 'utils/initiateFullstory';
import initiateGA4 from 'utils/initiateGA4';
import loadSegmentAnalytics from 'utils/loadSegmentAnalytics';

const scriptTag = document.getElementById('devhaus-tracking-code');
//check if script tag has segment-production-write-key,segment-dev-write-key, and enable-consent-manager attributes
const segmentProductionWriteKey = scriptTag?.getAttribute('segment-prod-write-key');
const segmentDevWriteKey = scriptTag?.getAttribute('segment-dev-write-key') ?? undefined;
const enableConsentManager = scriptTag?.getAttribute('enable-consent-manager') ?? 'eu';
const ga4 = scriptTag?.getAttribute('ga4') ?? 'false';
const fullstory = scriptTag?.getAttribute('fullstory') ?? 'false';

if (segmentProductionWriteKey) {
  loadSegmentAnalytics(
    segmentProductionWriteKey,
    enableConsentManager as 'true' | 'false' | 'eu',
    segmentDevWriteKey
  );
}
const enabledStandaloneTools: string[] = [];
if (
  !segmentProductionWriteKey &&
  (enableConsentManager === 'true' || enableConsentManager === 'eu')
) {
  if (ga4 !== 'false') enabledStandaloneTools.push('ga4');
  if (fullstory !== 'false') enabledStandaloneTools.push('fullstory');
  loadGenericConsentManager(enabledStandaloneTools);
}
if (enableConsentManager === 'false' && !segmentProductionWriteKey) {
  if (ga4 !== 'false') initiateGA4();
  if (fullstory !== 'false') initiateFullstory(fullstory);
}

segmentTrackingCode();
window.addEventListener('load', jotformTrackingCode);
