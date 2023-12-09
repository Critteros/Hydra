import { PrismaClient } from '@prisma/client';

import { run as seedPermissions } from './permissions.seed';
import { run as seedIpxeTemplates } from './strategyTemplates.seed';

export async function seed(prisma: PrismaClient) {
  await seedPermissions(prisma);
  await seedIpxeTemplates(prisma);
}
