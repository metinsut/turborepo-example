import { trimmyValidator } from './TrimmyValidator';

type Parameters = {
  allowWhitespaces?: boolean;
};

export function propertyCanNotBeNullRule<TEntity>(
  key: keyof TEntity,
  message: string = undefined,
  params: Parameters = {}
) {
  const { allowWhitespaces = true } = params;

  return (entity: TEntity): string => {
    let errorMessage = message;
    if (!errorMessage) {
      errorMessage = 'Field is required.';
    }

    if (!allowWhitespaces) {
      const trimError = trimmyValidator(key)(entity);
      if (trimError) {
        return trimError;
      }
    }

    const propertyValue = entity[key] as unknown as string;
    if (!propertyValue || !propertyValue.trim()) {
      return errorMessage;
    }

    return undefined;
  };
}
