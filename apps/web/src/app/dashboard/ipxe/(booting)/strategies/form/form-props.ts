import type { IpxeAsset } from '$gql/types';

export type FormProps = {
  afterSubmit?: VoidFunction;
};

export type FormWithBasicBootInfo = {
  assetPaths: Array<IpxeAsset['resourceId']>;
};
