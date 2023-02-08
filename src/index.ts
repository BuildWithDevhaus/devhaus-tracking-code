import jotformTrackingCode from 'jotformTrackingCode';
import segmentTrackingCode from 'segmentTrackingCode';
import loadSegmentAnalytics from 'utils/loadSegmentAnalytics';

const scriptTag = document.getElementById('devhaus-tracking-code');
//check if script tag has segment-production-write-key,segment-dev-write-key, and enable-consent-manager attributes
const segmentProductionWriteKey = scriptTag?.getAttribute('segment-production-write-key');
const segmentDevWriteKey = scriptTag?.getAttribute('segment-dev-write-key') ?? undefined;
const enableConsentManager = scriptTag?.getAttribute('enable-consent-manager') ? true : false;
if (segmentProductionWriteKey)
  loadSegmentAnalytics(segmentProductionWriteKey, segmentDevWriteKey, enableConsentManager);
segmentTrackingCode();
window.addEventListener('load', jotformTrackingCode);
