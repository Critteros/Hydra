import { registerEnumType } from '@nestjs/graphql';

import { AccountType } from '@prisma/client';

registerEnumType(AccountType, {
  name: 'AccountType',
  description: 'Type of the user account',
});

export { AccountType };
