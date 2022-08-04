import {ApiClient} from '@twurple/api'
import { RefreshingAuthProvider, ClientCredentialsAuthProvider } from '@twurple/auth';

const { TWITCH_CLIENT_ID, TWITCH_CLIENT_TOKEN, TWITCH_CLIENT_SECRET } = process.env;

export class TwitchApiClient {
  public client: ApiClient | undefined
  constructor(user?: any) {
    this.client = new ApiClient({
      authProvider: new ClientCredentialsAuthProvider(TWITCH_CLIENT_ID as string, TWITCH_CLIENT_SECRET as string)
    });
  }

  /**
   * testMethode
   */
  public async init(tokenData: any) {
    try {
      const res = await this.client?.streams.getStreams();
      console.log(res?.data?.length);
    } catch (error) {
      console.log({error});
    }
  }
}
