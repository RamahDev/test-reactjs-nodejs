import { AuthProvider, RefreshingAuthProvider, ClientCredentialsAuthProvider } from '@twurple/auth';
import { ChatUserstate, Client as TmiClient } from '@twurple/auth-tmi';
import { ChatClient } from '@twurple/chat';
import { EVENTREDIS, KEY } from '../data/constants/system.constants';
import { OnMessageFunction } from '../data/interfaces/twitch.interfaces';
import { prisma } from './prisma.service';

import {RedisManager} from './Redis.Manager';

class Twitch {
  private userAction?: any;

  private authProvider?: AuthProvider;

  private clientSayer?: ChatClient;

  private clientAction?: TmiClient;

  private listenersMessage: OnMessageFunction[] = [];

  private channel?: string;

  constructor(private redis: RedisManager) {
    this.redis.publishClient.subscribe(EVENTREDIS.REFRESH_TWITCH)

    this.redis.subcribeClient.on('message', (channel: string) => {
      if (channel === EVENTREDIS.REFRESH_TWITCH) {
        this.load();
      }
    });
    this.load();
  }

  private async load(): Promise<void> {
    if (this.clientAction) {
      await this.clientAction.disconnect();
      this.clientAction = undefined;
    }
    if (this.clientSayer) {
      await this.clientSayer.quit();
      this.clientSayer = undefined;
    }
    if (this.authProvider) this.authProvider = undefined;

    const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;
    console.log({ TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET });
    

    // const { value } =
    //   ((await prisma.setting.findFirst({
    //     where: {
    //       key: KEY.BOT,
    //     },
    //   })) as unknown as GenericSetting<Bot>) || {};

    // if (!value || !value?.channelName) return;

    // this.channel = value.channelName;

    // const userAction = value.actionId
    //   ? await prisma.user.findFirst({
    //       where: {
    //         id: value.actionId,
    //       },
    //     })
    //   : null;

    // const userSayer = value.sayerId
    //   ? await prisma.user.findFirst({
    //       where: {
    //         id: value.sayerId,
    //       },
    //     })
    //   : null;
    // const userAction = {
    //   access_token: userAction.access_token,
    //   refresh_token: userAction.refresh_token,
    //   expiresIn: userAction.expireIn,
    // };

    this.channel = 'thoussein'
    const userAction = {
      access_token: 'uq4xg6gbz0om4tltd02tnhxlkfz7jk',
      refresh_token: 'cvweaj2087xzdhcp62x1811y1mxqxdtdh1swvx6xbrx9kqfp1f',
    }
    // if (userAction) {
    //   this.clientAction = new TmiClient({
    //     connection: {
    //       reconnect: true,
    //       secure: true,
    //     },
    //     authProvider: new RefreshingAuthProvider(
    //       {
    //         clientId: TWITCH_CLIENT_ID as string,
    //         clientSecret: TWITCH_CLIENT_SECRET as string,
    //       },
    //       {
    //         accessToken: userAction.access_token as string,
    //         refreshToken: userAction.refresh_token,
    //         expiresIn: 0,
    //         obtainmentTimestamp: new Date().getMilliseconds(),
    //       },
    //     ),
    //     channels: [this.channel],
    //   });

    //   this.clientAction.on(
    //     'message',
    //     (
    //       _channel: string,
    //       userState: ChatUserstate,
    //       message: string,
    //       self: boolean,
    //     ) => {
    //       if (self) return;
    //       this.listenersMessage.forEach((fn) => fn(userState, message));
    //     },
    //   );
    //   await this.clientAction.connect();
    // }
    const userSayer = {}
 
    // if (userSayer) {
    //   this.clientSayer = new ChatClient({
    //     authProvider: new RefreshingAuthProvider(
    //      {
    //         clientId: TWITCH_CLIENT_ID as string,
    //         clientSecret: TWITCH_CLIENT_SECRET as string,
    //         onRefresh(token: any) {
    //           this.userAction = token.
    //         },
    //       },
    //       {
    //         accessToken: this.userAction?.access_token as string,
    //         refreshToken: this.userAction?.refresh_token,
    //         expiresIn: 3600,
	  //         scope: ["chat:read", "chat:edit"],
	  //         // token_type: "bearer",
    //         obtainmentTimestamp: new Date().getMilliseconds(),
    //       },
    //     ),
    //     channels: [this.channel],
    //   });

    //   this.clientSayer.connect();
    // }
  }

  public async timeOutOrBan(
    userName: string,
    timeout: number,
    reason: string,
  ): Promise<void> {
    try {
      if (!timeout)
        await this.clientAction?.ban(this.channel as string, userName, reason);
      else
        await this.clientAction?.timeout(
          this.channel as string,
          userName,
          timeout,
          reason,
        );
    } catch (e) {
      console.log("Can't timeout");
    }
  }

  public async say(message: string, originalMessageId?: string): Promise<void> {
    try {
      this.clientSayer?.say(this.channel as string, message, {
        replyTo: originalMessageId,
      });
    } catch (e) {
      console.log('Can\t talk');
    }
  }

  public onMessage(fn: OnMessageFunction): void {
    this.listenersMessage.push(fn);
  }

  public removeOnMessage(fn: OnMessageFunction): void {
    this.listenersMessage = this.listenersMessage.filter((v) => v !== fn);
  }
}

export default Twitch;
