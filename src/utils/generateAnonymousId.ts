import { v4 as uuidv4 } from 'uuid';

export default function generateAnonymousId(existingId?: string) {
  if (existingId) {
    return existingId;
  }
  const newId = uuidv4();
  return newId;
}
