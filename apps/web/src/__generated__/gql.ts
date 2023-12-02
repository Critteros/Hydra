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
    "\n  query CurrentUser {\n    me {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n": types.CurrentUserDocument,
    "\n  mutation CreateComputer($data: ComputerCreateInput!) {\n    createComputer(data: $data) {\n      uid\n      name\n      mac\n    }\n  }\n": types.CreateComputerDocument,
    "\n  mutation AddComputerToGroup($computerUid: String!, $groupUid: String!) {\n    addComputersToGroup(computers: [{uid: $computerUid}], where: {uid: $groupUid}) { \n      uid\n    }\n  }\n": types.AddComputerToGroupDocument,
    "\n  mutation DeleteComputer($uid: String!) {\n    deleteComputers(where: [{uid: $uid}])\n  }\n": types.DeleteComputerDocument,
    "\n  mutation CreateComputerGroup($data: ComputerGroupCreateInput!) {\n    createComputerGroup(data: $data) {\n      uid\n      name\n    }\n  }\n": types.CreateComputerGroupDocument,
    "\n  query QueryComputersWithoutGroup {\n    computers(standalone: true) {\n      uid\n      name\n      mac\n      ipv4\n      viewOptions {\n        order\n      }\n    }\n  }\n": types.QueryComputersWithoutGroupDocument,
    "\n  query QueryComputerGroups {\n    computerGroups {\n      uid\n      name\n      computers {\n        uid\n        name\n        mac\n        ipv4\n        viewOptions {\n          order\n        }\n      }\n      viewOptions {\n        order\n      }\n    }\n  }\n": types.QueryComputerGroupsDocument,
    "\n  query PermissionsSummary {\n    allPermissions: permissions {\n      id\n      description\n    }\n    me {\n      uid\n      permissions {\n        id\n        description\n      }\n    }\n  }\n": types.PermissionsSummaryDocument,
    "\n  mutation CreateRole($input: CreateRoleInput!) {\n    createRole(data: $input) {\n      __typename\n    }\n  }\n": types.CreateRoleDocument,
    "\n  mutation DeleteMultipleRoles($uids: [String!]!) {\n    deleteMultipleRoles(uids: $uids)\n  }\n": types.DeleteMultipleRolesDocument,
    "\n  mutation AssignPermissionsToRole($roleUid: ID!, $permissionIds: [String!]!) {\n    assignPermissionsToRole(uid: $roleUid, permissionIds: $permissionIds)\n  }\n": types.AssignPermissionsToRoleDocument,
    "\n  mutation AssignUsersToRole($roleUid: ID!, $userUids: [String!]!) {\n    assignUsersToRole(uid: $roleUid, userUids: $userUids)\n  }\n": types.AssignUsersToRoleDocument,
    "\n  query QueryRoles {\n    roles {\n      uid\n      name\n      description\n      permissionsCount\n      memberCount\n    }\n  }\n": types.QueryRolesDocument,
    "\n  query QueryPermissionIds {\n    permissions {\n      id\n    }\n  }\n": types.QueryPermissionIdsDocument,
    "\n  query QueryRolePermissions($uid: ID!) {\n    role(uid: $uid) {\n      uid\n      permissions {\n        id\n      }\n    }\n    permissions {\n      id\n    }\n  }\n": types.QueryRolePermissionsDocument,
    "\n  query QueryRoleMembers($uid: ID!) {\n    role(uid: $uid) {\n      uid\n      members {\n        uid\n        email\n      }\n    }\n    users {\n      uid\n      email\n    }\n  }\n": types.QueryRoleMembersDocument,
    "\n  mutation AdminLoginAsUser($uid: String!) {\n    adminLoginAsUser(uid: $uid)\n  }\n": types.AdminLoginAsUserDocument,
    "\n  mutation CreateNewUser($input: CreateUserInput!) {\n    createUser(data: $input) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n": types.CreateNewUserDocument,
    "\n  mutation UpdateUserInfo($uid: ID!, $input: UpdateUserInput!) {\n    updateUser(uid: $uid, updateData: $input) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n": types.UpdateUserInfoDocument,
    "\n  mutation ChangeCurentUserPassword($currentPassword: String!, $newPassword: String!) {\n    updateCurrentUserPassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n": types.ChangeCurentUserPasswordDocument,
    "\n  mutation AdminChangeUserPassword($uid: ID!, $newPassword: String!) {\n    adminUpdateUserPassword(uid: $uid, password: $newPassword)\n  }\n": types.AdminChangeUserPasswordDocument,
    "\n  mutation DeleteMultipleUsers($uids: [ID!]!) {\n    deleteMultipleUsers(uids: $uids)\n  }\n": types.DeleteMultipleUsersDocument,
    "\n  query Users {\n    users {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n": types.UsersDocument,
    "\n  query ServerClientBridgeQuery {\n    me {\n      uid\n      permissionSet\n      accountType\n    }\n  }\n": types.ServerClientBridgeQueryDocument,
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
export function gql(source: "\n  query CurrentUser {\n    me {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"): (typeof documents)["\n  query CurrentUser {\n    me {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateComputer($data: ComputerCreateInput!) {\n    createComputer(data: $data) {\n      uid\n      name\n      mac\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComputer($data: ComputerCreateInput!) {\n    createComputer(data: $data) {\n      uid\n      name\n      mac\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddComputerToGroup($computerUid: String!, $groupUid: String!) {\n    addComputersToGroup(computers: [{uid: $computerUid}], where: {uid: $groupUid}) { \n      uid\n    }\n  }\n"): (typeof documents)["\n  mutation AddComputerToGroup($computerUid: String!, $groupUid: String!) {\n    addComputersToGroup(computers: [{uid: $computerUid}], where: {uid: $groupUid}) { \n      uid\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteComputer($uid: String!) {\n    deleteComputers(where: [{uid: $uid}])\n  }\n"): (typeof documents)["\n  mutation DeleteComputer($uid: String!) {\n    deleteComputers(where: [{uid: $uid}])\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateComputerGroup($data: ComputerGroupCreateInput!) {\n    createComputerGroup(data: $data) {\n      uid\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComputerGroup($data: ComputerGroupCreateInput!) {\n    createComputerGroup(data: $data) {\n      uid\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryComputersWithoutGroup {\n    computers(standalone: true) {\n      uid\n      name\n      mac\n      ipv4\n      viewOptions {\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  query QueryComputersWithoutGroup {\n    computers(standalone: true) {\n      uid\n      name\n      mac\n      ipv4\n      viewOptions {\n        order\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryComputerGroups {\n    computerGroups {\n      uid\n      name\n      computers {\n        uid\n        name\n        mac\n        ipv4\n        viewOptions {\n          order\n        }\n      }\n      viewOptions {\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  query QueryComputerGroups {\n    computerGroups {\n      uid\n      name\n      computers {\n        uid\n        name\n        mac\n        ipv4\n        viewOptions {\n          order\n        }\n      }\n      viewOptions {\n        order\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PermissionsSummary {\n    allPermissions: permissions {\n      id\n      description\n    }\n    me {\n      uid\n      permissions {\n        id\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query PermissionsSummary {\n    allPermissions: permissions {\n      id\n      description\n    }\n    me {\n      uid\n      permissions {\n        id\n        description\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateRole($input: CreateRoleInput!) {\n    createRole(data: $input) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRole($input: CreateRoleInput!) {\n    createRole(data: $input) {\n      __typename\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteMultipleRoles($uids: [String!]!) {\n    deleteMultipleRoles(uids: $uids)\n  }\n"): (typeof documents)["\n  mutation DeleteMultipleRoles($uids: [String!]!) {\n    deleteMultipleRoles(uids: $uids)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AssignPermissionsToRole($roleUid: ID!, $permissionIds: [String!]!) {\n    assignPermissionsToRole(uid: $roleUid, permissionIds: $permissionIds)\n  }\n"): (typeof documents)["\n  mutation AssignPermissionsToRole($roleUid: ID!, $permissionIds: [String!]!) {\n    assignPermissionsToRole(uid: $roleUid, permissionIds: $permissionIds)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AssignUsersToRole($roleUid: ID!, $userUids: [String!]!) {\n    assignUsersToRole(uid: $roleUid, userUids: $userUids)\n  }\n"): (typeof documents)["\n  mutation AssignUsersToRole($roleUid: ID!, $userUids: [String!]!) {\n    assignUsersToRole(uid: $roleUid, userUids: $userUids)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryRoles {\n    roles {\n      uid\n      name\n      description\n      permissionsCount\n      memberCount\n    }\n  }\n"): (typeof documents)["\n  query QueryRoles {\n    roles {\n      uid\n      name\n      description\n      permissionsCount\n      memberCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryPermissionIds {\n    permissions {\n      id\n    }\n  }\n"): (typeof documents)["\n  query QueryPermissionIds {\n    permissions {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryRolePermissions($uid: ID!) {\n    role(uid: $uid) {\n      uid\n      permissions {\n        id\n      }\n    }\n    permissions {\n      id\n    }\n  }\n"): (typeof documents)["\n  query QueryRolePermissions($uid: ID!) {\n    role(uid: $uid) {\n      uid\n      permissions {\n        id\n      }\n    }\n    permissions {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryRoleMembers($uid: ID!) {\n    role(uid: $uid) {\n      uid\n      members {\n        uid\n        email\n      }\n    }\n    users {\n      uid\n      email\n    }\n  }\n"): (typeof documents)["\n  query QueryRoleMembers($uid: ID!) {\n    role(uid: $uid) {\n      uid\n      members {\n        uid\n        email\n      }\n    }\n    users {\n      uid\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminLoginAsUser($uid: String!) {\n    adminLoginAsUser(uid: $uid)\n  }\n"): (typeof documents)["\n  mutation AdminLoginAsUser($uid: String!) {\n    adminLoginAsUser(uid: $uid)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateNewUser($input: CreateUserInput!) {\n    createUser(data: $input) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"): (typeof documents)["\n  mutation CreateNewUser($input: CreateUserInput!) {\n    createUser(data: $input) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserInfo($uid: ID!, $input: UpdateUserInput!) {\n    updateUser(uid: $uid, updateData: $input) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserInfo($uid: ID!, $input: UpdateUserInput!) {\n    updateUser(uid: $uid, updateData: $input) {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ChangeCurentUserPassword($currentPassword: String!, $newPassword: String!) {\n    updateCurrentUserPassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n"): (typeof documents)["\n  mutation ChangeCurentUserPassword($currentPassword: String!, $newPassword: String!) {\n    updateCurrentUserPassword(currentPassword: $currentPassword, newPassword: $newPassword)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AdminChangeUserPassword($uid: ID!, $newPassword: String!) {\n    adminUpdateUserPassword(uid: $uid, password: $newPassword)\n  }\n"): (typeof documents)["\n  mutation AdminChangeUserPassword($uid: ID!, $newPassword: String!) {\n    adminUpdateUserPassword(uid: $uid, password: $newPassword)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteMultipleUsers($uids: [ID!]!) {\n    deleteMultipleUsers(uids: $uids)\n  }\n"): (typeof documents)["\n  mutation DeleteMultipleUsers($uids: [ID!]!) {\n    deleteMultipleUsers(uids: $uids)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users {\n    users {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      uid\n      email\n      name\n      accountType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ServerClientBridgeQuery {\n    me {\n      uid\n      permissionSet\n      accountType\n    }\n  }\n"): (typeof documents)["\n  query ServerClientBridgeQuery {\n    me {\n      uid\n      permissionSet\n      accountType\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;