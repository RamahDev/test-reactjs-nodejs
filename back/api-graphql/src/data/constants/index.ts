import path from 'path';

export const STRATEGY_NAME_TWITCH = 'twitch';
export const TWITCH_BASIC_SCOPE = ['user:read:email'];

export const STRATEGY_NAME_DEFAULT = 'jwt';

export const STRATEGY_NAME_TWITCH_CHANNEL = 'TWITCH_CHANNEL';
export const TWITCH_CHANNEL_SCOPE = [
  'user:read:email',
  'channel:read:subscriptions',
  'channel_subscriptions',
  'bits:read',
  'chat:read',
  'chat:edit',
];

export const { TWITCH_CLIENT_ID } = process.env;
export const { TWITCH_CLIENT_SECRET } = process.env;
export const { COOKIE_EXP_MAX } = process.env;
export const { COOKIE_EXP } = process.env;
export const { API_KEY_JWT } = process.env;
export const { PUBLIC_PORT } = process.env;
export const { PUBLIC_URI } = process.env;
export const { DB_HOST } = process.env;
export const { DB_NAME } = process.env;
export const { DB_USER } = process.env;
export const { DB_PASS } = process.env;
export const { COOKIE_PREFIX } = process.env;
export const { COOKIE_KEY } = process.env;
export const { REDIS_HOST } = process.env;
export const { REDIS_PORT } = process.env;
export const { YOUTUBE_API_KEY } = process.env;

export const MODULE_TOKEN = 'MODULE_TOKEN';
export const CHANNEL = 'CHANNEL';
export const CHANNEL_ACCESS_TOKEN = 'CHANNEL_ACCESS_TOKEN';
export const CHANNEL_REFRESH_TOKEN = 'CHANNEL_REFRESH_TOKEN';
export const CHANNEL_TOKEN_STATUS = 'CHANNEL_TOKEN_STATUS';
export const CHANNEL_SUB_COUNT = 'CHANNEL_SUB_COUNT';
export const CHANNEL_LAST_SUB = 'CHANNEL_LAST_SUB';
export const CHANNEL_TOP_BITS = 'CHANNEL_TOP_BITS';
export const CHANNEL_LAST_BITS = 'CHANNEL_LAST_BITS';
export const YOUTUBE_CHANNELS = 'YOUTUBE_CHANNELS';
export const YOUTUBE_CHANNELS_LAST_VIDEO = 'YOUTUBE_CHANNELS_LAST_VIDEO';
export const TWITCH_PUBSUB_STATUS = 'TWITCH_PUBSUB_STATUS';

export enum SUBSCRIBERS {
  TWITCH_CHANNEL_CONNECT = 'TWITCH_CHANNEL_CONNECT',
  TWITCH_CHANNEL_DISCONNECT = 'TWITCH_CHANNEL_DISCONNECT',
  TWITCH_CHANNEL_REFRESH = 'TWITCH_CHANNEL_REFRESH',
  TWITCH_UPDATE = 'TWITCH_UPDATE',
  YOUTUBE_CHANNELS_CHANGE = 'YOUTUBE_CHANNEL_CHANGE',
  YOUTUBE_CHANNELS_UPDATE = 'YOUTUBE_UPDATE',
}

export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const PERMISSION = {
  DASHBOARD_VIEW: 'DASHBOARD_VIEW',
  USER_VIEW: 'USER_VIEW',
  USER_EDIT: 'USER_EDIT',
  GIVEAWAY_VIEW: 'GIVEAWAY_VIEW',
  GIVEAWAY_EDIT: 'GIVEAWAY_EDIT',
  PLANNING_VIEW: 'PLANNING_VIEW',
  PLANNING_EDIT: 'PLANNING_EDIT',
  UPLOAD_VIEW: 'UPLOAD_VIEW',
  UPLOAD_EDIT: 'UPLOAD_EDIT',
  ROLE_VIEW: 'ROLE_VIEW',
  ROLE_EDIT: 'ROLE_EDIT',
};

export const UPLOAD_DIR: string = 'uploads';
export const UPLOAD_PATH: string = path.join(__dirname, './static/uploads/');
export const REGEX_MINETYPE_IMG: RegExp = /\/(jpg|jpeg|png|gif|svg)$/;
export const REGEX_FILE_EXT: RegExp = /(.*).(jpg|jpeg|png|gif|svg)$/;
