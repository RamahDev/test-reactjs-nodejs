import passport from 'passport';
import { Request } from 'express';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as TwitchStrategy } from 'passport-twitch-strategy';
import {
  PUBLIC_URI, COOKIE_PREFIX, API_KEY_JWT, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET,
  TWITCH_BASIC_SCOPE, TWITCH_CHANNEL_SCOPE, STRATEGY_NAME_TWITCH_CHANNEL,
} from './data/constants';
import { PayloadJwt, TwitchProfile } from './data/interfaces/Twitch';
import { User } from '@prisma/client';
import { prisma } from './services/prisma.service';

export const cookieBearerExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[`${COOKIE_PREFIX}-token`];
  }
  return token;
};

export const LoadPassport = () => {
  passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
    done(null, user);
  });

  passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
    done(null, user);
  });

  passport.use(new JwtStrategy(
    {
      jwtFromRequest: cookieBearerExtractor,
      secretOrKey: API_KEY_JWT,
    }, async (payload: PayloadJwt, done: any) => {
      // console.log({ payload });
      
      let user: User | null = null;
      if (payload && payload.realId) user = await prisma.user.findFirst({ where: { email: payload.email }});
      console.log({user});
      
      if (user) {
        return done(undefined, {
          access_token: user?.access_token,
          refresh_token: user?.refresh_token,
          profile: {
            id: user.id,
            realId: payload.realId,
            username: user.name,
            displayName: user.name,
            email: user.email,
            // profileImage: user?.profileImage || '',
          },
        });
      }
      return done(undefined, false);
    },
  ));

  passport.use(new TwitchStrategy({
    clientID: TWITCH_CLIENT_ID || '',
    clientSecret: TWITCH_CLIENT_SECRET || '',
    callbackURL: `${PUBLIC_URI}/api/auth/twitch/callback`,
    // @ts-ignore
    scope: TWITCH_BASIC_SCOPE,
  },
  (async (access_token: string, refresh_token: string, profile: TwitchProfile, done: any)
  : Promise<void> => {
    console.log({access_token, refresh_token, profile});
    let user: User | null = await prisma.user.findFirst({ where: { email: profile.email }});
    
    if (user) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          access_token,
          refresh_token,
        }
      });
    } else {
      return done(null, false);
    }

    return done(null, {
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      profile: {
        id: user.id,
        username: user.name,
        displayName: user.name,
        email: user.email,
      },
    });
  })));

  passport.use(STRATEGY_NAME_TWITCH_CHANNEL,
    new TwitchStrategy({
      clientID: TWITCH_CLIENT_ID || '',
      clientSecret: TWITCH_CLIENT_SECRET || '',
      callbackURL: `${PUBLIC_URI}/api/system/channel/connect/callback`,
      // @ts-ignore
      scope: TWITCH_CHANNEL_SCOPE,
    },
    (async (access_token: string, refresh_token: string, profile: TwitchProfile, done: any)
    : Promise<void> => {
      return done(null, {
        access_token,
        refresh_token,
      });
    })));
};
