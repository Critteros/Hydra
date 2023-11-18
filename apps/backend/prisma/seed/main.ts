import { PrismaClient } from '@prisma/client';

import { run as seedPermissions } from './permissions.seed';

export async function seed(prisma: PrismaClient) {
  await seedPermissions(prisma);
}
