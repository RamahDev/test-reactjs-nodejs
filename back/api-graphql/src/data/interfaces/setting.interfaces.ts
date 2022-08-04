import { KEY, ROLE } from '../constants/system.constants';

export interface GenericSetting<T> {
  id: string;
  key: KEY;
  value: T;
}

export interface BasicSetting {
  enable: boolean;
  customMessage: string;
  applyTo: ROLE[];
  timeout: number[];
}

export interface BlackList extends BasicSetting {
  words: string[];
}

export interface Bot {
  sayerId: string | null;
  actionId: string | null;
  channelName: string | null;
}

export interface ChannelInfo {
  uptime: string | null;
  subs: number | null;
  channelName: string | null;
}
