#! /usr/bin/env node
import { Logger } from '@nestjs/common';

import { CommandFactory } from 'nest-commander';
import * as process from 'process';

import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, process.env.DEBUG ? new Logger() : undefined);
}

void bootstrap();
