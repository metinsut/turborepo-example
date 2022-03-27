import { CatCheckbox, CatMenuItem, CatSelect } from 'catamaran/core';
import { ListItemText, SelectProps } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export type MultiSelectorProps<T> = Omit<SelectProps, 'onChange'> & {
  className?: string;
  disabledIds?: string[];
  displayProp: keyof T & string;
  items: T[];
  label?: string;
  onChange?: (ids: string[]) => void;
  primaryKey: keyof T & string;
  renderValueString?: string;
  selectedIds?: string[];
};

function MultiSelector<T>(props: MultiSelectorProps<T>) {
  const {
    className,
    disabledIds = [],
    displayProp,
    items,
    label,
    onChange,
    primaryKey,
    renderValueString,
    selectedIds,
    ...rest
  } = props;

  const { t } = useTranslation();

  const getRenderValue = (value: string[]) => {
    const values = value as string[];
    return values.length > 0 && t(renderValueString, { count: values.length });
  };

  const handleChange = (event: any) => {
    const newValues = event.target.value as string[];
    onChange(newValues);
  };

  return (
    <CatSelect
      className={clsx('w-full', className)}
      displayEmpty
      fullWidth
      label={label}
      multiple
      onChange={handleChange}
      renderValue={(value) => getRenderValue(value as string[])}
      value={selectedIds}
      {...rest}
    >
      <CatMenuItem disabled key="" value="">
        {t('common.dropdown_generic_hint')}
      </CatMenuItem>
      {items.map((item) => {
        const primaryKeyValue = `${item[primaryKey]}`;
        const displayedValue = `${item[displayProp]}`;
        const disabled = disabledIds.includes(primaryKeyValue);

        return (
          <CatMenuItem disabled={disabled} key={primaryKeyValue} value={primaryKeyValue}>
            <CatCheckbox
              checked={selectedIds.includes(primaryKeyValue)}
              disabled={disabled}
              style={{ marginRight: '12px' }}
            />
            <ListItemText primary={displayedValue} />
          </CatMenuItem>
        );
      })}
    </CatSelect>
  );
}

export default MultiSelector;
