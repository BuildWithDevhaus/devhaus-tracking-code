import type { GenericObject } from 'types/genericObject';

export default function formSubmitEvent(
  element: Element,
  properties: GenericObject,
  identifyProperties: GenericObject
) {
  const form = element.closest('form');
  const formElements = (form?.elements as HTMLFormControlsCollection) ?? [];
  [...formElements].forEach((fe) => {
    const formElement = fe as HTMLInputElement;
    if (formElement !== element) {
      const id = formElement?.id.toLowerCase();
      //const value = formElement?.type === 'checkbox' ? formElement?.checked : formElement?.value;
      //value should be handling all types of form inputs
      const value = formElement?.value;
      const isPII = formElement?.dataset?.['identify'] === 'true';
      const isBothPIIAndTrack = formElement?.dataset?.['bothIdentifyAndTrack'] === 'true';
      const isIgnored = formElement?.dataset?.['ignore'] === 'true';
      if (id && value && !isIgnored) {
        if (isPII || isBothPIIAndTrack) {
          identifyProperties[id] = value;
          if (isBothPIIAndTrack) {
            properties[id] = value;
          }
        } else {
          properties[id] = value;
        }
      }
    }
  });
}
