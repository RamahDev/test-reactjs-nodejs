import { PubSubClient, PubSubRedemptionMessage } from '@twurple/pubsub';
import {
  AccessToken, RefreshingAuthProvider,
} from '@twurple/auth';
import { ApiClient } from '@twurple/api';

import Logger from '../../utils/helpers/logger';

const TWITCH_API_ID = process.env.TWITCH_API_ID || '';
const TWITCH_API_KEY = process.env.TWITCH_API_KEY || '';
const SCOPE_NEEDED = 'channel:manage:redemptions';

const log = Logger('GOTAGA-PUBSUB');

class PubSubClientTwitch {
  private apiClient: ApiClient;

  private authProvider: RefreshingAuthProvider;

  private channelId: number;

  private authToken: string ;

  private refreshToken: string;

  private client: PubSubClient | null;

  private rewardName: string;

  private rewardAmount: string;

  public constructor(
    channelId: number,
    authToken: string,
    refreshToken: string,
    rewardName: string,
    rewardAmount: string,
  ) {
    this.channelId = channelId;
    this.authToken = authToken;
    this.refreshToken = refreshToken;
    this.client = null;
    this.rewardName = rewardName;
    this.rewardAmount = rewardAmount;

    this.authProvider = new RefreshingAuthProvider(
      {
        clientSecret: TWITCH_API_KEY,
        clientId: TWITCH_API_ID,
        onRefresh: (token: AccessToken) => {
          // User.update({
          //   accessToken: token.accessToken,
          //   refreshToken: token.refreshToken,
          // }, { where: { realId: this.channelId } });
          this.authToken = token.accessToken;
        },
      },
      {
        accessToken: this.authToken,
        refreshToken: this.refreshToken,
        expiresIn: null,
        obtainmentTimestamp: 0,
      },
    );

    this.apiClient = new ApiClient({
      authProvider: this.authProvider,
    });
    this.init();
  }

  private async init(): Promise<void> {
    log.info('INIT');
    const tokenInfo = await this.apiClient.getTokenInfo();
    if (tokenInfo.scopes.find((value: string) => value === SCOPE_NEEDED)) {
      if (await this.createRewardIfNoExist()) {
        if (!this.client) {
          this.client = new PubSubClient();
          this.listen();
        }
      }
    }
  }

  public async refreshApiClient(accessToken: string, refreshToken: string): Promise<void> {
    log.info('REFRESH API CLIENT');

    this.authProvider = new RefreshingAuthProvider(
      {
        clientSecret: TWITCH_API_KEY,
        clientId: TWITCH_API_ID,
        onRefresh: (token: AccessToken) => {
          // User.update({
          //   accessToken: token.accessToken,
          //   refreshToken: token.refreshToken,
          // }, { where: { realId: this.channelId } });
          this.authToken = token.accessToken;
        },
      },
      {
        accessToken,
        refreshToken,
        expiresIn: null,
        obtainmentTimestamp: 0,
      },
    );

    const tokenInfo = await this.apiClient.getTokenInfo();
    if (tokenInfo.scopes.find((value: string) => value === SCOPE_NEEDED)) {
      this.init();
    }
  }

  public async createRewardIfNoExist(): Promise<boolean> {
    log.info('CREATE REWARD IF NO EXIST');

    try {
      // const reward = await this.apiClient?.helix.channelPoints.createCustomReward(
      //     this.channelId, {
      //       title: this.rewardName,
      //       cost: parseInt(this.rewardAmount, 10),
      //     });
      // if (reward) {
      //   if (rewardId) {
      //     rewardId.update({
      //       value: reward.id,
      //     });
      //   } else {
      //     await System.create({
      //       name: 'TWITCH_COINS_REWARD_ID',
      //       value: reward.id,
      //     });
      //   }
      // }
      return true;
    } catch (e) {
      log.error('REWARD WITH SAME NAME ALREADY EXIST');
      return false;
    }
  }

  public async listen(): Promise<void> {
    log.info('LISTEN EVENT');
    if (this.client && this.apiClient) {
      await this.client.registerUserListener(this.authProvider, this.channelId);
      this.client.onRedemption(this.channelId, this.onRedemption.bind(this));
    }
  }

  public async onRedemption(message: PubSubRedemptionMessage): Promise<void> {
    log.info('RECEIVE REDEMPTION');

    // const rewardId = await System.findOne({ where: { name: 'TWITCH_COINS_REWARD_ID' } });
    // const rewardAmount = await System.findOne({ where: { name: 'TWITCH_COINS_REWARD_AMOUNT' } });
    // if (!rewardId || !rewardAmount) return;

    // if (message.rewardId === rewardId.value) {
    //   const user = await User.findOne({ where: { realId: message.userId } });
    //   if (user) {
    //     log.info(`VALID REDEEM FOR: ${user.displayName}`);
    //     user.update({ credits: user.credits + parseInt(rewardAmount.value, 10) });
    //     this.ApiRequestChannelPointStatus(message, 'FULFILLED');
    //   } else {
    //     log.error(`REFUSED REDEEM FOR: ${message.userDisplayName}`);
    //     this.ApiRequestChannelPointStatus(message, 'CANCELED');
    //   }
    // }
  }

  public async ApiRequestChannelPointStatus(message: PubSubRedemptionMessage, status: 'FULFILLED' | 'CANCELED')
    : Promise<void> {
    if (this.apiClient) {
      this.apiClient.helix.channelPoints.updateRedemptionStatusByIds(
        message.channelId,
        message.rewardId,
        [message.id],
        status,
      );
    }
  }
}

export default PubSubClientTwitch;
