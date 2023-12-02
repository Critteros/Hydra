import type { NestApplicationContext } from '@nestjs/core';

import { faker } from '@faker-js/faker';
import { Permissions } from '@hydra-ipxe/common/shared/permissions';
import { AccountType, type Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

import { PrismaService } from '@/database/prisma.service';

export async function userFactory(
  app: NestApplicationContext,
  { email, password, accountType, ...other }: Partial<Prisma.UserCreateInput>,
  permissions?: Permissions[],
) {
  const prisma = app.get(PrismaService);
  const originalPassword = password ?? faker.internet.password();
  const hashedPaassword = await bcrypt.hash(originalPassword, 10);

  const user = {
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

  if (permissions) {
    const role = await rolesFactory(
      app,
      { name: faker.person.jobTitle(), description: 'Default role for testing' },
      permissions,
    );
    await prisma.rolesOnUser.create({
      data: {
        roleUid: role.uid,
        userUid: user.uid,
      },
    });
  }

  return user;
}

export async function rolesFactory(
  app: NestApplicationContext,
  { name, description, ...other }: Partial<Prisma.RoleCreateInput> = {},
  permissions?: Permissions[],
) {
  const prisma = app.get(PrismaService);

  const role = await prisma.role.create({
    data: {
      name: name ?? faker.person.jobTitle(),
      description: description ?? faker.lorem.sentence(),
      ...other,
    },
  });

  if (permissions) {
    const permissionsCreate = permissions.map(
      (permission) =>
        ({
          permissionId: permission,
          roleUid: role.uid,
        }) satisfies Prisma.PermissionsOnRolesCreateManyInput,
    );
    await prisma.permissionsOnRoles.createMany({
      data: permissionsCreate,
    });
  }

  return role;
}
