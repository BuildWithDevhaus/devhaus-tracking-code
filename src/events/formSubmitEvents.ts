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
      const name = formElement?.id.toLowerCase();
      const value = formElement?.type === 'checkbox' ? formElement?.checked : formElement?.value;
      const isPII = formElement?.dataset?.['identify'] === 'true';
      const isBothPIIAndTrack = formElement?.dataset?.['bothIdentifyAndTrack'] === 'true';
      const isIgnored = formElement?.dataset?.['ignore'] === 'true';
      if (name && value && !isIgnored) {
        if (isPII || isBothPIIAndTrack) {
          identifyProperties[name] = value;
          if (isBothPIIAndTrack) {
            properties[name] = value;
          }
        } else {
          properties[name] = value;
        }
      }
    }
  });
}
