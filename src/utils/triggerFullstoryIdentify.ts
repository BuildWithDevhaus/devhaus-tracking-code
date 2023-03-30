import * as FullStory from '@fullstory/browser';
import type { GenericObject } from 'types/genericObject';

function extractDisplayNameAndEmail(data: GenericObject = {}) {
  const { first_name, last_name, full_name, email } = data;
  if (first_name && last_name) {
    delete data.first_name;
    delete data.last_name;
    return {
      displayName: `${first_name} ${last_name}`,
      email: email as string,
      ...data,
    };
  }
  if (full_name) {
    delete data.full_name;
    return {
      displayName: full_name as string,
      email: email as string,
      ...data,
    };
  }
  return {
    displayName: '',
    email: email as string,
    ...data,
  };
}

export default function triggerFullstoryIdentify(data: GenericObject) {
  if (!document.getElementById('devhaus-tracking-code')?.getAttribute('fullstory')) return;
  FullStory.setUserVars(extractDisplayNameAndEmail(data));
}
