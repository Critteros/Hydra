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
  id: Scalars['String']['output'];
};

export type CreateRoleInput = {
  /** Role description */
  description: Scalars['String']['input'];
  /** Role name */
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** Type of the user account */
  accountType?: InputMaybe<AccountType>;
  /** Email address of the user */
  email: Scalars['String']['input'];
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
  /** Creates a new user */
  createNewUser: User;
  /** Create a new role */
  createRole: Role;
  /** Delete many roles */
  deleteMultipleRoles: Scalars['Int']['output'];
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
  password: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};


export type MutationAssignPermissionsToRoleArgs = {
  permissionIds: Array<Scalars['String']['input']>;
  roleUid: Scalars['String']['input'];
};


export type MutationAssignUsersToRoleArgs = {
  roleUid: Scalars['String']['input'];
  usersUids: Array<Scalars['String']['input']>;
};


export type MutationCreateNewUserArgs = {
  userData: CreateUserInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationDeleteMultipleRolesArgs = {
  uids: Array<Scalars['String']['input']>;
};


export type MutationDeleteRoleArgs = {
  uid: Scalars['String']['input'];
};


export type MutationUpdateCurrentUserPasswordArgs = {
  data: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  userData: UserUpdateInput;
};

export type Permission = {
  __typename?: 'Permission';
  /** Description of the permission */
  description: Scalars['String']['output'];
  /** Unique identifier and name of the permission */
  id: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns the current user */
  me: User;
  /** Get all permissions */
  permissions: Array<Permission>;
  /** Get a single role */
  role: Role;
  /** Get all roles */
  roles: Array<Role>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryRoleArgs = {
  uid: Scalars['String']['input'];
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type Role = {
  __typename?: 'Role';
  /** Role description */
  description: Scalars['String']['output'];
  /** Members of a given role */
  members: Array<User>;
  /** Number of members of a given role */
  membersCount: Scalars['Int']['output'];
  /** Role name */
  name: Scalars['String']['output'];
  /** Role permissions */
  permissions: Array<AssignedPermission>;
  /** Number of permissions assigned to a given role */
  permissionsCount: Scalars['Int']['output'];
  /** Role unique identifier */
  uid: Scalars['String']['output'];
};

export type UpdatePasswordInput = {
  /** Current password */
  currentPassword: Scalars['String']['input'];
  /** New password */
  newPassword: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  /** Type of the user account */
  accountType: AccountType;
  /** Email address of the user */
  email: Scalars['String']['output'];
  /** Nickname for the user */
  name?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the user */
  uid: Scalars['ID']['output'];
};

export type UserUpdateInput = {
  /** Type of the user account */
  accountType?: InputMaybe<AccountType>;
  /** Email address of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Nickname for the user */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier of the user */
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type AllPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPermissionsQuery = { __typename?: 'Query', permissions: Array<{ __typename?: 'Permission', id: string, description: string }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType } };

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename: 'Role' } };

export type DeleteMultipleRolesMutationVariables = Exact<{
  uids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteMultipleRolesMutation = { __typename?: 'Mutation', deleteMultipleRoles: number };

export type AssignPermissionsToRoleMutationVariables = Exact<{
  roleUid: Scalars['String']['input'];
  permissionIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AssignPermissionsToRoleMutation = { __typename?: 'Mutation', assignPermissionsToRole: boolean };

export type AssignUsersToRoleMutationVariables = Exact<{
  roleUid: Scalars['String']['input'];
  usersUids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AssignUsersToRoleMutation = { __typename?: 'Mutation', assignUsersToRole: boolean };

export type QueryRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', uid: string, name: string, description: string, permissionsCount: number, membersCount: number }> };

export type QueryPermissionIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryPermissionIdsQuery = { __typename?: 'Query', permissions: Array<{ __typename?: 'Permission', id: string }> };

export type QueryRolePermissionsQueryVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type QueryRolePermissionsQuery = { __typename?: 'Query', role: { __typename?: 'Role', uid: string, permissions: Array<{ __typename?: 'AssignedPermission', id: string }> }, permissions: Array<{ __typename?: 'Permission', id: string }> };

export type QueryRoleMembersQueryVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type QueryRoleMembersQuery = { __typename?: 'Query', role: { __typename?: 'Role', uid: string, members: Array<{ __typename?: 'User', uid: string, email: string }> }, users: Array<{ __typename?: 'User', uid: string, email: string }> };

export type UpdateUserInfoMutationVariables = Exact<{
  userData: UserUpdateInput;
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType } };

export type ChangeCurentUserPasswordMutationVariables = Exact<{
  data: UpdatePasswordInput;
}>;


export type ChangeCurentUserPasswordMutation = { __typename?: 'Mutation', updateCurrentUserPassword: boolean };

export type AdminChangeUserPasswordMutationVariables = Exact<{
  uid: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type AdminChangeUserPasswordMutation = { __typename?: 'Mutation', adminUpdateUserPassword: boolean };

export type AdminLoginAsUserMutationVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type AdminLoginAsUserMutation = { __typename?: 'Mutation', adminLoginAsUser: boolean };

export type CreateNewUserMutationVariables = Exact<{
  userData: CreateUserInput;
}>;


export type CreateNewUserMutation = { __typename?: 'Mutation', createNewUser: { __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType }> };


export const AllPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AllPermissionsQuery, AllPermissionsQueryVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const DeleteMultipleRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMultipleRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMultipleRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uids"}}}]}]}}]} as unknown as DocumentNode<DeleteMultipleRolesMutation, DeleteMultipleRolesMutationVariables>;
export const AssignPermissionsToRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignPermissionsToRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permissionIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignPermissionsToRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roleUid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleUid"}}},{"kind":"Argument","name":{"kind":"Name","value":"permissionIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permissionIds"}}}]}]}}]} as unknown as DocumentNode<AssignPermissionsToRoleMutation, AssignPermissionsToRoleMutationVariables>;
export const AssignUsersToRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignUsersToRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleUid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usersUids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignUsersToRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roleUid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleUid"}}},{"kind":"Argument","name":{"kind":"Name","value":"usersUids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usersUids"}}}]}]}}]} as unknown as DocumentNode<AssignUsersToRoleMutation, AssignUsersToRoleMutationVariables>;
export const QueryRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"permissionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"membersCount"}}]}}]}}]} as unknown as DocumentNode<QueryRolesQuery, QueryRolesQueryVariables>;
export const QueryPermissionIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryPermissionIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<QueryPermissionIdsQuery, QueryPermissionIdsQueryVariables>;
export const QueryRolePermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryRolePermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<QueryRolePermissionsQuery, QueryRolePermissionsQueryVariables>;
export const QueryRoleMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryRoleMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<QueryRoleMembersQuery, QueryRoleMembersQueryVariables>;
export const UpdateUserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const ChangeCurentUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeCurentUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<ChangeCurentUserPasswordMutation, ChangeCurentUserPasswordMutationVariables>;
export const AdminChangeUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminChangeUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUpdateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<AdminChangeUserPasswordMutation, AdminChangeUserPasswordMutationVariables>;
export const AdminLoginAsUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminLoginAsUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLoginAsUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}]}]}}]} as unknown as DocumentNode<AdminLoginAsUserMutation, AdminLoginAsUserMutationVariables>;
export const CreateNewUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNewUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<CreateNewUserMutation, CreateNewUserMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;