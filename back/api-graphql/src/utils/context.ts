import { PrismaClient } from '@prisma/client'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { Request, Response } from 'express'
import { Session, SessionData } from 'express-session'
import Redis, { RedisOptions } from 'ioredis'

// Type-safe database client for TypeScript & Node.js (ORM replacement)
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : undefined,
})

const redisOptions: RedisOptions = {
  host: process.env.REDIS_DOMAIN_NAME,
  // @ts-ignore
  port: process.env.REDIS_PORT_NUMBER,
  retryStrategy: (times) => Math.min(times * 50, 2000),
}

// @ts-ignore
export const redis = new Redis(process.env.REDIS_URL)
const pubsub = new RedisPubSub({
  publisher: new Redis(redisOptions),
  subscriber: new Redis(redisOptions),
})

export type Context = {
  // @ts-ignore
  redis: Redis.Redis
  prisma: PrismaClient
  pubsub: RedisPubSub
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: string }
  }
  res: Response
  connection: {
    context: {
      req: { session: { userId?: string; passport?: { user?: string } } }
    }
  }
}

// Provided to ApolloServer in index.ts
export const createContext = ({ req, res, connection }: Context): Context => {
  return { redis, prisma, pubsub, req, res, connection }
}
