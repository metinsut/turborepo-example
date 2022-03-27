type ValidatorProperty<TEntity> = (values: TEntity) => string;

export type ValidatorRules<TEntity> = Partial<Record<keyof TEntity, ValidatorProperty<TEntity>>>;

export type ValidationError<TEntity> = Partial<Record<keyof TEntity, string>>;

export type Validator<TEntity> = (
  values: TEntity,
  ...fields: (keyof TEntity)[]
) => ValidationError<TEntity>;
