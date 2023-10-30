import { Module, Scope, type OnModuleDestroy, Inject } from '@nestjs/common';

import { createClient } from 'redis';

import { RedisClientToken, RedisOptionsToken, type RedisClient } from './redis.constants';

export type RedisOptions = { url: string };

@Module({
  providers: [
    {
      provide: RedisOptionsToken,
      useValue: {
        url: 'redis://localhost:6379',
      },
      scope: Scope.DEFAULT,
    },
    {
      provide: RedisClientToken,
      useFactory: async (options: RedisOptions) => {
        const client = createClient(options);
        await client.connect();
        return client;
      },
      inject: [RedisOptionsToken],
      scope: Scope.DEFAULT,
    },
  ],
  exports: [RedisClientToken],
})
export class RedisModule implements OnModuleDestroy {
  constructor(@Inject(RedisClientToken) private readonly redisClient: RedisClient) {}

  async onModuleDestroy() {
    await this.redisClient.disconnect();
  }
}
