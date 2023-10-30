import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module, type MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { resolve } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';
import { RedisModule } from './db/redis.module';
import { ManagementModule } from './management/management.module';
import { PassportMiddleware } from './middleware/passport.middleware';
import { SessionMiddleware } from './middleware/session.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'schema.gql'),
      formatError: (error) => {
        const originalError = error.extensions?.originalError as
          | { message: string; error: string; statusCode: number }
          | undefined;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
            path: error.path,
          };
        }

        return {
          message: originalError.message,
          code: originalError.statusCode,
          path: error.path,
        };
      },
      path: '/api/graphql',
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    }),
    ManagementModule,
    ConfigModule,
    AuthModule,
    DbModule,
    UserModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
    consumer.apply(PassportMiddleware).forRoutes('*');
  }
}
