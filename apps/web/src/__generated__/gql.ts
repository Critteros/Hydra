/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query AllPermissions {\n    permissions {\n      id\n      description\n    }\n  } \n": types.AllPermissionsDocument,
    "\n  query CurrentUser {\n    me {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n": types.CurrentUserDocument,
    "\n  query QueryRoles {\n    roles {\n      uid\n      name\n      description\n      permissionsCount\n      membersCount\n    }\n  }\n": types.QueryRolesDocument,
    "\n  mutation UpdateUserInfo($userData: UserUpdateInput!) {\n    updateUser(userData: $userData) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n": types.UpdateUserInfoDocument,
    "\n  mutation ChangeCurentUserPassword($data: UpdatePasswordInput!) {\n    updateCurrentUserPassword(data: $data)\n  }\n": types.ChangeCurentUserPasswordDocument,
    "\n  mutation AdminChangeUserPassword($uid: String!, $newPassword: String!) {\n    adminUpdateUserPassword(uid: $uid, password: $newPassword)\n  }\n": types.AdminChangeUserPasswordDocument,
    "\n  mutation AdminLoginAsUser($uid: String!) {\n    adminLoginAsUser(uid: $uid)\n  }\n": types.AdminLoginAsUserDocument,
    "\n  mutation CreateNewUser($userData: CreateUserInput!) {\n    createNewUser(userData: $userData) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n": types.CreateNewUserDocument,
    "\n  query Users {\n    users {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n": types.UsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllPermissions {\n    permissions {\n      id\n      description\n    }\n  } \n"): (typeof documents)["\n  query AllPermissions {\n    permissions {\n      id\n      description\n    }\n  } \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CurrentUser {\n    me {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"): (typeof documents)["\n  query CurrentUser {\n    me {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryRoles {\n    roles {\n      uid\n      name\n      description\n      permissionsCount\n      membersCount\n    }\n  }\n"): (typeof documents)["\n  query QueryRoles {\n    roles {\n      uid\n      name\n      description\n      permissionsCount\n      membersCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserInfo($userData: UserUpdateInput!) {\n    updateUser(userData: $userData) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserInfo($userData: UserUpdateInput!) {\n    updateUser(userData: $userData) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangeCurentUserPassword($data: UpdatePasswordInput!) {\n    updateCurrentUserPassword(data: $data)\n  }\n"): (typeof documents)["\n  mutation ChangeCurentUserPassword($data: UpdatePasswordInput!) {\n    updateCurrentUserPassword(data: $data)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminChangeUserPassword($uid: String!, $newPassword: String!) {\n    adminUpdateUserPassword(uid: $uid, password: $newPassword)\n  }\n"): (typeof documents)["\n  mutation AdminChangeUserPassword($uid: String!, $newPassword: String!) {\n    adminUpdateUserPassword(uid: $uid, password: $newPassword)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminLoginAsUser($uid: String!) {\n    adminLoginAsUser(uid: $uid)\n  }\n"): (typeof documents)["\n  mutation AdminLoginAsUser($uid: String!) {\n    adminLoginAsUser(uid: $uid)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateNewUser($userData: CreateUserInput!) {\n    createNewUser(userData: $userData) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"): (typeof documents)["\n  mutation CreateNewUser($userData: CreateUserInput!) {\n    createNewUser(userData: $userData) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users {\n    users {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;