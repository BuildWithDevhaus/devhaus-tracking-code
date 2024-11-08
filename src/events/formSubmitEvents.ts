//import { identify } from '@fullstory/browser';
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
      let value: string | number = formElement?.value;
      const isIdentify = formElement?.dataset?.['identify'] === 'true';
      const dataParseInt = formElement?.dataset?.['parseInt'] === 'true';
      const dataParseFloat = formElement?.dataset?.['parseFloat'] === 'true';
      if (dataParseInt) value = parseInt(value);
      if (dataParseFloat) value = parseFloat(value as string);
      const isBothIdentifyAndTrack = formElement?.dataset?.['bothIdentifyAndTrack'] === 'true';
      const isTrack = formElement?.dataset?.['track'] === 'true';
      const isIgnored = formElement?.dataset?.['ignore'] === 'true';
      if (name && value && !isIgnored) {
        if (isIdentify || isBothIdentifyAndTrack) {
          if (Array.isArray(identifyProperties[name]))
            //if the property already exists as an array, push the new value
            (identifyProperties[name] as any[]).push(value);
          else if (identifyProperties[name] !== undefined)
            //if the property already exists, turn it into an array of items
            identifyProperties[name] = [identifyProperties[name], value];
          else identifyProperties[name] = value;
        }
        if (isTrack || isBothIdentifyAndTrack) {
          if (Array.isArray(properties[name]))
            //if the property already exists as an array, push the new value
            (properties[name] as any[]).push(value);
          else if (properties[name] !== undefined)
            //if the property already exists, turn it into an array of items
            properties[name] = [properties[name], value];
          else properties[name] = value;
        }
      }
    }
  });
}
