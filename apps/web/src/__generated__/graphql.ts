/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Type of the user account */
export enum AccountType {
  Admin = 'ADMIN',
  Standard = 'STANDARD'
}

export type AssignedPermission = {
  __typename?: 'AssignedPermission';
  /** Date when permission was assigned */
  assignedAt: Scalars['DateTime']['output'];
  /** User who assigned specific permission */
  assignedBy?: Maybe<User>;
  /** Description of the permission */
  description: Scalars['String']['output'];
  /** Unique identifier and name of the permission */
  id: Scalars['ID']['output'];
};

export type BasicBootStrategy = {
  __typename?: 'BasicBootStrategy';
  /** Strategy descriptino */
  description: Scalars['String']['output'];
  /** Relative path to initramfs asset file */
  initramfsPath: Scalars['String']['output'];
  /** Kernel params passed to kernel commandline */
  kernelParams?: Maybe<Scalars['String']['output']>;
  /** Relative path to kernel asset file */
  kernelPath: Scalars['String']['output'];
  /** Strategy name */
  name: Scalars['String']['output'];
  /** Template used for startegy */
  template: IpxeStrategyTemplate;
  /** Unique identifier of a strategy */
  uid: Scalars['ID']['output'];
};

export type BasicBootStrategyCreateInput = {
  /** Ipxe strategy description */
  description: Scalars['String']['input'];
  /** Relative path to a initamfs asset file */
  initramfsPath: Scalars['String']['input'];
  /** Kernel params passed to kernel commandline */
  kernelParams?: InputMaybe<Scalars['String']['input']>;
  /** Relative path to a kernel asset file */
  kernelPath: Scalars['String']['input'];
  /** Ipxe strategy name */
  name: Scalars['String']['input'];
  /** Ipxe strategy template selector */
  template: WhereUniqueIpxeStrategyTemplate;
};

export type BasicBootStrategyUpdateInput = {
  /** Ipxe strategy description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Relative path to a initamfs asset file */
  initramfsPath?: InputMaybe<Scalars['String']['input']>;
  /** Kernel params passed to kernel commandline */
  kernelParams?: InputMaybe<Scalars['String']['input']>;
  /** Relative path to a kernel asset file */
  kernelPath?: InputMaybe<Scalars['String']['input']>;
  /** Ipxe strategy name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Ipxe strategy template selector */
  template?: InputMaybe<WhereUniqueIpxeStrategyTemplate>;
};

/** Represent a computer which participates in the network boot process */
export type Computer = {
  __typename?: 'Computer';
  /** IP address of the computer */
  ipv4?: Maybe<Scalars['String']['output']>;
  /** MAC address of the computer */
  mac: Scalars['String']['output'];
  /** Name of the computer set by the user */
  name: Scalars['String']['output'];
  /** Ipxe strategy used when booting */
  strategy?: Maybe<IpxeStrategy>;
  /** Unique identifier of the computer */
  uid: Scalars['ID']['output'];
  /** Presentation configuration for a computer */
  viewOptions?: Maybe<ComputerViewOptions>;
};

export type ComputerCreateInput = {
  /** IP address of the computer */
  ipv4?: InputMaybe<Scalars['String']['input']>;
  /** MAC address of the computer */
  mac: Scalars['String']['input'];
  /** Name of the computer */
  name: Scalars['String']['input'];
  /** Presentation configuration for a computer */
  viewOptions?: InputMaybe<ComputerViewOptionsCreateInput>;
};

/** Represent a grouping of computers */
export type ComputerGroup = {
  __typename?: 'ComputerGroup';
  /** Description of the computer group */
  computers: Array<Computer>;
  /** Name of the computer group */
  name: Scalars['String']['output'];
  /** Ipxe strategy used when booting */
  strategy?: Maybe<IpxeStrategy>;
  /** Unique identifier of the computer group */
  uid: Scalars['ID']['output'];
  /** Presentation configuration for a computer group */
  viewOptions?: Maybe<ComputerGroupViewOptions>;
};

export type ComputerGroupCreateInput = {
  /** Computers to add to the group */
  computers?: InputMaybe<Array<WhereUniqueComputerInput>>;
  /** Name of the computer group */
  name: Scalars['String']['input'];
  /** Presentation configuration for a computer group */
  viewOptions?: InputMaybe<ComputerGroupViewOptionsCreateInput>;
};

