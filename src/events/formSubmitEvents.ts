import type { GenericObject } from 'types/genericObject';

export default function formSubmitEvent(
  element: Element,
  properties: GenericObject,
  identifyProperties: GenericObject
) {
  const form = (element.tagName === 'FORM' ? element : element?.parentElement) as HTMLFormElement;
  const formElements = (form?.elements as HTMLFormControlsCollection) ?? [];
  [...formElements].forEach((fe) => {
    const formElement = fe as HTMLInputElement;
    if (formElement !== element) {
      const name = formElement?.name.toLowerCase();
      //const value = formElement?.type === 'checkbox' ? formElement?.checked : formElement?.value;
      //value should be handling all types of form inputs
      const value = formElement?.value;
      const isIdentify = formElement?.dataset?.['identify'] === 'true';
      const isBothIdentifyAndTrack = formElement?.dataset?.['bothIdentifyAndTrack'] === 'true';
      const isTrack = formElement?.dataset?.['track'] === 'true';
      const isIgnored = formElement?.dataset?.['ignore'] === 'true';
      if (name && value && !isIgnored) {
        if (isIdentify || isBothIdentifyAndTrack) {
          identifyProperties[name] = value;
        }
        if (isTrack || isBothIdentifyAndTrack) {
          properties[name] = value;
        }
      }
    }
  });
}
