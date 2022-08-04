import { ChatUserstate } from '@twurple/auth-tmi';

export type OnMessageFunction = (
  userState: ChatUserstate,
  message: string,
) => Promise<void> | void;
