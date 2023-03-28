import * as FullStory from '@fullstory/browser';

export default function initiateFullstory(key: string) {
  FullStory.init({
    orgId: key,
  });
}
