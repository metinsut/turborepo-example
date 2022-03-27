export function doNotValidatePropertyRule<TEntity>(_key: keyof TEntity) {
  return (_entity: TEntity): string => undefined;
}
