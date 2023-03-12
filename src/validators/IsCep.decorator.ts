import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCep(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCep',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: propertyName + ' must be a valid CEP',
        ...validationOptions,
      },
      validator: {
        validate: (value: any) =>
          typeof value === 'string' && /^\d{5}\-\d{3}$/.test(value),
      },
    });
  };
}
