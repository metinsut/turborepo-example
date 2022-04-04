import i18n from 'utils/i18n';

type Parameters = {
  fieldName?: string;
};

export function propertyShouldBeGreaterThanZeroRule<TEntity>(
  key: keyof TEntity,
  params: Parameters
) {
  const { fieldName } = params;

  return (entity: TEntity): string => {
    const field = fieldName ? i18n.t(fieldName) : i18n.t('common.generic_field_name');
    let errorMessage = fieldName;
    if (!errorMessage) {
      errorMessage = i18n.t('errors.field_required', { field });
    }

    const propertyValue = entity[key] as unknown as number;
    if (!propertyValue || propertyValue <= 0) {
      errorMessage = i18n.t('errors.greater_than_zero_error', { field });

      return errorMessage;
    }

    return undefined;
  };
}
