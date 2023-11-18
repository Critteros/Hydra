import { debug } from 'debug';
import type { RedisClientType } from 'redis';
import { GenericContainer, Wait, type StartedTestContainer } from 'testcontainers';

import { PerfCounter } from '@/utils/perf-counter';

const REDIS_IMAGE_TAG = 'redis:7.2.3-alpine';

export class RedisTestCache {
  private readonly container: GenericContainer;
  private startedContainer?: StartedTestContainer;
  private readonly log = debug('test:containers:redis');

  constructor() {
    this.container = new GenericContainer(REDIS_IMAGE_TAG)
      .withExposedPorts(6379)
      .withWaitStrategy(Wait.forLogMessage('Ready to accept connections'));
  }

  async setup() {
    const perfCounter = new PerfCounter();
    this.startedContainer = await this.container.start();
    const timeTaken = perfCounter.stop();
    this.log(`Setup took ${timeTaken.to('ms')}ms`);
  }

  async reset(client: RedisClientType) {
    const perfCounter = new PerfCounter();
    await client.flushAll();
    const timeTaken = perfCounter.stop();
    this.log(`Reset took ${timeTaken.to('ms')}ms`);
  }

  async teardown() {
    const perfCounter = new PerfCounter();
    if (this.startedContainer) {
      await this.startedContainer.stop();
    }
    const timeTaken = perfCounter.stop();
    this.log(`Teardown took ${timeTaken.to('ms')}ms`);
  }

  get connectionUri() {
    if (!this.startedContainer) {
      throw new Error('Container not started');
    }
    return `redis://${this.startedContainer.getHost()}:${this.startedContainer.getMappedPort(
      6379,
    )}`;
  }
}
