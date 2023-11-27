import {
  type ValidationArguments,
  type ValidatorConstraintInterface,
  type ValidationOptions,
  ValidatorConstraint,
  ValidationTypes,
  registerDecorator,
} from 'class-validator';

const key = Symbol('IsAtLeastOnePropertyDefined');

@ValidatorConstraint({ name: 'IsAtLeaseOnePropertyDefined', async: false })
export class IsAtLeaseOnePropertyDefinedConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    const validationObject = args.object as Record<string, unknown>;
    const properties = Reflect.getMetadata(key, validationObject) as string[];

    return properties.some((property) => validationObject[property]);
  }

  defaultMessage(validationArguments?: ValidationArguments | undefined): string {
    const validationObject = validationArguments?.object as Record<string, unknown>;
    const properties = Reflect.getMetadata(key, validationObject) as string[];
    const property = validationArguments?.property;

    if (property) {
      return `${property} is required when ${properties.join(', ')} ${
        properties.length > 1 ? 'are' : 'is'
      } undefined`;
    }

    return `At least one of the following properties must be defined: ${properties.join(', ')}`;
  }
}

export function IsAtLeaseOnePropertyDefined(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    const existing = (Reflect.getMetadata(key, object) as string[]) ?? [];
    Reflect.defineMetadata(key, [...existing, propertyName], object);

    // This decorator is used to disable validation on a given field if it is undefined or null
    // IsOptional decorator cannot be used as it will also disable IsAtLeaseOnePropertyDefined validation
    // which in turn would allow empty objects to be validated incorrectly
    registerDecorator({
      name: ValidationTypes.CONDITIONAL_VALIDATION,
      propertyName,
      target: object.constructor,
      constraints: [
        (object: Record<string, unknown>, value: unknown): boolean => {
          // We want to disable validation only if the value is null or undefined
          // AND if at least one of the properties is defined
          // This function returns true if the validation should proceed
          const properties = Reflect.getMetadata(key, object) as string[];
          const somePropertyIsDefined = properties.some((property) => object[property]);

          const valueIsNullOrUndefined = value === null || value === undefined;

          // !(A && B) === !A || !B
          return !valueIsNullOrUndefined || !somePropertyIsDefined;
        },
      ],
      // For conditional validator the validator function will never be called
      // it's still requied in the type unfortunately
      validator: () => {},
    });

    // This is the actual validator that is being used
    // It checks if at least one of the properties is defined
    registerDecorator({
      name: 'IsAtLeaseOnePropertyDefined',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      async: false,
      validator: IsAtLeaseOnePropertyDefinedConstraint,
    });
  };
}
