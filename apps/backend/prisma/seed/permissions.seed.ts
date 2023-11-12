import type { PrismaClient, Permission } from '@prisma/client';

import { permissionConfig } from '@/rbac/constants/permissions.constant';

export async function run(client: PrismaClient) {
  const permissionsIds = Object.keys(permissionConfig);

  const objects = Object.entries(permissionConfig).map(
    ([key, value]) =>
      ({
        id: key,
        ...value,
      }) as Permission,
  );

  // 1) Delete permissions that are not in the config
  // 2) Upsert permissions from the config
  await client.$transaction([
    client.permission.deleteMany({
      where: {
        id: {
          notIn: permissionsIds,
        },
      },
    }),
    ...objects.map((object) =>
      client.permission.upsert({
        where: { id: object.id },
        create: object,
        update: { description: object.description },
      }),
    ),
  ]);
}
