import triggerSegmentEvent from './triggerSegmentEvent';
import triggerSegmentIdentify from './triggerSegmentIdentify';

// Segment
export default function segmentTrackingCode(isDev = false) {
  type GenericObject = { [key: string]: any };
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
    ): string | Number | Boolean | null | undefined => {
      if (propertyName === 'path') {
        return window.location.pathname;
      } else if (/.+:.+/g.test(propertyName)) {
        const intendedName = propertyName.substring(0, propertyName.search(':'));
        const intendedValue = propertyName.substring(
          propertyName.search(':') + 1,
          propertyName.length
        );
        return resolvePropertyValue(currentElement, intendedName, intendedValue);
      } else if (propertyName) {
        switch (propertyValue) {
          case 'innerHTML':
            return currentElement?.innerHTML;
          case 'innerHTML-parseInt':
            return parseInt(currentElement.innerHTML);
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

      let properties: GenericObject = {};
      for (let i = 1; i <= 100; i++) {
        const propertyName = element.dataset?.['propertyName' + i];
        const propertyValue = element.dataset?.['propertyValue' + i];
        if (propertyName)
          properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
            element,
            propertyName,
            propertyValue
          );
        else break;
      }
      pageviewElements.forEach((pel) => {
        const pageviewElement = pel as HTMLElement;
        const propertyName = pageviewElement.dataset?.['pageviewPropertyName'];
        const propertyValue = pageviewElement.dataset?.['pageviewPropertyValue'] ?? 'innerHTML';
        properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
          pageviewElement,
          propertyName,
          propertyValue
        );
      });
      triggerSegmentEvent(eventName, properties, isDev);
    } else {
      const eventName = element.dataset['segmentEvent'];
      let properties: GenericObject = {};
      let identifyProperties: GenericObject = {};
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
        element.addEventListener('click', () => {
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
          triggerSegmentEvent(eventName, properties, isDev);
          if (Object.keys(identifyProperties).length > 0) {
            triggerSegmentIdentify(identifyProperties, isDev);
          }
        });
      }
    }
  });
}
