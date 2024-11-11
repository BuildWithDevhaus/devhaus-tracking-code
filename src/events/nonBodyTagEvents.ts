import type { GenericObject } from 'types/genericObject';

import { resolvePropertyName } from '../utils/resolvePropertyName';
import { resolvePropertyValue } from '../utils/resolvePropertyValue';
import triggerSegmentEvent from '../utils/triggerSegmentEvent';
import triggerSegmentIdentify from '../utils/triggerSegmentIdentify';
import cmsElementEvent from './cmsElementEvents';
import formSubmitEvent from './formSubmitEvents';

export default function nonBodyTagEvents(
  eventName: string,
  element: HTMLElement,
  pageviewElements: NodeListOf<Element>,
  isDev = false
) {
  const pageviewArray = Array.from(pageviewElements) as HTMLElement[];
  const properties: GenericObject = {};
  const identifyProperties: GenericObject = {};
  if (eventName) {
    for (let i = 1; i <= 100; i++) {
      const propertyName = element.dataset?.['propertyName' + i];
      const propertyValue = element.dataset?.['propertyValue' + i];
      if (propertyName) {
        properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
          element,
          propertyName,
          propertyValue,
          pageviewArray
        );
      } else break;
    }
    const clickEvent = () => {
      if (
        // (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'submit') ||
        // element.dataset?.['submitButton'] === 'true' ||
        element.tagName === 'FORM'
      ) {
        formSubmitEvent(element, properties, identifyProperties);
      }
      //check if the element is a CMS element
      if (element.dataset?.['cms'] === 'true') {
        cmsElementEvent(element, properties, pageviewElements);
      }
      if (Object.keys(identifyProperties).length > 0) {
        triggerSegmentIdentify(identifyProperties, isDev);
      }

      triggerSegmentEvent(eventName, properties, isDev);
    };
    if (element.tagName === 'FORM')
      element.addEventListener('submit', () => {
        //e.preventDefault();
        clickEvent();
      });
    else element.addEventListener('click', clickEvent);
    //element.addEventListener('auxclick', clickEvent); //disabled auxclick events
  }
}
