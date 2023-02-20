import type { GenericObject } from 'types/genericObject';

import { resolvePropertyName } from '../utils/resolvePropertyName';
import { resolvePropertyValue } from '../utils/resolvePropertyValue';
import triggerSegmentEvent from '../utils/triggerSegmentEvent';

export default function bodyTagEvents(
  eventName: string,
  element: HTMLElement,
  pageviewElements: NodeListOf<Element>
) {
  const pageviewArray = Array.from(pageviewElements) as HTMLElement[];
  const properties: GenericObject = {};
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
  pageviewElements.forEach((pel) => {
    const pageviewElement = pel as HTMLElement;
    const propertyName = pageviewElement.dataset?.['pageviewPropertyName'];
    const propertyValue = pageviewElement.dataset?.['pageviewPropertyValue'] ?? 'innerHTML';
    const resolvedPropertyName = resolvePropertyName(propertyName);

    if (properties[resolvePropertyName(propertyName)]) {
      const arr = properties[resolvedPropertyName];
      if (typeof arr === 'string') {
        properties[resolvedPropertyName] = [
          arr as string,
          resolvePropertyValue(pageviewElement, propertyName, propertyValue, pageviewArray),
        ];
      } else if (Array.isArray(arr)) {
        properties[resolvedPropertyName] = [
          ...(arr as string[]),
          resolvePropertyValue(pageviewElement, propertyName, propertyValue, pageviewArray),
        ];
      }
    } else {
      if (pageviewElement.getAttribute('data-multi-reference') === 'true') {
        properties[resolvedPropertyName] = [
          resolvePropertyValue(pageviewElement, propertyName, propertyValue, pageviewArray),
        ];
      } else {
        properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
          pageviewElement,
          propertyName,
          propertyValue,
          pageviewArray
        );
      }
    }
  });
  triggerSegmentEvent(eventName, properties);
}
