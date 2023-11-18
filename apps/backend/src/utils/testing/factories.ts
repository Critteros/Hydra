import { faker } from '@faker-js/faker';
import { AccountType, type Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

import { PrismaCtx } from '../prisma/types';

export async function userFactory(
  prisma: PrismaCtx,
  { email, password, accountType, ...other }: Partial<Prisma.UserCreateInput>,
) {
  const originalPassword = password ?? faker.internet.password();
  const hashedPaassword = await bcrypt.hash(originalPassword, 10);

  return {
    ...(await prisma.user.create({
      data: {
        email: email ?? faker.internet.email(),
        password: hashedPaassword,
        accountType: accountType ?? AccountType.STANDARD,
        ...other,
      },
    })),
    password: originalPassword,
  };
}
