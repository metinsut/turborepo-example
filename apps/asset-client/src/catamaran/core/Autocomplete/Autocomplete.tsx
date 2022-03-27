import {
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  CircularProgress,
  ListItem,
  Autocomplete as MuiAutoComplete,
  styled
} from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import CatCheckbox from 'catamaran/core/Checkbox';
import CatChip from 'catamaran/core/Chip/Chip';
import CatTextField from 'catamaran/core/TextField/TextField';
import ChevronDownIcon from 'catamaran/icons/ChevronDown';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

const StyledAutocomplete = styled(MuiAutoComplete)(({ multiple, value }) => ({
  // Chips and auto rendered tag
  '& .MuiAutocomplete-tag': {
    margin: '0px 4px 4px 4px'
  },
  // Input field. Specific paddings for no input view.
  '& .MuiFilledInput-root.MuiInputBase-sizeSmall .MuiFilledInput-input': {
    padding: multiple ? '0px' : undefined,
    paddingBottom: multiple && (value as any)?.length === 0 ? '9px' : undefined,
    paddingTop: multiple && (value as any)?.length === 0 ? '1px' : undefined
  },
  // Chips, tag and input container
  '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root': {
    paddingTop: multiple ? '12px' : undefined
  }
})) as typeof MuiAutoComplete;

export type AutoCompleteProps<T, K> = Omit<
  AutocompleteProps<T, any, any, any>,
  'onChange' | 'options' | 'renderInput'
> & {
  getOptionValue: (option: T) => K;
  groupByFirstLetter?: boolean;
  selectedValues?: K[] | K;
  onChange: (value: K[] | K) => void;
  options: T[];
  label?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  renderOptionCheckBox?: boolean;
  endAdornment?: React.ReactNode;
};