/** Presentation configuration for a computer group */
export type ComputerGroupViewOptions = {
  __typename?: 'ComputerGroupViewOptions';
  /** Whether to show the computer group in the list */
  id: Scalars['ID']['output'];
  /** Whether to show the computer group in the list */
  order: Scalars['Float']['output'];
};

export type ComputerGroupViewOptionsCreateInput = {
  /** Order of the computer group in the list */
  order: Scalars['Float']['input'];
};

export type ComputerGroupViewOptionsUpdateInput = {
  /** Order of the computer group in the list */
  order: Scalars['Float']['input'];
};

/** Presentation configuration for a computer */
export type ComputerViewOptions = {
  __typename?: 'ComputerViewOptions';
  /** Whether to show the computer in the list */
  id: Scalars['ID']['output'];
  /** Whether to show the computer in the list */
  order: Scalars['Float']['output'];
};

export type ComputerViewOptionsCreateInput = {
  /** Order of the computer in the list */
  order: Scalars['Float']['input'];
};

export type ComputerViewOptionsUpdateInput = {
  /** Order of the computer in the list */
  order: Scalars['Float']['input'];
};

export type CreateRoleInput = {
  /** Role description */
  description: Scalars['String']['input'];
  /** Role name */
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** Type of the user account */
  accountType?: AccountType;
  /** New email address of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Nickname for the user */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Password for the user */
  password: Scalars['String']['input'];
};

export type IpxeAsset = {
  __typename?: 'IpxeAsset';
  /** Creation date of the asset */
  createdAt: Scalars['DateTime']['output'];
  /** MIME type of the asset */
  fileSizeBytes: Scalars['Int']['output'];
  /** Original filename of the asset */
  filename: Scalars['String']['output'];
  /** Resource id of an asset */
  resourceId: Scalars['String']['output'];
  /** SHA256 hash of the asset */
  sha256: Scalars['String']['output'];
  /** Unique id of an asset */
  uid: Scalars['ID']['output'];
  /** Last update date of the asset */
  updatedAt: Scalars['DateTime']['output'];
  /** URL of the asset */
  url: Scalars['String']['output'];
};

export type IpxeStrategy = BasicBootStrategy;

export type IpxeStrategyTemplate = {
  __typename?: 'IpxeStrategyTemplate';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add computers to a computer group */
  addComputersToGroup: ComputerGroup;
  /** Login as a user */
  adminLoginAsUser: Scalars['Boolean']['output'];
  /** Admin updates user password */
  adminUpdateUserPassword: Scalars['Boolean']['output'];
  /** Assign permissions to a role */
  assignPermissionsToRole: Scalars['Boolean']['output'];
  /** Assign users to a role */
  assignUsersToRole: Scalars['Boolean']['output'];
  changeComputerGroupStrategy: ComputerGroup;
  /** Change the view options of a computer group */
  changeComputerGroupViewOptions: ComputerGroupViewOptions;
  /** Changes computer ipxe strategy */
  changeComputerStrategy: Computer;
  /** Change the view options of a computer */
  changeComputerViewOptions: ComputerViewOptions;
  /** Changes global ipxe strategy */
  changeGlobalIpxeStrategy?: Maybe<IpxeStrategy>;
  createBasicBootStrategy: BasicBootStrategy;
  /** Create a new computer */
  createComputer: Computer;
  /** Create a new computer group */
  createComputerGroup: ComputerGroup;
  /** Create a new role */
  createRole: Role;
  /** Creates a new user */
  createUser: User;
  /** Delete a computer group */
  deleteComputerGroups: Scalars['Int']['output'];
  /** Delete a computer */
  deleteComputers: Scalars['Int']['output'];
  deleteIpxeStrategy: IpxeStrategy;
  /** Delete many roles */
  deleteMultipleRoles: Scalars['Int']['output'];
  /** Delete multiple users */
  deleteMultipleUsers: Scalars['Boolean']['output'];
  /** Delete a role */
  deleteRole: Scalars['Boolean']['output'];
  /** Moves computer to a specified group and updates its order */
  moveComputerAndUpdateOrder: Scalars['Boolean']['output'];
  /** Move computers between groups */
  moveComputers: Array<Computer>;
  /** Remove assets */
  removeAssets: Scalars['Int']['output'];
  /** Remove computers from a computer group */
  removeComputersFromGroup: ComputerGroup;
  /** Update asset metadata */
  updateAssetMetadata: IpxeAsset;
  updateBasicBootStrategy: BasicBootStrategy;
  /** Updates current user password */
  updateCurrentUserPassword: Scalars['Boolean']['output'];
  /** Update resource id */
  updateResourceId: Scalars['String']['output'];
  /** Updates user data */
  updateUser: User;
};


