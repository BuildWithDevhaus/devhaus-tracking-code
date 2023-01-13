import removePIIsFromData from 'utils/removePIIsFromData';
import triggerSegmentEvent from 'utils/triggerSegmentEvent';
import triggerSegmentIdentify from 'utils/triggerSegmentIdentify';

export default function jotformTrackingCode() {
  const subParent = document.querySelector('iframe');
  try {
    const form = subParent?.contentWindow?.document?.querySelector?.('.jotform-form');
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
          //remove the last [] from the name if it exists
          const nameString = nameStringTemp.replace(/\[\]$/, '');

          if (data[nameString]) {
            //currently, name is still in q[number]_[name] format
            //we need to convert it to [name] format

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
            (input.getAttribute('type') === 'checkbox' || input.getAttribute('type') === 'radio') &&
            (input as HTMLInputElement).checked
          ) {
            putData();
          } else if (
            input.getAttribute('type') !== 'checkbox' &&
            input.getAttribute('type') !== 'radio'
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
      // return false;
    });
  } catch (e) {}
}
