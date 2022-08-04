import PubSubClientTwitch from './pub.sub.client.twitch';

class ChannelPoints {
  private channelId: number | null = null;

  private channelToken: string | null = null;

  private channelRefreshToken: string | null = null;

  private pubSubClient: PubSubClientTwitch | null = null;

  public async init(): Promise<void> {
    // const rewardName = await System.findOne({ where: { name: 'TWITCH_COINS_REWARD_NAME' } });
    // if (!rewardName) {
    //   await System.create({
    //     name: 'TWITCH_COINS_REWARD_NAME',
    //     value: '10000 Crédits',
    //   });
    // }
    // const rewardAmount = await System.findOne({ where: { name: 'TWITCH_COINS_REWARD_AMOUNT' } });
    // if (!rewardAmount) {
    //   await System.create({
    //     name: 'TWITCH_COINS_REWARD_AMOUNT',
    //     value: '10000',
    //   });
    // }
    // const channel = await System.findOne({ where: { name: 'TWITCH_CHANNEL' } });
    // if (channel) {
    //   const user = await User.findOne({ where: { username: channel?.value } });
    //   if (user) {
    //     this.channelId = user.realId;
    //     this.channelToken = user.accessToken;
    //     this.channelRefreshToken = user.refreshToken;
    //     this.pubSubClient = new PubSubClientTwitch(
    //       this.channelId,
    //       this.channelToken,
    //       this.channelRefreshToken,
    //       rewardName?.value || '',
    //       rewardAmount?.value || '',
    //     );
    //   } else {
    //     this.reset();
    //   }
    // } else {
    //   this.reset();
    // }
  }

  public refreshApiClient(data: any): void {
    if (this.pubSubClient) {
      this.pubSubClient.refreshApiClient(data.accessToken, data.refreshToken);
    }
  }

  public reset(): void {
    setTimeout(this.init.bind(this), 1000);
  }
}

export default new ChannelPoints();
