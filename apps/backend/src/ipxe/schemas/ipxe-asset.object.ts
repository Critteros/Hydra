import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class IpxeAsset {
  @Field(() => ID, { description: 'Asset ID' })
  id!: string;

  @Field({ description: 'Original filename of the asset' })
  filename!: string;

  @Field({ description: 'Creation date of the asset' })
  createdAt!: Date;

  @Field({ description: 'Last update date of the asset' })
  updatedAt!: Date;

  @Field({ description: 'SHA256 hash of the asset' })
  sha256!: string;

  @Field({ description: 'URL of the asset' })
  url!: string;

  @Field(() => Int, { description: 'MIME type of the asset' })
  fileSizeBytes!: number;
}
