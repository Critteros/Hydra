import type { ExcludeKeys, EmptyObject } from '@hydra-ipxe/utils/types';
import postgres from 'postgres';
import type { Options, Sql } from 'postgres';

export type DbAuthenticationCredentials = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
};

type CreateNativeDbClientParams = {
  credentials: DbAuthenticationCredentials;
  postgresJsOptions: ExcludeKeys<Options<EmptyObject>, DbAuthenticationCredentials>;
};
export type NativeDbClient = Sql<EmptyObject>;

/**
 * Creates postgres.js database client
 *
 * @param host
 * @param database
 * @param port
 * @param password
 * @param username
 * @param postgresJsOptions
 */
export function createNativeDbClient({
  credentials: { host, database, port, password, username },
  postgresJsOptions,
}: CreateNativeDbClientParams): NativeDbClient {
  return postgres({
    host,
    database,
    port,
    password,
    username,
    ...postgresJsOptions,
  });
}
