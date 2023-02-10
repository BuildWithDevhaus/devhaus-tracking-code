import jotformTrackingCode from 'jotformTrackingCode';
import segmentTrackingCode from 'segmentTrackingCode';
import loadSegmentAnalytics from 'utils/loadSegmentAnalytics';

const scriptTag = document.getElementById('devhaus-tracking-code');
//check if script tag has segment-production-write-key,segment-dev-write-key, and enable-consent-manager attributes
const segmentProductionWriteKey = scriptTag?.getAttribute('segment-prod-write-key');
const segmentDevWriteKey = scriptTag?.getAttribute('segment-dev-write-key') ?? undefined;
const enableConsentManager = scriptTag?.getAttribute('enable-consent-manager') ?? 'eu';
if (
  enableConsentManager !== 'false' &&
  enableConsentManager !== 'true' &&
  enableConsentManager !== 'eu'
) {
  console.error(
    'enable-consent-manager attribute must be either "true", "false", or "eu". Please update your Webflow project.'
  );
}
if (segmentProductionWriteKey)
  loadSegmentAnalytics(
    segmentProductionWriteKey,
    enableConsentManager as 'true' | 'false' | 'eu',
    segmentDevWriteKey
  );
segmentTrackingCode();
window.addEventListener('load', jotformTrackingCode);
