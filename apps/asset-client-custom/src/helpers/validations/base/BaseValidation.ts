import { ValidationError, ValidatorRules } from '../types';

export function createValidator<TEntity>(validator: ValidatorRules<TEntity>) {
  return (values: TEntity, ...fields: (keyof TEntity)[]) => {
    const errors: ValidationError<TEntity> = {};
    if (fields.length > 0) {
      // Validate specific rules / fields
      fields.forEach((field) => {
        if (validator[field]) {
          errors[field] = validator[field](values);
        }
      });
    } else {
      // Validate all rules / fields
      Object.keys(validator).forEach((key) => {
        const typedKey = key as keyof TEntity;
        errors[typedKey] = validator[typedKey](values);
      });
    }

    return errors;
  };
}
