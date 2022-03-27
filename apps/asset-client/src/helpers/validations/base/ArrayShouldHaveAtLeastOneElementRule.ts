export function arrayShouldHaveAtLeastOneElementRule<TEntity>(
  key: keyof TEntity,
  message: string = undefined
) {
  return (entity: TEntity): string => {
    let errorMessage = message;
    if (!errorMessage) {
      errorMessage = 'At least one element must be selected.';
    }

    const propertyValue = entity[key] as unknown as Array<any>;
    if (propertyValue.length === 0) {
      return errorMessage;
    }

    return undefined;
  };
}