export type MutationAddComputersToGroupArgs = {
  computers: Array<WhereUniqueComputerInput>;
  where: WhereUniqueComputerGroupInput;
};


export type MutationAdminLoginAsUserArgs = {
  uid: Scalars['String']['input'];
};


export type MutationAdminUpdateUserPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAssignPermissionsToRoleArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  permissionIds: Array<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAssignUsersToRoleArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  userUids: Array<Scalars['String']['input']>;
};


export type MutationChangeComputerGroupStrategyArgs = {
  whichComputerGroup: WhereUniqueComputerGroupInput;
  whichStrategy?: InputMaybe<WhereUniqueIpxeStrategyNullable>;
};


export type MutationChangeComputerGroupViewOptionsArgs = {
  data: ComputerGroupViewOptionsUpdateInput;
  where: WhereUniqueComputerGroupInput;
};


export type MutationChangeComputerStrategyArgs = {
  whichComputer: WhereUniqueComputerInput;
  whichStrategy?: InputMaybe<WhereUniqueIpxeStrategyNullable>;
};


export type MutationChangeComputerViewOptionsArgs = {
  data: ComputerViewOptionsUpdateInput;
  where: WhereUniqueComputerInput;
};


export type MutationChangeGlobalIpxeStrategyArgs = {
  whichStretgy?: InputMaybe<WhereUniqueIpxeStrategyNullable>;
};


export type MutationCreateBasicBootStrategyArgs = {
  input: BasicBootStrategyCreateInput;
};


export type MutationCreateComputerArgs = {
  data: ComputerCreateInput;
};


export type MutationCreateComputerGroupArgs = {
  data: ComputerGroupCreateInput;
};


export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteComputerGroupsArgs = {
  where: Array<WhereUniqueComputerGroupInput>;
};


export type MutationDeleteComputersArgs = {
  where: Array<WhereUniqueComputerInput>;
};


export type MutationDeleteIpxeStrategyArgs = {
  where: WhereUniqueIpxeStrategy;
};


export type MutationDeleteMultipleRolesArgs = {
  uids: Array<Scalars['String']['input']>;
};


