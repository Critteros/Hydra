import { Injectable, type ExecutionContext } from '@nestjs/common';
import { Reflector, type ReflectableDecorator } from '@nestjs/core';

import { mergeArrayWithPriority } from '@hydra-ipxe/common/shared/object-utils';

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
}
