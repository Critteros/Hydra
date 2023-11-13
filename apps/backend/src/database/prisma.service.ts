import { Injectable, type OnModuleInit, Logger } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
  }

  async __unsafe__truncate() {
    const records = await this.$queryRawUnsafe<Array<{ tablename: string }>>(`SELECT tablename
                                                          FROM pg_tables
                                                          WHERE schemaname = 'public'`);
    this.logger.debug(`Truncating tables: ${records.map(({ tablename }) => tablename).join(', ')}`);
    await Promise.all(records.map(({ tablename }) => this.__unsafe__truncateTable(tablename)));
  }

  async __unsafe__truncateTable(tablename?: string) {
    if (tablename === undefined || tablename === '_prisma_migrations') {
      return;
    }
    try {
      await this.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
    } catch (error) {
      this.logger.error(`Error truncating table ${tablename}`, error);
    }
  }

  async __unsafe__resetSequences() {
    const results = await this.$queryRawUnsafe<Array<{ record: { relname: string } }>>(
      `SELECT c.relname
       FROM pg_class AS c
                JOIN pg_namespace AS n ON c.relnamespace = n.oid
       WHERE c.relkind = 'S'
         AND n.nspname = 'public'`,
    );
    this.logger.debug(
      `Resetting sequences: ${results.map(({ record: { relname } }) => relname).join(', ')}`,
    );

    await Promise.all(
      results.map(({ record: { relname } }) =>
        this.$executeRawUnsafe(`ALTER SEQUENCE "public"."${relname}" RESTART WITH 1;`),
      ),
    );
  }
}
