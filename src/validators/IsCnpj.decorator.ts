import { registerDecorator, ValidationOptions } from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: propertyName + ' must be a valid CNPJ',
        ...validationOptions,
      },
      validator: {
        validate: (value: any) =>
          typeof value === 'string' && cnpj.isValid(value),
      },
    });
  };
}
