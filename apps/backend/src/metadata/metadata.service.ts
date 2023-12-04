import { Injectable, type ExecutionContext } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { Reflector, type ReflectableDecorator } from '@nestjs/core';

import { mergeArrayWithPriority } from '@hydra-ipxe/common/shared/object-utils';
import type { Constructor } from 'type-fest';

type ElementOrArrayElement<T> = T extends (infer ElementType)[] ? ElementType : T;

@Injectable()
export class MetadataService {
  constructor(private readonly reflector: Reflector) {}

  getDecoratorMetadata<TParam, TTrasnformed = TParam>({
    context,
    decorator,
    selector = (metdata) => metdata,
    priority = 'handler',
  }: {
    context: ExecutionContext;
    decorator: ReflectableDecorator<TParam, TTrasnformed>;
    selector?: (metadata: ElementOrArrayElement<TTrasnformed>) => unknown;
    priority?: 'class' | 'handler';
  }): TTrasnformed | undefined {
    const handlerMetadata = this.reflector.get(decorator, context.getHandler()) as
      | TTrasnformed
      | undefined;
    const classMetadata = this.reflector.get(decorator, context.getClass()) as
      | TTrasnformed
      | undefined;

    const arrayMode = Array.isArray(handlerMetadata) || Array.isArray(classMetadata);

    if (!arrayMode) {
      if (priority === 'handler') {
        return handlerMetadata !== undefined ? handlerMetadata : classMetadata;
      }
      if (priority === 'class') {
        return classMetadata !== undefined ? classMetadata : handlerMetadata;
      }
    }

    const handlerMetadataList = Array.isArray(handlerMetadata) ? handlerMetadata : [];
    const classMetadataList = Array.isArray(classMetadata) ? classMetadata : [];

    const priorityList = priority === 'handler' ? handlerMetadataList : classMetadataList;
    const fallbackList = priority === 'handler' ? classMetadataList : handlerMetadataList;

    return mergeArrayWithPriority({
      array: fallbackList ?? [],
      priorityArray: priorityList ?? [],
      selector,
    }) as TTrasnformed;
  }

  reverseControllerPath<T>(controller: Constructor<T>, methodName: keyof T) {
    // TODO: Move api prefix to constants and read it from config
    let routePath = ('api/' + Reflect.getMetadata(PATH_METADATA, controller)) as string | undefined;
    if (!routePath) {
      return;
    }
    // eslint-disable-next-line
    routePath += '/' + Reflect.getMetadata(PATH_METADATA, controller.prototype[methodName]);
    return routePath;
  }
}
