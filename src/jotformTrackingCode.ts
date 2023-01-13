import removePIIsFromData from 'utils/removePIIsFromData';
import triggerSegmentEvent from 'utils/triggerSegmentEvent';
import triggerSegmentIdentify from 'utils/triggerSegmentIdentify';

export default function jotformTrackingCode() {
  const subParentArray = document.querySelectorAll('iframe');
  try {
    subParentArray.forEach((subParent) => {
      const form = subParent?.contentWindow?.document?.querySelector?.('.jotform-form');
      //if form is a form, add event listener
      if (form?.tagName !== 'FORM') return;
      form?.addEventListener('submit', () => {
        //e.preventDefault();
        const inputs = [
          ...form.querySelectorAll('input'),
          ...form.querySelectorAll('select'),
          ...form.querySelectorAll('textarea'),
        ];
        const data = {} as Record<string, string | string[]>;
        inputs.forEach((input) => {
          const name = input.getAttribute('name') ?? '';
          const { value } = input;

          const putData = () => {
            const nameArray = name.split('_');
            nameArray.shift();
            const nameStringTemp = nameArray.join('_');
            const nameString = nameStringTemp.replace(/\[\]$/, '');

            if (data[nameString]) {
              if (typeof data[nameString] === 'string') {
                data[nameString] = [data[nameString], value] as string[];
              } else {
                (data[nameString] as string[]).push(value);
              }
            } else {
              data[nameString] = value;
            }
          };

          if (name.search(/q\d+_[a-z\_]+\[?\]?/) !== -1) {
            if (
              (input.getAttribute('type') === 'checkbox' ||
                input.getAttribute('type') === 'radio') &&
              (input as HTMLInputElement).checked
            ) {
              putData();
            } else if (
              input.getAttribute('type') !== 'checkbox' &&
              input.getAttribute('type') !== 'radio' &&
              input.getAttribute('type') !== 'file'
            ) {
              putData();
            }
          }
        });
        triggerSegmentIdentify(data);
        triggerSegmentEvent(
          subParent?.title ? `${subParent.title} Form Submitted` : 'Jotform Form Submitted',
          removePIIsFromData(data)
        );
        //return false;
      });
    });
  } catch (e) {}
}
