import { Inject, Injectable, type NestMiddleware } from '@nestjs/common';

import RedisStore from 'connect-redis';
import type { Request, Response, NextFunction } from 'express';
import session from 'express-session';

import { type RedisClient, RedisClientToken } from '@/redis/redis.constants';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private redisStore: RedisStore;
  private sessionOptions: session.SessionOptions;

  constructor(@Inject(RedisClientToken) private readonly redisClient: RedisClient) {
    this.redisStore = new RedisStore({ client: redisClient, prefix: 'hydra-ipxe:' });
    this.sessionOptions = {
      store: this.redisStore,
      secret: process.env.COOKIE_SECRET ?? 'hydra-ipxe',
      cookie: { secure: false },
      resave: false,
      saveUninitialized: false,
      name: 'session',
    };
  }

  use(req: Request, res: Response, next: NextFunction) {
    session(this.sessionOptions)(req, res, next);
  }
}
