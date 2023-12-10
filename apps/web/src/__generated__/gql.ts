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
    "\n  mutation BasicBootStrategyCreate($input: BasicBootStrategyCreateInput!) {\n    createBasicBootStrategy(input: $input) {\n      uid\n    }\n  }\n": types.BasicBootStrategyCreateDocument,
    "\n  mutation BasicBootStrategyUpdate($strategyUid: String!, $update: BasicBootStrategyUpdateInput!) {\n    updateBasicBootStrategy(where: {uid: $strategyUid}, update: $update) {\n      uid\n    }\n  }\n": types.BasicBootStrategyUpdateDocument,
    "\n  query IpxeStrategyQuery {\n    ipxeStrategies {\n      __typename\n      ... on BasicBootStrategy {\n        uid\n        template {\n          id\n          name\n        }\n        name\n        description\n      }\n    }\n  }\n": types.IpxeStrategyQueryDocument,
    "\n  query BasicBootStartegyDefaultValues($strategyUid: String!) {\n    basicBootStrategy(where: {uid: $strategyUid}) {\n     uid\n     name\n     description\n     kernelPath\n     initramfsPath\n     kernelParams \n     template {\n      id\n     }\n    }\n  }\n": types.BasicBootStartegyDefaultValuesDocument,
    "\n  query StrategyDataQuery {\n    ipxeStrategyTemplates {\n      id\n      name\n    }\n    ipxeAssets {\n      uid\n      resourceId\n    }\n  }\n": types.StrategyDataQueryDocument,
    "\n  query StrategyNames {\n    ipxeStrategies {\n      __typename\n      ...on BasicBootStrategy {\n        uid\n        name\n      }\n    }\n  }\n": types.StrategyNamesDocument,
    "\n  mutation DeleteStrategy($strategyUid: String!) {\n    deleteIpxeStrategy(where: {uid: $strategyUid}) {\n      __typename\n    }\n  }\n": types.DeleteStrategyDocument,
    "\n  query IpxeTemplatesQuery {\n    ipxeStrategyTemplates {\n      id\n      name\n      description\n    }\n  }\n": types.IpxeTemplatesQueryDocument,
    "\n  mutation DeleteAssets($where: [WhereUniqueIpxeAssetInput!]!) {\n    removeAssets(where: $where)\n  }\n": types.DeleteAssetsDocument,
    "\n  mutation EditAsset($where: WhereUniqueIpxeAssetInput!, $data: UpdateIpxeAssetInput!) {\n    updateAssetMetadata(where: $where, data: $data) {\n      uid\n      resourceId\n      filename\n    }\n  }\n": types.EditAssetDocument,
    "\n  query AllAssetsQuery {\n    ipxeAssets {\n      uid\n      resourceId\n      filename\n      createdAt\n      updatedAt\n      sha256\n      url\n      fileSizeBytes\n    }\n  }\n": types.AllAssetsQueryDocument,
    "\n  mutation UpdateComputerGroupStrategy($computerGroupUid: String!, $whichStrategy: WhereUniqueIpxeStrategyNullable) {\n    changeComputerGroupStrategy(whichComputerGroup: {uid: $computerGroupUid}, whichStrategy: $whichStrategy) {\n      uid\n    }\n  }\n": types.UpdateComputerGroupStrategyDocument,
    "\n  mutation CreateComputer($data: ComputerCreateInput!) {\n    createComputer(data: $data) {\n      uid\n      name\n      mac\n    }\n  }\n": types.CreateComputerDocument,
    "\n  mutation AddComputerToGroup($computerUid: String!, $groupUid: String!) {\n    addComputersToGroup(computers: [{uid: $computerUid}], where: {uid: $groupUid}) { \n      uid\n    }\n  }\n": types.AddComputerToGroupDocument,
    "\n  mutation DeleteComputer($uid: String!) {\n    deleteComputers(where: [{uid: $uid}])\n  }\n": types.DeleteComputerDocument,
    "\n  mutation CreateComputerGroup($data: ComputerGroupCreateInput!) {\n    createComputerGroup(data: $data) {\n      uid\n      name\n    }\n  }\n": types.CreateComputerGroupDocument,
    "\n  mutation DeleteComputerGroup($uid: String!) {\n    deleteComputerGroups(where: [{uid: $uid}])    \n  }\n": types.DeleteComputerGroupDocument,
    "\n  mutation MoveComputerToGroupAndUpdateOrder($computerUid: String!, $groupUid: String, $order: Int!) {\n    moveComputerAndUpdateOrder(whichComputer: {uid: $computerUid}, computerGroupUid: $groupUid, newOrder: $order)\n  }\n": types.MoveComputerToGroupAndUpdateOrderDocument,
    "\n  query QueryComputersWithoutGroup {\n    computers(standalone: true) {\n      uid\n      name\n      mac\n      ipv4\n      viewOptions {\n        order\n      }\n      strategy {\n        __typename\n        ...on BasicBootStrategy {\n          uid\n          name\n        }\n      }\n    }\n  }\n": types.QueryComputersWithoutGroupDocument,
    "\n  query QueryComputerGroups {\n    computerGroups {\n      uid\n      name\n      computers {\n        uid\n        name\n        mac\n        ipv4\n        viewOptions {\n          order\n        }\n        strategy {\n          __typename\n          ...on BasicBootStrategy {\n            uid\n            name\n          }\n        }\n      }\n      strategy {\n        __typename\n        ...on BasicBootStrategy {\n          uid\n          name\n        }\n      }\n      viewOptions {\n        order\n      }\n    }\n  }\n": types.QueryComputerGroupsDocument,
    "\n  mutation UpdateComputerStrategy($computerUid: String!, $whichStrategy: WhereUniqueIpxeStrategyNullable) {\n    changeComputerStrategy(whichComputer: {uid: $computerUid}, whichStrategy: $whichStrategy) {\n      uid\n    }\n  }\n": types.UpdateComputerStrategyDocument,
    "\n  mutation UpdateGlobalStrategy($whichStrategy: WhereUniqueIpxeStrategyNullable) {\n    changeGlobalIpxeStrategy(whichStretgy: $whichStrategy) {\n      __typename\n    }\n  }\n": types.UpdateGlobalStrategyDocument,
    "\n  query GlobalStrategyName {\n    globalIpxeStrategy {\n      __typename\n      ...on BasicBootStrategy {\n        uid\n        name\n      }\n    }\n  }\n": types.GlobalStrategyNameDocument,
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
export function gql(source: "\n  mutation BasicBootStrategyCreate($input: BasicBootStrategyCreateInput!) {\n    createBasicBootStrategy(input: $input) {\n      uid\n    }\n  }\n"): (typeof documents)["\n  mutation BasicBootStrategyCreate($input: BasicBootStrategyCreateInput!) {\n    createBasicBootStrategy(input: $input) {\n      uid\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation BasicBootStrategyUpdate($strategyUid: String!, $update: BasicBootStrategyUpdateInput!) {\n    updateBasicBootStrategy(where: {uid: $strategyUid}, update: $update) {\n      uid\n    }\n  }\n"): (typeof documents)["\n  mutation BasicBootStrategyUpdate($strategyUid: String!, $update: BasicBootStrategyUpdateInput!) {\n    updateBasicBootStrategy(where: {uid: $strategyUid}, update: $update) {\n      uid\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IpxeStrategyQuery {\n    ipxeStrategies {\n      __typename\n      ... on BasicBootStrategy {\n        uid\n        template {\n          id\n          name\n        }\n        name\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query IpxeStrategyQuery {\n    ipxeStrategies {\n      __typename\n      ... on BasicBootStrategy {\n        uid\n        template {\n          id\n          name\n        }\n        name\n        description\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BasicBootStartegyDefaultValues($strategyUid: String!) {\n    basicBootStrategy(where: {uid: $strategyUid}) {\n     uid\n     name\n     description\n     kernelPath\n     initramfsPath\n     kernelParams \n     template {\n      id\n     }\n    }\n  }\n"): (typeof documents)["\n  query BasicBootStartegyDefaultValues($strategyUid: String!) {\n    basicBootStrategy(where: {uid: $strategyUid}) {\n     uid\n     name\n     description\n     kernelPath\n     initramfsPath\n     kernelParams \n     template {\n      id\n     }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query StrategyDataQuery {\n    ipxeStrategyTemplates {\n      id\n      name\n    }\n    ipxeAssets {\n      uid\n      resourceId\n    }\n  }\n"): (typeof documents)["\n  query StrategyDataQuery {\n    ipxeStrategyTemplates {\n      id\n      name\n    }\n    ipxeAssets {\n      uid\n      resourceId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query StrategyNames {\n    ipxeStrategies {\n      __typename\n      ...on BasicBootStrategy {\n        uid\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query StrategyNames {\n    ipxeStrategies {\n      __typename\n      ...on BasicBootStrategy {\n        uid\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteStrategy($strategyUid: String!) {\n    deleteIpxeStrategy(where: {uid: $strategyUid}) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteStrategy($strategyUid: String!) {\n    deleteIpxeStrategy(where: {uid: $strategyUid}) {\n      __typename\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IpxeTemplatesQuery {\n    ipxeStrategyTemplates {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query IpxeTemplatesQuery {\n    ipxeStrategyTemplates {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAssets($where: [WhereUniqueIpxeAssetInput!]!) {\n    removeAssets(where: $where)\n  }\n"): (typeof documents)["\n  mutation DeleteAssets($where: [WhereUniqueIpxeAssetInput!]!) {\n    removeAssets(where: $where)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditAsset($where: WhereUniqueIpxeAssetInput!, $data: UpdateIpxeAssetInput!) {\n    updateAssetMetadata(where: $where, data: $data) {\n      uid\n      resourceId\n      filename\n    }\n  }\n"): (typeof documents)["\n  mutation EditAsset($where: WhereUniqueIpxeAssetInput!, $data: UpdateIpxeAssetInput!) {\n    updateAssetMetadata(where: $where, data: $data) {\n      uid\n      resourceId\n      filename\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllAssetsQuery {\n    ipxeAssets {\n      uid\n      resourceId\n      filename\n      createdAt\n      updatedAt\n      sha256\n      url\n      fileSizeBytes\n    }\n  }\n"): (typeof documents)["\n  query AllAssetsQuery {\n    ipxeAssets {\n      uid\n      resourceId\n      filename\n      createdAt\n      updatedAt\n      sha256\n      url\n      fileSizeBytes\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateComputerGroupStrategy($computerGroupUid: String!, $whichStrategy: WhereUniqueIpxeStrategyNullable) {\n    changeComputerGroupStrategy(whichComputerGroup: {uid: $computerGroupUid}, whichStrategy: $whichStrategy) {\n      uid\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateComputerGroupStrategy($computerGroupUid: String!, $whichStrategy: WhereUniqueIpxeStrategyNullable) {\n    changeComputerGroupStrategy(whichComputerGroup: {uid: $computerGroupUid}, whichStrategy: $whichStrategy) {\n      uid\n    }\n  }\n"];
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
export function gql(source: "\n  mutation DeleteComputerGroup($uid: String!) {\n    deleteComputerGroups(where: [{uid: $uid}])    \n  }\n"): (typeof documents)["\n  mutation DeleteComputerGroup($uid: String!) {\n    deleteComputerGroups(where: [{uid: $uid}])    \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MoveComputerToGroupAndUpdateOrder($computerUid: String!, $groupUid: String, $order: Int!) {\n    moveComputerAndUpdateOrder(whichComputer: {uid: $computerUid}, computerGroupUid: $groupUid, newOrder: $order)\n  }\n"): (typeof documents)["\n  mutation MoveComputerToGroupAndUpdateOrder($computerUid: String!, $groupUid: String, $order: Int!) {\n    moveComputerAndUpdateOrder(whichComputer: {uid: $computerUid}, computerGroupUid: $groupUid, newOrder: $order)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryComputersWithoutGroup {\n    computers(standalone: true) {\n      uid\n      name\n      mac\n      ipv4\n      viewOptions {\n        order\n      }\n      strategy {\n        __typename\n        ...on BasicBootStrategy {\n          uid\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query QueryComputersWithoutGroup {\n    computers(standalone: true) {\n      uid\n      name\n      mac\n      ipv4\n      viewOptions {\n        order\n      }\n      strategy {\n        __typename\n        ...on BasicBootStrategy {\n          uid\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryComputerGroups {\n    computerGroups {\n      uid\n      name\n      computers {\n        uid\n        name\n        mac\n        ipv4\n        viewOptions {\n          order\n        }\n        strategy {\n          __typename\n          ...on BasicBootStrategy {\n            uid\n            name\n          }\n        }\n      }\n      strategy {\n        __typename\n        ...on BasicBootStrategy {\n          uid\n          name\n        }\n      }\n      viewOptions {\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  query QueryComputerGroups {\n    computerGroups {\n      uid\n      name\n      computers {\n        uid\n        name\n        mac\n        ipv4\n        viewOptions {\n          order\n        }\n        strategy {\n          __typename\n          ...on BasicBootStrategy {\n            uid\n            name\n          }\n        }\n      }\n      strategy {\n        __typename\n        ...on BasicBootStrategy {\n          uid\n          name\n        }\n      }\n      viewOptions {\n        order\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateComputerStrategy($computerUid: String!, $whichStrategy: WhereUniqueIpxeStrategyNullable) {\n    changeComputerStrategy(whichComputer: {uid: $computerUid}, whichStrategy: $whichStrategy) {\n      uid\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateComputerStrategy($computerUid: String!, $whichStrategy: WhereUniqueIpxeStrategyNullable) {\n    changeComputerStrategy(whichComputer: {uid: $computerUid}, whichStrategy: $whichStrategy) {\n      uid\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateGlobalStrategy($whichStrategy: WhereUniqueIpxeStrategyNullable) {\n    changeGlobalIpxeStrategy(whichStretgy: $whichStrategy) {\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateGlobalStrategy($whichStrategy: WhereUniqueIpxeStrategyNullable) {\n    changeGlobalIpxeStrategy(whichStretgy: $whichStrategy) {\n      __typename\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GlobalStrategyName {\n    globalIpxeStrategy {\n      __typename\n      ...on BasicBootStrategy {\n        uid\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GlobalStrategyName {\n    globalIpxeStrategy {\n      __typename\n      ...on BasicBootStrategy {\n        uid\n        name\n      }\n    }\n  }\n"];
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