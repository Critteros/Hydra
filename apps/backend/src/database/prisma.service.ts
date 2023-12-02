import { Injectable, type OnModuleInit, Logger, type OnModuleDestroy } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

export type PrismaTransaction = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async transactional<T>(
    transaction: PrismaTransaction | undefined,
    callback: (tx: PrismaTransaction) => Promise<T>,
  ) {
    if (transaction) {
      return await callback(transaction);
    }

    return await this.$transaction(callback);
  }
}
