import { Badges } from '@twurple/auth-tmi';
import { ROLE } from '../../data/constants/system.constants';

export const GetRoles = (badges: Badges): ROLE => {
  if (badges.broadcaster) return ROLE.BROADCASTER;
  if (badges.moderator) return ROLE.MODERATOR;
  if (badges.subscriber) return ROLE.SUBSCRIBER;
  if (badges.vip) return ROLE.VIP;
  return ROLE.USER;
};

export const ParseCustomMessage = (
  message: string,
  data: { [x: string]: string | number | null | undefined },
): string => {
  let parsed = message;

  Object.keys(data).forEach((key: string) => {
    parsed = parsed.replace(`{${key}}`, data[key]?.toString() || '');
  });

  return parsed;
};
