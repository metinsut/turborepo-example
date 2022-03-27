import i18n from 'utils/i18n';

export function trimmyValidator<TEntity>(key: keyof TEntity) {
  return (entity: TEntity): string => {
    const propertyValue = entity[key]?.toString();
    if (propertyValue) {
      if (propertyValue !== propertyValue.trimStart()) {
        return i18n.t('errors.no_leading_whitespace');
      }
      if (propertyValue !== propertyValue.trimEnd()) {
        return i18n.t('errors.no_trailing_whitespace');
      }
    }

    return undefined;
  };
}
