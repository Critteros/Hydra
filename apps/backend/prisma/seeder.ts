import { exit } from 'node:process';

import { PrismaClient } from '@prisma/client';

import { seed } from './seed/main';

async function main() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  try {
    await seed(prisma);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void main();
