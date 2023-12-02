import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module, type NestModule, type MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { resolve } from 'path';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ErrorsModule } from './errors/errors.module';
import { IpxeModule } from './ipxe/ipxe.module';
import { ManagementModule } from './management/management.module';
import { MetadataModule } from './metadata/metadata.module';
import { PassportMiddleware } from './middleware/passport.middleware';
import { SessionMiddleware } from './middleware/session.middleware';
import { RbacModule } from './rbac/rbac.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { formatError } from './utils/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'schema.gql'),
      formatError,
      path: '/api/graphql',
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    }),
    ManagementModule,
    ConfigModule,
    RbacModule,
    AuthModule,
    UserModule,
    RedisModule,
    DatabaseModule,
    MetadataModule,
    ErrorsModule,
    IpxeModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
    consumer.apply(PassportMiddleware).forRoutes('*');
  }
}
