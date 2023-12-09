import type { IPXEStrategy } from '@hydra-ipxe/common/shared/ipxe/strategies.def';
import type { PrismaClient } from '@prisma/client';

import { strategyTemplates } from '@/ipxe/boot/strategy-templates.constant';

export async function run(client: PrismaClient) {
  const strategyTemplatesIds = Object.keys(strategyTemplates) as IPXEStrategy[];

  const objects = Object.entries(strategyTemplates).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  // 1) Delete entries that are not part of an config
  // 2) Upsert entries from the config
  await client.$transaction([
    client.ipxeStrategyTemplate.deleteMany({
      where: {
        id: {
          notIn: strategyTemplatesIds,
        },
      },
    }),
    ...objects.map((object) =>
      client.ipxeStrategyTemplate.upsert({
        where: { id: object.id },
        create: object,
        update: { description: object.description, name: object.name },
      }),
    ),
  ]);
}
