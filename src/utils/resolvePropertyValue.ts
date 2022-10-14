export const resolvePropertyValue = (
  currentElement: HTMLElement,
  propertyName = '',
  propertyValue: string | null = null,
  pageviewArray: HTMLElement[]
): string | number | boolean | null | undefined => {
  if (propertyName === 'path') {
    return window.location.pathname;
  }
  if (propertyName === 'url') {
    return window.location.href.split('?')['0'];
  }
  if (/.+:.+/g.test(propertyName)) {
    const intendedName = propertyName.substring(0, propertyName.search(':'));
    const intendedValue = propertyName.substring(propertyName.search(':') + 1, propertyName.length);
    return resolvePropertyValue(currentElement, intendedName, intendedValue, pageviewArray);
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
        return resolvePropertyValue(
          grabbedPageviewElem,
          propertyName,
          pageviewElemValue,
          pageviewArray
        );
      case 'grabAHref':
        let grabbedAHrefElem = currentElement?.getAttribute('href');
        //remove params from the url
        if (grabbedAHrefElem?.includes('?')) {
          grabbedAHrefElem = grabbedAHrefElem?.split('?')[0];
        }
        return grabbedAHrefElem ?? currentElement?.innerHTML ?? '';
      default:
        return propertyValue;
    }
  }
};