function Autocomplete<T, K>(props: AutoCompleteProps<T, K>, ref: React.Ref<any>) {
  const {
    blurOnSelect,
    className,
    endAdornment,
    disableCloseOnSelect,
    freeSolo,
    getOptionLabel = (option) => option as any as string,
    getOptionValue,
    groupBy,
    groupByFirstLetter,
    label = '',
    loading,
    multiple,
    noOptionsText,
    onChange,
    openOnFocus,
    options,
    renderInput,
    renderOption,
    renderOptionCheckBox = multiple,
    selectedValues,
    ...rest
  } = props;

  const [selectedCatValues, setSelectedCatValues] = useState<T[]>([]);
  const [selectedCatValue, setSelectedCatValue] = useState<T>(null);

  const { t } = useTranslation();
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | T | NonNullable<T> | (string | T)[]
  ) => {
    if (freeSolo && !!value) {
      const typedFreeSoloValue = value as any as K;
      onChange(typedFreeSoloValue);
      setSelectedCatValue(value as T);
    } else if (multiple) {
      const typedMultipleValue = value as T[];
      onChange(typedMultipleValue.map((val: T) => getOptionValue(val)));
      setSelectedCatValues(typedMultipleValue);
    } else {
      const typedValue = value as any as T;
      onChange(getOptionValue(typedValue));
      setSelectedCatValue(typedValue);
    }
  };

  useEffect(() => {
    const getSelectedOptions = () => {
      if (freeSolo) {
        return null;
      }

      if (!multiple) {
        return options.find((option) => getOptionValue(option) === selectedValues);
      }

      return (selectedValues as K[])
        ?.map((value: K) => options.find((option) => getOptionValue(option) === value))
        .filter((i) => i);
    };

    const selectedOptions = getSelectedOptions();

    if (selectedOptions) {
      if (multiple) {
        setSelectedCatValues(selectedOptions as T[]);
      } else {
        setSelectedCatValue(selectedOptions as T);
      }
    } else if (freeSolo) {
      setSelectedCatValue(selectedValues as any as T);
    }
  }, [freeSolo, getOptionValue, multiple, options, selectedValues]);

  const getCheckboxOption = (
    optionProps: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    { selected }: AutocompleteRenderOptionState
  ) => (
    <ListItem {...optionProps} key={getOptionLabel(option)} selected={selected}>
      <CatCheckbox checked={selected} className="mr8" />
      {getOptionLabel(option)}
    </ListItem>
  );

  const finalValue = multiple ? selectedCatValues : selectedCatValue;

  const getFinalRenderOption = (
    optionProps: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState
  ) => {
    if (renderOption) {
      return renderOption;
    }

    if (renderOptionCheckBox) {
      return getCheckboxOption(optionProps, option, state);
    }

    return (
      <ListItem {...optionProps} key={getOptionLabel(option)} selected={state.selected}>
        {getOptionLabel(option)}
      </ListItem>
    );
  };

  // Group By First Letter Operations Start
  const getOptionFirstLetter = useCallback(
    (option: T): string => {
      const firstLetter = getOptionLabel(option)[0]?.toLocaleUpperCase('tr-TR');
      return /[0-9]/.test(firstLetter) ? '0-9' : firstLetter;
    },
    [getOptionLabel]
  );

  const sortOptionsByFirstLetter = useCallback(
    (a: T, b: T) => {
      if (getOptionFirstLetter(b) === getOptionFirstLetter(a)) {
        return getOptionLabel(a).localeCompare(getOptionLabel(b), 'tr-TR');
      }

      return getOptionFirstLetter(a).localeCompare(getOptionFirstLetter(b), 'tr-TR');
    },
    [getOptionFirstLetter, getOptionLabel]
  );

  const sortedOptionsByFirstLetter = useMemo(() => {
    if (!groupByFirstLetter) return options;
    return [...options].sort(sortOptionsByFirstLetter);
  }, [options, sortOptionsByFirstLetter, groupByFirstLetter]);
  // Group By First Letter Operations End

  const finalGetNoOptionsText = () => {
    if (noOptionsText) return noOptionsText;

    return loading ? t('common.loading') : t('common.search_not_found');
  };

  const getFinalOptions = () => {
    if (groupByFirstLetter) return sortedOptionsByFirstLetter;

    if (groupBy) {
      return options.sort((a, b) => (groupBy(a) < groupBy(b) ? -1 : 1));
    }
    return options;
  };

  return (
    <StyledAutocomplete
      blurOnSelect={blurOnSelect ?? !multiple}
      className={clsx(className, 'w-full')}
      clearIcon={<FilterCancelIcon color="red" />}
      disableCloseOnSelect={disableCloseOnSelect ?? multiple}
      freeSolo={freeSolo}
      getOptionLabel={getOptionLabel}
      groupBy={groupByFirstLetter ? (value: T) => getOptionFirstLetter(value) : groupBy}
      isOptionEqualToValue={(option, value) => getOptionValue(option) === getOptionValue(value)}
      multiple={multiple}
      noOptionsText={finalGetNoOptionsText()}
      onChange={handleChange}
      openOnFocus={openOnFocus ?? true}
      options={getFinalOptions()}
      popupIcon={<ChevronDownIcon />}
      ref={ref}
      renderInput={
        renderInput ??
        ((params) => (
          <>
            <CatTextField
              fullWidth
              label={label}
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {endAdornment && <div style={{ marginTop: '-10px' }}>{endAdornment}</div>}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          </>
        ))
      }
      renderOption={getFinalRenderOption}
      renderTags={(tagValue: T[], getTagProps: AutocompleteRenderGetTagProps) =>
        tagValue.map((option: T, index: number) => (
          <CatChip {...getTagProps({ index })} label={getOptionLabel(option)} />
        ))
      }
      value={finalValue as T | T[]}
      {...rest}
    />
  );
}

export default React.forwardRef(Autocomplete) as <T, K>(
  p: AutoCompleteProps<T, K>,
  ref: React.Ref<any>
) => React.ReactElement;
