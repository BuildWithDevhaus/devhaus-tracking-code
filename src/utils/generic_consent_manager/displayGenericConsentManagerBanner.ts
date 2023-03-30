export default function displayGenericConsentManagerBanner(toggle: boolean) {
  const banner = document.getElementById('consent-manager');
  if (banner) {
    banner.style.display = toggle ? 'block' : 'none';
  }
}
