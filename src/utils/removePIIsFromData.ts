export default function removePIIsFromData(data: Record<string, string | string[]>) {
  const dataCopy = { ...data };
  const piiFields = [
    'email',
    'name',
    'first_name',
    'last_name',
    'phone_number',
    'phone_number[country]',
    'phone_number[area]',
    'phone_number[phone]',
  ];
  piiFields.forEach((piiField) => {
    if (dataCopy[piiField]) {
      delete dataCopy[piiField];
    }
  });
  return dataCopy;
}
