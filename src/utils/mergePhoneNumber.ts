export default function mergePhoneNumber(data: Record<string, string | string[]>) {
  //phoneNumber in data will have phone_number[country], phone_number[area], phone_number[phone]
  // merge all three into one field (phone_number) and remove the other three fields
  const country = data['phone_number[country]'] ?? '';
  const area = data['phone_number[area]'] ?? '';
  const phone = data['phone_number[phone]'] ?? '';
  if ((country && area && phone) || (area && phone)) {
    data['phone_number'] = `${country}${area}${phone}`;
    delete data['phone_number[country]'];
    delete data['phone_number[area]'];
    delete data['phone_number[phone]'];
  }
  return data;
}