export type MutationDeleteMultipleUsersArgs = {
  uids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteRoleArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationMoveComputerAndUpdateOrderArgs = {
  computerGroupUid?: InputMaybe<Scalars['String']['input']>;
  newOrder: Scalars['Int']['input'];
  whichComputer: WhereUniqueComputerInput;
};


export type MutationMoveComputersArgs = {
  computers: Array<WhereUniqueComputerInput>;
  fromGroup: WhereUniqueComputerGroupInput;
  toGroup: WhereUniqueComputerGroupInput;
};


export type MutationRemoveAssetsArgs = {
  where: Array<WhereUniqueIpxeAssetInput>;
};


export type MutationRemoveComputersFromGroupArgs = {
  computers: Array<WhereUniqueComputerInput>;
  where: WhereUniqueComputerGroupInput;
};


export type MutationUpdateAssetMetadataArgs = {
  data: UpdateIpxeAssetInput;
  where: WhereUniqueIpxeAssetInput;
};


export type MutationUpdateBasicBootStrategyArgs = {
  update: BasicBootStrategyUpdateInput;
  where: WhereUniqueIpxeStrategy;
};


export type MutationUpdateCurrentUserPasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationUpdateResourceIdArgs = {
  resourceId: Scalars['String']['input'];
  where: WhereUniqueIpxeAssetInput;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  updateData: UpdateUserInput;
};

export type Permission = {
  __typename?: 'Permission';
  /** Description of the permission */
  description: Scalars['String']['output'];
  /** Unique identifier and name of the permission */
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  basicBootStrategy: BasicBootStrategy;
  /** Get a single computer */
  computer?: Maybe<Computer>;
  /** Get a single computer group */
  computerGroup?: Maybe<ComputerGroup>;
  /** Get all computer groups */
  computerGroups: Array<ComputerGroup>;
  /** Get all computers */
  computers: Array<Computer>;
  /** Global ipxe strategy */
  globalIpxeStrategy?: Maybe<IpxeStrategy>;
  /** Get all ipxe assets */
  ipxeAssets: Array<IpxeAsset>;
  ipxeStrategies: Array<IpxeStrategy>;
  /** Retrives ipxe strategy templates */
  ipxeStrategyTemplates: Array<IpxeStrategyTemplate>;
  /** Returns the current user */
  me: User;
  /** Get all permissions */
  permissions: Array<Permission>;
  /** Get a single role */
  role?: Maybe<Role>;
  /** Get all roles */
  roles: Array<Role>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryBasicBootStrategyArgs = {
  where: WhereUniqueIpxeStrategy;
};


export type QueryComputerArgs = {
  where: WhereUniqueComputerInput;
};


export type QueryComputerGroupArgs = {
  where: WhereUniqueComputerGroupInput;
};


export type QueryComputersArgs = {
  standalone?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryRoleArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type Role = {
  __typename?: 'Role';
  /** Role description */
  description: Scalars['String']['output'];
  /** Number of members of a given role */
  memberCount: Scalars['Int']['output'];
  /** Members of a given role */
  members: Array<User>;
  /** Role name */
  name: Scalars['String']['output'];
  /** Role permissions */
  permissions: Array<AssignedPermission>;
  /** Number of permissions assigned to a given role */
  permissionsCount: Scalars['Int']['output'];
  /** Role unique identifier */
  uid: Scalars['ID']['output'];
};

export type UpdateIpxeAssetInput = {
  /** Original filename of the asset */
  filename?: InputMaybe<Scalars['String']['input']>;
  /** Resource id of an asset */
  resourceId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  /** Type of the user account */
  accountType?: InputMaybe<AccountType>;
  /** New email address of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Nickname for the user */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Type of the user account */
  accountType: AccountType;
  /** Email address of the user */
  email: Scalars['String']['output'];
  /** Nickname for the user */
  name?: Maybe<Scalars['String']['output']>;
  /** Assigned permissions */
  permissionSet: Array<Scalars['String']['output']>;
  /** List of permissions assigned to the user */
  permissions: Array<Permission>;
  /** Unique identifier of the user */
  uid: Scalars['ID']['output'];
};

export type WhereUniqueComputerGroupInput = {
  /** Name of the computer group */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Unique ID of the computer group */
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type WhereUniqueComputerInput = {
  ipv4?: InputMaybe<Scalars['String']['input']>;
  mac?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type WhereUniqueIpxeAssetInput = {
  /** Resource id of an asset */
  resourceId?: InputMaybe<Scalars['String']['input']>;
  /** Unique id of an asset */
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type WhereUniqueIpxeStrategy = {
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type WhereUniqueIpxeStrategyNullable = {
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type WhereUniqueIpxeStrategyTemplate = {
  /** Unique id of the ipxe strategy template */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Template name */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType } };

export type BasicBootStrategyCreateMutationVariables = Exact<{
  input: BasicBootStrategyCreateInput;
}>;


export type BasicBootStrategyCreateMutation = { __typename?: 'Mutation', createBasicBootStrategy: { __typename?: 'BasicBootStrategy', uid: string } };

export type BasicBootStrategyUpdateMutationVariables = Exact<{
  strategyUid: Scalars['String']['input'];
  update: BasicBootStrategyUpdateInput;
}>;


export type BasicBootStrategyUpdateMutation = { __typename?: 'Mutation', updateBasicBootStrategy: { __typename?: 'BasicBootStrategy', uid: string } };

export type IpxeStrategyQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type IpxeStrategyQueryQuery = { __typename?: 'Query', ipxeStrategies: Array<{ __typename: 'BasicBootStrategy', uid: string, name: string, description: string, template: { __typename?: 'IpxeStrategyTemplate', id: string, name: string } }> };

export type BasicBootStartegyDefaultValuesQueryVariables = Exact<{
  strategyUid: Scalars['String']['input'];
}>;


export type BasicBootStartegyDefaultValuesQuery = { __typename?: 'Query', basicBootStrategy: { __typename?: 'BasicBootStrategy', uid: string, name: string, description: string, kernelPath: string, initramfsPath: string, kernelParams?: string | null, template: { __typename?: 'IpxeStrategyTemplate', id: string } } };

export type StrategyDataQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type StrategyDataQueryQuery = { __typename?: 'Query', ipxeStrategyTemplates: Array<{ __typename?: 'IpxeStrategyTemplate', id: string, name: string }>, ipxeAssets: Array<{ __typename?: 'IpxeAsset', uid: string, resourceId: string }> };

export type StrategyNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type StrategyNamesQuery = { __typename?: 'Query', ipxeStrategies: Array<{ __typename: 'BasicBootStrategy', uid: string, name: string }> };

export type DeleteStrategyMutationVariables = Exact<{
  strategyUid: Scalars['String']['input'];
}>;


export type DeleteStrategyMutation = { __typename?: 'Mutation', deleteIpxeStrategy: { __typename: 'BasicBootStrategy' } };

export type IpxeTemplatesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type IpxeTemplatesQueryQuery = { __typename?: 'Query', ipxeStrategyTemplates: Array<{ __typename?: 'IpxeStrategyTemplate', id: string, name: string, description: string }> };

export type DeleteAssetsMutationVariables = Exact<{
  where: Array<WhereUniqueIpxeAssetInput> | WhereUniqueIpxeAssetInput;
}>;


export type DeleteAssetsMutation = { __typename?: 'Mutation', removeAssets: number };

export type EditAssetMutationVariables = Exact<{
  where: WhereUniqueIpxeAssetInput;
  data: UpdateIpxeAssetInput;
}>;


export type EditAssetMutation = { __typename?: 'Mutation', updateAssetMetadata: { __typename?: 'IpxeAsset', uid: string, resourceId: string, filename: string } };

export type AllAssetsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAssetsQueryQuery = { __typename?: 'Query', ipxeAssets: Array<{ __typename?: 'IpxeAsset', uid: string, resourceId: string, filename: string, createdAt: any, updatedAt: any, sha256: string, url: string, fileSizeBytes: number }> };

export type UpdateComputerGroupStrategyMutationVariables = Exact<{
  computerGroupUid: Scalars['String']['input'];
  whichStrategy?: InputMaybe<WhereUniqueIpxeStrategyNullable>;
}>;


export type UpdateComputerGroupStrategyMutation = { __typename?: 'Mutation', changeComputerGroupStrategy: { __typename?: 'ComputerGroup', uid: string } };

export type CreateComputerMutationVariables = Exact<{
  data: ComputerCreateInput;
}>;


export type CreateComputerMutation = { __typename?: 'Mutation', createComputer: { __typename?: 'Computer', uid: string, name: string, mac: string } };

export type AddComputerToGroupMutationVariables = Exact<{
  computerUid: Scalars['String']['input'];
  groupUid: Scalars['String']['input'];
}>;


export type AddComputerToGroupMutation = { __typename?: 'Mutation', addComputersToGroup: { __typename?: 'ComputerGroup', uid: string } };

export type DeleteComputerMutationVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type DeleteComputerMutation = { __typename?: 'Mutation', deleteComputers: number };

export type CreateComputerGroupMutationVariables = Exact<{
  data: ComputerGroupCreateInput;
}>;


export type CreateComputerGroupMutation = { __typename?: 'Mutation', createComputerGroup: { __typename?: 'ComputerGroup', uid: string, name: string } };

export type DeleteComputerGroupMutationVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type DeleteComputerGroupMutation = { __typename?: 'Mutation', deleteComputerGroups: number };

export type MoveComputerToGroupAndUpdateOrderMutationVariables = Exact<{
  computerUid: Scalars['String']['input'];
  groupUid?: InputMaybe<Scalars['String']['input']>;
  order: Scalars['Int']['input'];
}>;


export type MoveComputerToGroupAndUpdateOrderMutation = { __typename?: 'Mutation', moveComputerAndUpdateOrder: boolean };

export type QueryComputersWithoutGroupQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryComputersWithoutGroupQuery = { __typename?: 'Query', computers: Array<{ __typename?: 'Computer', uid: string, name: string, mac: string, ipv4?: string | null, viewOptions?: { __typename?: 'ComputerViewOptions', order: number } | null, strategy?: { __typename: 'BasicBootStrategy', uid: string, name: string } | null }> };

export type QueryComputerGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryComputerGroupsQuery = { __typename?: 'Query', computerGroups: Array<{ __typename?: 'ComputerGroup', uid: string, name: string, computers: Array<{ __typename?: 'Computer', uid: string, name: string, mac: string, ipv4?: string | null, viewOptions?: { __typename?: 'ComputerViewOptions', order: number } | null, strategy?: { __typename: 'BasicBootStrategy', uid: string, name: string } | null }>, strategy?: { __typename: 'BasicBootStrategy', uid: string, name: string } | null, viewOptions?: { __typename?: 'ComputerGroupViewOptions', order: number } | null }> };

export type UpdateComputerStrategyMutationVariables = Exact<{
  computerUid: Scalars['String']['input'];
  whichStrategy?: InputMaybe<WhereUniqueIpxeStrategyNullable>;
}>;


export type UpdateComputerStrategyMutation = { __typename?: 'Mutation', changeComputerStrategy: { __typename?: 'Computer', uid: string } };

export type UpdateGlobalStrategyMutationVariables = Exact<{
  whichStrategy?: InputMaybe<WhereUniqueIpxeStrategyNullable>;
}>;


export type UpdateGlobalStrategyMutation = { __typename?: 'Mutation', changeGlobalIpxeStrategy?: { __typename: 'BasicBootStrategy' } | null };

export type GlobalStrategyNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalStrategyNameQuery = { __typename?: 'Query', globalIpxeStrategy?: { __typename: 'BasicBootStrategy', uid: string, name: string } | null };

export type PermissionsSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type PermissionsSummaryQuery = { __typename?: 'Query', allPermissions: Array<{ __typename?: 'Permission', id: string, description: string }>, me: { __typename?: 'User', uid: string, permissions: Array<{ __typename?: 'Permission', id: string, description: string }> } };

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename: 'Role', uid: string } };

export type DeleteMultipleRolesMutationVariables = Exact<{
  uids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteMultipleRolesMutation = { __typename?: 'Mutation', deleteMultipleRoles: number };

export type AssignPermissionsToRoleMutationVariables = Exact<{
  roleUid: Scalars['ID']['input'];
  permissionIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AssignPermissionsToRoleMutation = { __typename?: 'Mutation', assignPermissionsToRole: boolean };

export type AssignUsersToRoleMutationVariables = Exact<{
  roleUid: Scalars['ID']['input'];
  userUids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AssignUsersToRoleMutation = { __typename?: 'Mutation', assignUsersToRole: boolean };

export type QueryRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', uid: string, name: string, description: string, permissionsCount: number, memberCount: number }> };

export type QueryPermissionIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryPermissionIdsQuery = { __typename?: 'Query', permissions: Array<{ __typename?: 'Permission', id: string }> };

export type QueryRolePermissionsQueryVariables = Exact<{
  uid: Scalars['ID']['input'];
}>;


export type QueryRolePermissionsQuery = { __typename?: 'Query', role?: { __typename?: 'Role', uid: string, permissions: Array<{ __typename?: 'AssignedPermission', id: string }> } | null, permissions: Array<{ __typename?: 'Permission', id: string }> };

export type QueryRoleMembersQueryVariables = Exact<{
  uid: Scalars['ID']['input'];
}>;


export type QueryRoleMembersQuery = { __typename?: 'Query', role?: { __typename?: 'Role', uid: string, members: Array<{ __typename?: 'User', uid: string, email: string }> } | null, users: Array<{ __typename?: 'User', uid: string, email: string }> };

export type AdminLoginAsUserMutationVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type AdminLoginAsUserMutation = { __typename?: 'Mutation', adminLoginAsUser: boolean };

export type CreateNewUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateNewUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType } };

export type UpdateUserInfoMutationVariables = Exact<{
  uid: Scalars['ID']['input'];
  input: UpdateUserInput;
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType } };

export type ChangeCurentUserPasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangeCurentUserPasswordMutation = { __typename?: 'Mutation', updateCurrentUserPassword: boolean };

export type AdminChangeUserPasswordMutationVariables = Exact<{
  uid: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type AdminChangeUserPasswordMutation = { __typename?: 'Mutation', adminUpdateUserPassword: boolean };

export type DeleteMultipleUsersMutationVariables = Exact<{
  uids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type DeleteMultipleUsersMutation = { __typename?: 'Mutation', deleteMultipleUsers: boolean };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType }> };

export type ServerClientBridgeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerClientBridgeQueryQuery = { __typename?: 'Query', me: { __typename?: 'User', uid: string, permissionSet: Array<string>, accountType: AccountType } };


export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const BasicBootStrategyCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BasicBootStrategyCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BasicBootStrategyCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBasicBootStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<BasicBootStrategyCreateMutation, BasicBootStrategyCreateMutationVariables>;
export const BasicBootStrategyUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BasicBootStrategyUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"strategyUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BasicBootStrategyUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBasicBootStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"strategyUid"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<BasicBootStrategyUpdateMutation, BasicBootStrategyUpdateMutationVariables>;
export const IpxeStrategyQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IpxeStrategyQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ipxeStrategies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicBootStrategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<IpxeStrategyQueryQuery, IpxeStrategyQueryQueryVariables>;
export const BasicBootStartegyDefaultValuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BasicBootStartegyDefaultValues"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"strategyUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basicBootStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"strategyUid"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"kernelPath"}},{"kind":"Field","name":{"kind":"Name","value":"initramfsPath"}},{"kind":"Field","name":{"kind":"Name","value":"kernelParams"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<BasicBootStartegyDefaultValuesQuery, BasicBootStartegyDefaultValuesQueryVariables>;
export const StrategyDataQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StrategyDataQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ipxeStrategyTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ipxeAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}}]}}]}}]} as unknown as DocumentNode<StrategyDataQueryQuery, StrategyDataQueryQueryVariables>;
export const StrategyNamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StrategyNames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ipxeStrategies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicBootStrategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<StrategyNamesQuery, StrategyNamesQueryVariables>;
export const DeleteStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStrategy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"strategyUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteIpxeStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"strategyUid"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<DeleteStrategyMutation, DeleteStrategyMutationVariables>;
export const IpxeTemplatesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IpxeTemplatesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ipxeStrategyTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<IpxeTemplatesQueryQuery, IpxeTemplatesQueryQueryVariables>;
export const DeleteAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhereUniqueIpxeAssetInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}}]} as unknown as DocumentNode<DeleteAssetsMutation, DeleteAssetsMutationVariables>;
export const EditAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WhereUniqueIpxeAssetInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateIpxeAssetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssetMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}}]}}]} as unknown as DocumentNode<EditAssetMutation, EditAssetMutationVariables>;
export const AllAssetsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllAssetsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ipxeAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sha256"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"fileSizeBytes"}}]}}]}}]} as unknown as DocumentNode<AllAssetsQueryQuery, AllAssetsQueryQueryVariables>;
export const UpdateComputerGroupStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComputerGroupStrategy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"computerGroupUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whichStrategy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"WhereUniqueIpxeStrategyNullable"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeComputerGroupStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"whichComputerGroup"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"computerGroupUid"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"whichStrategy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whichStrategy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<UpdateComputerGroupStrategyMutation, UpdateComputerGroupStrategyMutationVariables>;
export const CreateComputerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComputer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ComputerCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComputer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mac"}}]}}]}}]} as unknown as DocumentNode<CreateComputerMutation, CreateComputerMutationVariables>;
export const AddComputerToGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddComputerToGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"computerUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComputersToGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"computers"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"computerUid"}}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupUid"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<AddComputerToGroupMutation, AddComputerToGroupMutationVariables>;
export const DeleteComputerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComputer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComputers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}]}]}}]}]}}]} as unknown as DocumentNode<DeleteComputerMutation, DeleteComputerMutationVariables>;
export const CreateComputerGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComputerGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ComputerGroupCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComputerGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateComputerGroupMutation, CreateComputerGroupMutationVariables>;
export const DeleteComputerGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComputerGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComputerGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}]}]}}]}]}}]} as unknown as DocumentNode<DeleteComputerGroupMutation, DeleteComputerGroupMutationVariables>;
export const MoveComputerToGroupAndUpdateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveComputerToGroupAndUpdateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"computerUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupUid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveComputerAndUpdateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"whichComputer"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"computerUid"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"computerGroupUid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupUid"}}},{"kind":"Argument","name":{"kind":"Name","value":"newOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}]}]}}]} as unknown as DocumentNode<MoveComputerToGroupAndUpdateOrderMutation, MoveComputerToGroupAndUpdateOrderMutationVariables>;
export const QueryComputersWithoutGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryComputersWithoutGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"computers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"standalone"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mac"}},{"kind":"Field","name":{"kind":"Name","value":"ipv4"}},{"kind":"Field","name":{"kind":"Name","value":"viewOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicBootStrategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QueryComputersWithoutGroupQuery, QueryComputersWithoutGroupQueryVariables>;
export const QueryComputerGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryComputerGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"computerGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"computers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mac"}},{"kind":"Field","name":{"kind":"Name","value":"ipv4"}},{"kind":"Field","name":{"kind":"Name","value":"viewOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicBootStrategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicBootStrategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<QueryComputerGroupsQuery, QueryComputerGroupsQueryVariables>;
export const UpdateComputerStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComputerStrategy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"computerUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whichStrategy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"WhereUniqueIpxeStrategyNullable"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeComputerStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"whichComputer"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"computerUid"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"whichStrategy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whichStrategy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<UpdateComputerStrategyMutation, UpdateComputerStrategyMutationVariables>;
export const UpdateGlobalStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGlobalStrategy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whichStrategy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"WhereUniqueIpxeStrategyNullable"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGlobalIpxeStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"whichStretgy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whichStrategy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<UpdateGlobalStrategyMutation, UpdateGlobalStrategyMutationVariables>;
export const GlobalStrategyNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GlobalStrategyName"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"globalIpxeStrategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicBootStrategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GlobalStrategyNameQuery, GlobalStrategyNameQueryVariables>;
export const PermissionsSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PermissionsSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"allPermissions"},"name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<PermissionsSummaryQuery, PermissionsSummaryQueryVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const DeleteMultipleRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMultipleRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMultipleRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uids"}}}]}]}}]} as unknown as DocumentNode<DeleteMultipleRolesMutation, DeleteMultipleRolesMutationVariables>;
export const AssignPermissionsToRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignPermissionsToRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permissionIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignPermissionsToRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleUid"}}},{"kind":"Argument","name":{"kind":"Name","value":"permissionIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permissionIds"}}}]}]}}]} as unknown as DocumentNode<AssignPermissionsToRoleMutation, AssignPermissionsToRoleMutationVariables>;
export const AssignUsersToRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignUsersToRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userUids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignUsersToRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleUid"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userUids"}}}]}]}}]} as unknown as DocumentNode<AssignUsersToRoleMutation, AssignUsersToRoleMutationVariables>;
export const QueryRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"permissionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"memberCount"}}]}}]}}]} as unknown as DocumentNode<QueryRolesQuery, QueryRolesQueryVariables>;
export const QueryPermissionIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryPermissionIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<QueryPermissionIdsQuery, QueryPermissionIdsQueryVariables>;
export const QueryRolePermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryRolePermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<QueryRolePermissionsQuery, QueryRolePermissionsQueryVariables>;
export const QueryRoleMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryRoleMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<QueryRoleMembersQuery, QueryRoleMembersQueryVariables>;
export const AdminLoginAsUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminLoginAsUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLoginAsUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}]}]}}]} as unknown as DocumentNode<AdminLoginAsUserMutation, AdminLoginAsUserMutationVariables>;
export const CreateNewUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<CreateNewUserMutation, CreateNewUserMutationVariables>;
export const UpdateUserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const ChangeCurentUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeCurentUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"currentPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<ChangeCurentUserPasswordMutation, ChangeCurentUserPasswordMutationVariables>;
export const AdminChangeUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminChangeUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUpdateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<AdminChangeUserPasswordMutation, AdminChangeUserPasswordMutationVariables>;
export const DeleteMultipleUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMultipleUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMultipleUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uids"}}}]}]}}]} as unknown as DocumentNode<DeleteMultipleUsersMutation, DeleteMultipleUsersMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const ServerClientBridgeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ServerClientBridgeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"permissionSet"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<ServerClientBridgeQueryQuery, ServerClientBridgeQueryQueryVariables>;