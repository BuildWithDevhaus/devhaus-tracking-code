import triggerSegmentEvent from './triggerSegmentEvent';
import triggerSegmentIdentify from './triggerSegmentIdentify';

// Segment
export default function segmentTrackingCode() {
  type GenericObject = { [key: string]: unknown };
  const allSegmentElements = document.querySelectorAll('[data-segment-event]');
  const pageviewElements = document.querySelectorAll('[data-pageview-property-name]');

  const pageviewArray = Array.from(pageviewElements);
  allSegmentElements.forEach((el) => {
    const element = el as HTMLElement;
    const resolvePropertyName = (propertyName = '') => {
      return /.+:.+/g.test(propertyName)
        ? propertyName.substring(0, propertyName.search(':'))
        : propertyName;
    };
    const resolvePropertyValue = (
      currentElement: HTMLElement,
      propertyName = '',
      propertyValue: string | null = null
    ): string | number | boolean | null | undefined => {
      if (propertyName === 'path') {
        return window.location.pathname;
      }
      if (propertyName === 'url') {
        return window.location.href.split('?')['0'];
      }
      if (/.+:.+/g.test(propertyName)) {
        const intendedName = propertyName.substring(0, propertyName.search(':'));
        const intendedValue = propertyName.substring(
          propertyName.search(':') + 1,
          propertyName.length
        );
        return resolvePropertyValue(currentElement, intendedName, intendedValue);
      }
      //if propertyname has 'array:' inside, convert things inside into an array
      //example: array[{propertyName1: propertyValue1, propertyName2: propertyValue2}, {propertyName1: propertyValue1, propertyName2: propertyValue2}]
      if (propertyName) {
        switch (propertyValue) {
          case 'innerHTML':
            return currentElement?.innerHTML;
          case 'innerHTML-parseInt':
            return parseInt(currentElement.innerHTML);
          case 'url':
            return window.location.href.split('?')[0];
          case 'boolean:true':
            return true;
          case 'boolean:false':
            return false;
          case 'grabPageview':
            const grabbedPageviewElem = pageviewArray.find(
              (elem) => (elem as HTMLElement)?.dataset?.['pageviewPropertyName'] === propertyName
            ) as HTMLElement;
            const pageviewElemValue =
              grabbedPageviewElem?.dataset?.['pageviewPropertyValue'] ?? 'innerHTML';
            return resolvePropertyValue(grabbedPageviewElem, propertyName, pageviewElemValue);
          default:
            return propertyValue;
        }
      }
    };
    if (element.tagName === 'BODY') {
      //for "PAGEVIEW" or "xxxx Viewed" events
      //search scope is the whole Body
      const eventName = element.dataset['segmentEvent'];
      const properties: GenericObject = {};
      for (let i = 1; i <= 100; i++) {
        const propertyName = element.dataset?.['propertyName' + i];
        const propertyValue = element.dataset?.['propertyValue' + i];
        if (propertyName) {
          properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
            element,
            propertyName,
            propertyValue
          );
        } else break;
      }
      pageviewElements.forEach((pel) => {
        const pageviewElement = pel as HTMLElement;
        const propertyName = pageviewElement.dataset?.['pageviewPropertyName'];
        const propertyValue = pageviewElement.dataset?.['pageviewPropertyValue'] ?? 'innerHTML';
        const resolvedPropertyName = resolvePropertyName(propertyName);

        if (properties[resolvePropertyName(propertyName)]) {
          //if property is an array, push to it
          const arr = properties[resolvedPropertyName];
          if (typeof arr === 'string') {
            properties[resolvedPropertyName] = [
              arr as string,
              resolvePropertyValue(pageviewElement, propertyName, propertyValue),
            ];
          } else if (Array.isArray(arr)) {
            properties[resolvedPropertyName] = [
              ...(arr as string[]),
              resolvePropertyValue(pageviewElement, propertyName, propertyValue),
            ];
          }
        } else {
          if (pageviewElement.getAttribute('data-multi-reference') === 'true') {
            properties[resolvedPropertyName] = [
              resolvePropertyValue(pageviewElement, propertyName, propertyValue),
            ];
          } else {
            properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
              pageviewElement,
              propertyName,
              propertyValue
            );
          }
        }
      });
      triggerSegmentEvent(eventName, properties);
    } else {
      const eventName = element.dataset['segmentEvent'];
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
              propertyValue
            );
          } else break;
        }
        const clickEvent = () => {
          if (
            (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'submit') ||
            element.dataset?.['submitButton'] === 'true'
          ) {
            const form = element.closest('form');
            const formElements = (form?.elements as HTMLFormControlsCollection) ?? [];
            [...formElements].forEach((fe) => {
              const formElement = fe as HTMLInputElement;
              if (formElement !== element) {
                const name = formElement?.id.toLowerCase();
                const value = formElement?.value;
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
          //check if the element is a CMS element
          if (element.dataset?.['cms'] === 'true') {
            const searchElement = element.closest('[data-wrapper]') as HTMLElement;
            const allElements = searchElement.querySelectorAll('[data-property-name]');

            for (let i = 0; i < allElements.length; i++) {
              const elem = allElements[i] as HTMLElement;

              const name = elem.dataset?.['propertyName'];
              const value = elem.dataset?.['propertyValue'] ?? 'innerHTML';
              properties[resolvePropertyName(name)] = resolvePropertyValue(elem, name, value);
            }
          }
          triggerSegmentEvent(eventName, properties);
          if (Object.keys(identifyProperties).length > 0) {
            triggerSegmentIdentify(identifyProperties);
          }
        };
        element.addEventListener('click', clickEvent);
        element.addEventListener('auxclick', clickEvent);
      }
    }
  });
}
