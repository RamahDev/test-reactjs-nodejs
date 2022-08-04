// import Redis, { RedisClient } from 'redis';
import { IsJsonString } from '../utils/helpers/GlobalFunctions';

import Redis from "ioredis"

export class RedisManager {
  public subcribeClient: Redis;

  public publishClient: Redis;

  private subscribeCb: { [x: string]: (message: any) => void | Promise<void> };

  constructor() {
    // if (!process.env.REDIS_HOST || !process.env.REDIS_PORT)
    //   throw new Error('Need env REDIS_HOST & REDIS_PORT');
    const params = {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    };
    // const params = {
    //   host: process.env.REDIS_HOST || '127.0.0.1',
    //   port: Number(process.env.REDIS_PORT) || 6379,
    // };
    this.subcribeClient = new Redis(params);
    this.publishClient = this.subcribeClient.duplicate();

    this.subcribeClient.on('message', this.OnMessage.bind(this));

    this.subscribeCb = {};
  }

  public Subscribe(
    channel: string,
    cb: (message: any) => void | Promise<void>,
  ) {
    this.subscribeCb[channel] = cb;
    this.subcribeClient.subscribe(channel);
  }

  public Publish(channel: string, payload?: any) {
    this.publishClient.publish(channel, payload || '');
  }

  public OnMessage(channel: string, message: string) {
    let parsedMessage = null;
    if (IsJsonString(message)) parsedMessage = JSON.parse(message);
    else parsedMessage = message;

    if (this.subscribeCb[channel]) {
      this.subscribeCb[channel](parsedMessage);
    }
  }
}

export default new RedisManager();
