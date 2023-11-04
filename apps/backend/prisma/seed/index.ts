import { exit } from 'node:process';

import { PrismaClient } from '@prisma/client';

import { run as seedPermissions } from './permissions';

async function main() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  try {
    await seedPermissions(prisma);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void main();
