export class ChannelNotFoundException extends Error {
  constructor() {
    super('Channel not found');
  }
}

export class UserChannelNotFoundException extends Error {
  constructor() {
    super('User token not found');
  }
}

export class SyncBeforeException extends Error {
  constructor() {
    super('You need to sync before use');
  }
}
