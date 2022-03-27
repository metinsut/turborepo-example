import {
  Box,
  CatDatePicker,
  CatIconButton,
  CatMenuItem,
  CatSelect,
  CatTypography
} from 'catamaran/core';
import { DateFilterType, RelationType, dateFilterValues, dateFilterValuesWithBlank } from './types';
import { Trans, useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'react-use';
import { useEffect, useMemo } from 'react';
import { useFormState, withFormHelper } from 'hooks';
import DateFilterIcons from 'components/DateFilter/DateFilterIcons';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import dateFilterValidator from 'helpers/validations/DateFilterValidator';

const CatDatePickerWithFormHelper = withFormHelper(CatDatePicker);

const validateDateFilter = (dateFilter: DateFilterType) => {
  switch (dateFilter.type) {
    case 'any':
    case 'blank':
      return true;
    case 'equal':
    case 'lessThan':
    case 'greaterThan':
      if (Date.parse(dateFilter.from)) {
        return true;
      }
      return false;
    case 'between':
      if (Date.parse(dateFilter.from) && Date.parse(dateFilter.to)) {
        return true;
      }
      return false;

    default:
      return false;
  }
};

type Props = {
  className?: string;
  disabled?: boolean;
  includeBlank?: boolean;
  onChange: (dateFilter: DateFilterType) => void;
  dateFilter: DateFilterType;
  title: string;
};

const DateFilter = (props: Props) => {
  const { className, disabled = false, includeBlank = false, onChange, title, dateFilter } = props;

  const { t } = useTranslation();

  const finalFilterValues = includeBlank ? dateFilterValuesWithBlank : dateFilterValues;

  const formHelper = useFormState(dateFilter, dateFilterValidator);
  const localDateFilter = formHelper.formState.values;
  const setLocalDateFilter = formHelper.setFormState;

  const handleLocalFilterChange = (filter: DateFilterType) => {
    setLocalDateFilter(filter);
    if (validateDateFilter(filter)) {
      onChange(filter);
    }
  };

  useEffect(() => {
    if (validateDateFilter(localDateFilter)) {
      onChange(localDateFilter);
    }
  }, [localDateFilter, onChange]);

  const handleFilterTypeChange = (event: any) => {
    const type = event.target.value as RelationType;
    const { from, to } = localDateFilter;
    const filter = { from, to, type };
    if (type === 'any' || type === 'blank') {
      delete filter.from;
      delete filter.to;
    } else if (type === 'equal' || type === 'lessThan' || type === 'greaterThan') {
      delete filter.to;
    }
    setLocalDateFilter(filter);
  };

  const handleClearFromDate = () => {
    const filter = { type: localDateFilter.type };
    handleLocalFilterChange(filter);
  };

  const handleClearToDate = () => {
    const filter = { from: localDateFilter.from, type: localDateFilter.type };
    handleLocalFilterChange(filter);
  };

  useDeepCompareEffect(() => {
    setLocalDateFilter(dateFilter);
  }, [dateFilter]);

  const { type, from, to } = localDateFilter;

  const firstInputCondition =
    type === 'between' || type === 'equal' || type === 'greaterThan' || type === 'lessThan';

  const secondInputCondition = type === 'between';
  const onlySingleInputCondition =
    type === 'equal' || type === 'greaterThan' || type === 'lessThan';

  const firstInputLabel = useMemo(() => {
    if (from) {
      return <CatTypography variant="h2">⇥</CatTypography>;
    }
    if (onlySingleInputCondition) {
      return t('common.filters.date');
    }

    return t('common.filters.from');
  }, [from, onlySingleInputCondition, t]);

  return (
    <>
      <Box
        className={className}
        flex
        flexDirection="column"
        marginBottom="12px"
        paddingTop="0px"
        width="100%"
      >
        <CatTypography className="mb8" variant="body2">
          {title}
        </CatTypography>
        <div className="flex gap-8">
          <div style={{ width: '128px' }}>
            <CatSelect
              disabled={disabled}
              fullWidth
              onChange={handleFilterTypeChange}
              renderValue={(val) => (
                <Trans
                  components={{ bold: <span /> }}
                  i18nKey={`common.filters.date_types.${val}`}
                  t={t}
                />
              )}
              value={localDateFilter.type}
            >
              <CatMenuItem disabled key="" value="">
                {t('common.dropdown_generic_hint')}
              </CatMenuItem>
              {finalFilterValues.map((b) => (
                <CatMenuItem key={b} value={b}>
                  <DateFilterIcons relation={b} />
                  <CatTypography>
                    <Trans
                      components={{ bold: <b /> }}
                      i18nKey={`common.filters.date_types.${b}`}
                      t={t}
                    />
                    {t(`common.filters.date_types_menu.${b}`)}
                  </CatTypography>
                </CatMenuItem>
              ))}
            </CatSelect>
          </div>
          <div className="flex gap-4">
            {firstInputCondition && (
              <CatDatePickerWithFormHelper
                formHelper={formHelper}
                label={firstInputLabel}
                name="from"
                required
                TextFieldProps={{
                  InputProps: {
                    endAdornment: (
                      <>
                        {!!from && (
                          <CatIconButton onClick={handleClearFromDate}>
                            <FilterCancelIcon color="red" />
                          </CatIconButton>
                        )}
                      </>
                    )
                  }
                }}
              />
            )}
            {secondInputCondition && (
              <CatDatePickerWithFormHelper
                formHelper={formHelper}
                label={to ? <CatTypography variant="h2">⇥</CatTypography> : t('common.filters.to')}
                minDate={from}
                name="to"
                required
                TextFieldProps={{
                  InputProps: {
                    endAdornment: (
                      <>
                        {!!to && (
                          <CatIconButton onClick={handleClearToDate}>
                            <FilterCancelIcon color="red" />
                          </CatIconButton>
                        )}
                      </>
                    )
                  }
                }}
              />
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default DateFilter;
