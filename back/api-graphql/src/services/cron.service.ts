import { CronJob } from 'cron';
import axios from 'axios';
import { prisma } from './prisma.service';
import RedisManager from './Redis.Manager';

import { TWITCH_CHANNEL_SCOPE } from '../data/constants';
import { TwitchApiClient } from './twitch/api';
import {ApiClient} from '@twurple/api'
import { Streamer } from '@prisma/client';
// import { TwitchApiClient } from './twitch/api';

export const streamsUrl = "https://api.twitch.tv/helix/streams";
const defaultUrlApi = `${streamsUrl}?first=100`;
export const bearerToken = "qg8jaut1vihqjhog79t70huw512g44";
export const clientId = "tl2p4sd4xrv9b8euj5yuisdle560d6";
    
class StreamerService {
	public streamers: Array<any> = [];
  cb: any;
  api: ApiClient | undefined

  constructor(api: ApiClient | undefined, cb: any) {
    this.cb = cb;
    this.api = api;
  }

  getStreamers = async (after?: string) => {
    try {
      const cursor = after ? { after } : {}
      const streams: any = await this.api?.streams.getStreams({ language: 'fr', limit: 100, ...cursor });      
      this.cb(streams, async (tk: string) => await this.getStreamers(tk))
      // console.log(streams);
    } catch (error) {
      this.cb(error)
    }
  }

  getUserByName = async (name: string) => {
    try {
      const user: any = await this.api?.users.getUserByName(name);
      // console.log(streams);
    } catch (error) {
      // this.cb(error)
    }
  }
}

class Cron {
  private job: CronJob;
  // private data: HelixStream[];

  constructor() {
    this.job = new CronJob('*/5 * * * *', async () => {
      try {
        const user = await prisma.user.findFirst();
        const tk = {
          accessToken: user?.access_token,
          refreshToken: user?.refresh_token,
          scope: TWITCH_CHANNEL_SCOPE,
          expiresIn: 3600,
          obtainmentTimestamp: new Date().getMilliseconds()
        }
        const { client } = new TwitchApiClient(tk);
        await new StreamerService(client, async ({ cursor, data }: any, cb: any) => {
          if(Array.isArray(data)) {
            const items = await Promise.all(
              data.map(async ({
                communityIds, gameId, gameName, type, language, title, startDate, thumbnailUrl, viewers, userId, userName,
              }: any) => {
                const streamer: Streamer = await prisma.streamer.create({
                  data: {
                    user_id: userId,
                    user_login: userName,
                    game_id: gameId,
                    game_name: gameName,
                    community_ids: communityIds,
                    type,
                    title,
                    viewer_count: viewers,
                    started_at: startDate,
                    language,
                    thumbnail_url: thumbnailUrl,
                  }
                })
                return `${userName}===${streamer.id}`
              })
            );
            // RedisManager.Publish('SUBSCRIBERS.TWITCH_CHANNEL_CONNECT', items.join("///"));
            RedisManager.Publish('USER.SET', items.join("///"));
            if (cursor && typeof cb === 'function') {
              console.log({ cursor });
              setTimeout(() => cb(cursor), 3000);
            }
          }
        }).getStreamers()
        // await axios.get(process.env.CRON_URI as string);
      } catch (e) {
        console.error('API Unavailable ===============+++>', e);
      }
    });

    this.job.start();
  }
}

export default Cron;
