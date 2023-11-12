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

export type Mutation = {
  __typename?: 'Mutation';
  /** Login as a user */
  adminLoginAsUser: Scalars['Boolean']['output'];
  /** Admin updates user password */
  adminUpdateUserPassword: Scalars['Boolean']['output'];
  /** Assign permissions to a role */
  assignPermissionsToRole: Scalars['Boolean']['output'];
  /** Assign users to a role */
  assignUsersToRole: Scalars['Boolean']['output'];
  /** Create a new role */
  createRole: Role;
  /** Creates a new user */
  createUser: User;
  /** Delete many roles */
  deleteMultipleRoles: Scalars['Int']['output'];
  /** Delete multiple users */
  deleteMultipleUsers: Scalars['Boolean']['output'];
  /** Delete a role */
  deleteRole: Scalars['Boolean']['output'];
  /** Updates current user password */
  updateCurrentUserPassword: Scalars['Boolean']['output'];
  /** Updates user data */
  updateUser: User;
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


export type MutationCreateRoleArgs = {
  data: CreateRoleInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
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


export type MutationUpdateCurrentUserPasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
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

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType } };

export type AllPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPermissionsQuery = { __typename?: 'Query', permissions: Array<{ __typename?: 'Permission', id: string, description: string }> };

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename: 'Role' } };

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


export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const AllPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AllPermissionsQuery, AllPermissionsQueryVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
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