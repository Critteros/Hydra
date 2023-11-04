import type { PrismaClient, Permission } from '@prisma/client';

import { permissionConfig } from '@/rbac/permissions';

export async function run(client: PrismaClient) {
  const permissionsIds = Object.keys(permissionConfig);

  const objects = Object.entries(permissionConfig).map(
    ([key, value]) =>
      ({
        id: key,
        ...value,
      }) as Permission,
  );

  await client.$transaction([
    client.permission.deleteMany({
      where: {
        id: {
          in: permissionsIds,
        },
      },
    }),
    client.permission.createMany({
      data: objects,
    }),
  ]);
}
