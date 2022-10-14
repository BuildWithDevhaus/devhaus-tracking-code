export const resolvePropertyName = (propertyName = '') => {
  return /.+:.+/g.test(propertyName)
    ? propertyName.substring(0, propertyName.search(':'))
    : propertyName;
};
