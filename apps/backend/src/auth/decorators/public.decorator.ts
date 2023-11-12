import { Reflector } from '@nestjs/core';

/** Decorator to mark a handler as public */
export const PublicHandler = Reflector.createDecorator<boolean>();
