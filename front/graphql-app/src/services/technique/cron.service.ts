import { CronJob } from 'cron';
import { get } from './api';

export class Cron {
  private job: CronJob;
  private data: any[] | undefined;
  public time: string;
  public streamer_user_name: string;

  constructor(time: string, streamer_user_name: string) {
    this.time = time;
    this.streamer_user_name = streamer_user_name;
    this.job = new CronJob(`*/${this.time} * * * * *`, async () => {
      const res = await this.onGetViewer();
      if (res) {
        if(this.data) {
          this.data = [...this.data, res]
        } else {
          this.data = res;
        }
      }
    });
  }

  onGetViewer = async () => {
    try {
      const { data, success } = await get(`public/chatters/${this.streamer_user_name.toLowerCase()}`, undefined);
      if (success && Array.isArray(data?.chatters?.viewers)) {
        const chatters = data?.chatters.viewers.map((viewer: any) => [viewer]);
        return chatters;
      }
      return false;
    } catch (error) {
      console.log('===============>', error);
      return false;
    }
  }

  start() {
    this.job.start();
  }

  stop() {
    console.log(this.data, '==============================+>', this.data);
    this.job.stop();
  }
}

export default Cron;
