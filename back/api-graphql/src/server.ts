import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { execute, subscribe } from 'graphql'
import path from 'path'
import passport from 'passport';

import { createContext, redis } from './utils/context'
import { schema } from './schema'
import { LoadPassport } from './passport';
import Router from './infrastructure/routes';
// import Cron from './services/cron.service'
import { TwitchApiClient } from './services/twitch/api'

dotenv.config()

const main = async () => {
  LoadPassport();
  const app = express()

  const RedisStore = connectRedis(session)

  app.use(express.json())

  console.log(process.env.PUBLIC_URI);

  // app.use(
  //   cors({
  //     origin: process.env.PUBLIC_URI,
  //     credentials: true,
  //   })
  // )
  app.use(cors());
  app.use(passport.initialize());
  app.set('trust proxy', 1)

  const sessionMiddleware = session({
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    // @ts-ignore
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week,
    },
  })

  app.use(sessionMiddleware)
  app.use(Router);

  app.use(express.static(path.join(__dirname, '../public')));
  app.use('/static', express.static(path.join(__dirname, "../static")));
  app.use("/build.js", express.static(__dirname + '/build.js'));


  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
  })

  await apolloServer.start();

  apolloServer.applyMiddleware({ app })

  const server_ws = new WebSocketServer({
    // @ts-ignore
    port: process.env.PORT_WS,
    path: '/subscriptions',
  });

  useServer({
    context: createContext,
    execute,
    subscribe,
    schema,
    onConnect: (ctx) => {
      console.log('Connect !!!');
    },
    onSubscribe: (ctx, msg) => {
      console.log('Subscribe');
    },
    onNext: (ctx, msg, args, result) => {
      console.debug('Next =====================>');
    },
    onError: (ctx, msg, errors) => {
      console.error('Error ==================++>');
    },
    onComplete: (ctx, msg) => {
      console.log('Complete', msg);
    },
  }, server_ws);

  const server = createServer(app)

  // new Cron();
  new TwitchApiClient();

  // @ts-ignore
  server.listen(process.env.PORT, async () => {
    console.log(`\
      🚀 Server ready at: ${process.env.PORT}
      ⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
    `)
  })
}

main().catch((err) => {
  console.log(err)
})
