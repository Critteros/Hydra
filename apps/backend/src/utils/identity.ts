import { v4 as uuidv4 } from 'uuid';

export class Identity {
  static uuid() {
    return uuidv4();
  }

  static compactUUID() {
    return uuidv4().replace(/-/g, '');
  }
}
