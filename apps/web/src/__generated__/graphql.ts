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
};

/** Type of the user account */
export enum AccountType {
  Admin = 'ADMIN',
  Standard = 'STANDARD'
}

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
  /** Creates a new user */
  createUser: User;
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


export type MutationCreateUserArgs = {
  userData: CreateUserInput;
};


export type MutationUpdateCurrentUserPasswordArgs = {
  data: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  userData: UserUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  /** Returns the current user */
  me: User;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
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

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType } };

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

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', uid: string, email: string, name?: string | null, accountType: AccountType }> };


export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const UpdateUserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const ChangeCurentUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeCurentUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<ChangeCurentUserPasswordMutation, ChangeCurentUserPasswordMutationVariables>;
export const AdminChangeUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminChangeUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUpdateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<AdminChangeUserPasswordMutation, AdminChangeUserPasswordMutationVariables>;
export const AdminLoginAsUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminLoginAsUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLoginAsUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}]}]}}]} as unknown as DocumentNode<AdminLoginAsUserMutation, AdminLoginAsUserMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;