export default function jotformTrackingCode() {
  //this tracking code happen after window.onload event is triggered
  const subParent = document.querySelector('iframe');
  const form = subParent?.contentWindow?.document.querySelector('.jotform-form');
  form?.addEventListener('submit', (e) => {
    console.log(e);
  });
}
