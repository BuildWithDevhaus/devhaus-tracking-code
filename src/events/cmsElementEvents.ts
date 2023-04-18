import type { GenericObject } from 'types/genericObject';
import { resolvePropertyName } from 'utils/resolvePropertyName';
import { resolvePropertyValue } from 'utils/resolvePropertyValue';

export default function cmsElementEvent(
  element: Element,
  properties: GenericObject,
  pageviewElements: NodeListOf<Element>
) {
  const pageviewArray = Array.from(pageviewElements) as HTMLElement[];
  const searchElement = element.closest('[data-wrapper]') as HTMLElement;
  const allElements = searchElement.querySelectorAll('[data-property-name]');

  for (let i = 0; i < allElements.length; i++) {
    const elem = allElements[i] as HTMLElement;

    const name = elem.dataset?.['propertyName'];
    const value = elem.dataset?.['propertyValue'] ?? 'innerText';
    properties[resolvePropertyName(name)] = resolvePropertyValue(elem, name, value, pageviewArray);
  }
}
