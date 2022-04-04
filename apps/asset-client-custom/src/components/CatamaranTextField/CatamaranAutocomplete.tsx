import {
  Autocomplete,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  CircularProgress,
  InputAdornment,
  ListItem,
  Theme,
  Typography,
  createFilterOptions,
  makeStyles
} from 'catamaran/core/mui';
import { CatCheckbox } from 'catamaran/core';
import { useAutocompleteContext } from './Autocomplete';
import { useFormState } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import ChevronDownIcon from 'catamaran/icons/ChevronDown';
import EditableTextField from './EditableTextField';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    borderRadius: '16px',
    padding: '0px 4px 4px 0px'
  },
  paperWithSelectAll: {
    '& .MuiAutocomplete-listbox': {
      paddingTop: 0
    }
  },
  root: {
    '& .MuiAutocomplete-clearIndicator': {
      marginRight: 4,
      padding: 0
    },
    width: '100%'
  },
  scrollbar: {
    '& .scrollbar-container': {
      '& .ps__rail-y': {
        margin: '8px 2px',
        zIndex: 1000
      },
      height: 'inherit',
      maxHeight: 'inherit'
    },
    overflow: 'hidden !important'
  },
  selectAllBox: {
    alignItems: 'center',
    background: 'rgba(73, 73, 73, 0.1)',
    border: '1px solid rgba(73, 73, 73, 0.1)',
    borderRadius: '24px',
    height: '40px',
    justifyContent: 'flex-start',
    width: '100%'
  }
}));
type Props<T> = {
  className?: string;
  defaultValues?: string[];
  disabled?: boolean;
  filterFunction?: (option: T) => string;
  getOptionSelected?: (option: T, value: T) => boolean;
  // This is for what appears in dropdown for each item
  getOptionLabel: (option: T) => string;
  groupBy?: (option: T) => string;
  // This is for what appears on inputitem when something is selected
  getInputTagLabel?: (options: T[]) => string;
  label?: string;
  loading?: boolean;
  loadingText?: string | React.ReactNode;
  noOptionText?: string | React.ReactNode;
  onChange: (newValue: T[], reason?: string) => void;
  onInputChange?: (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  options: T[];
  values?: T[];
  selectAll?: boolean;
  startTypingText?: string | React.ReactNode;
};
function CatamaranAutocomplete<T>(props: Props<T>) {
  const classes = useStyles();
  const {
    className,
    defaultValues = [],
    disabled,
    filterFunction,
    getOptionLabel,
    getOptionSelected,
    getInputTagLabel,
    groupBy,
    label,
    loading,
    loadingText,
    noOptionText,
    onChange,
    onInputChange,
    options,
    values,
    selectAll = false,
    startTypingText
  } = props;

  const formHelper = useFormState({ title: '' });
  const [open, setOpen] = useState(false);

  const [localValues, setLocalValues] = useState<T[]>(() =>
    options.filter((i) => defaultValues.includes((i as any).id))
  );

  const finalValues = values ?? localValues;
  const localOnChange = useCallback(
    (newValues: T[], reason?: string) => {
      setLocalValues(newValues);
      onChange(newValues, reason);
    },
    [onChange]
  );

  const finalOnChange = values ? onChange : localOnChange;

  const { t } = useTranslation();

  const filterOptions = createFilterOptions<T>({
    matchFrom: 'any',
    stringify: filterFunction ?? getOptionLabel
  });

  const defaultLabel = (options: any) => {
    if (!options || options.length === 0) {
      return t('common.no_items_selected');
    }
    return t('common.item_selected', { count: options.length });
  };
  const renderTagLabel = getInputTagLabel ?? defaultLabel;
  const renderTag = (options: any) => (
    <InputAdornment
      className={clsx({
        [className]: true,
        'opacity-4': disabled
      })}
      component="div"
      position="start"
    >
      <Typography>{renderTagLabel(options)}</Typography>
    </InputAdornment>
  );
  const catamaranTextField = (params: AutocompleteRenderInputParams) => (
    <EditableTextField
      disabled={disabled}
      formHelper={formHelper}
      {...params}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        )
      }}
      label={label}
      name="title"
      onKeyDown={(event: any) => {
        // this is for preventing user from deleting selected options
        // when they press backspace in input
        if (event.key === 'Backspace') {
          event.stopPropagation();
        }
      }}
      startAdornment={renderTag(finalValues)}
    />
  );
  const allSelected = options.length === finalValues.length;
  const handleToggleSelectAll = () => {
    if (allSelected) {
      finalOnChange([]);
    } else {
      finalOnChange(options);
    }
  };
  const handleChange = (event: any, newValue: any, reason: string) => {
    if (reason === 'selectOption' || reason === 'removeOption') {
      if (newValue.find((option: any) => option?.value === 'select-all')) {
        handleToggleSelectAll();
      } else {
        finalOnChange(newValue as T[]);
      }
    } else if (reason === 'clear') {
      finalOnChange([], reason);
    }
  };

  const finalLoadingText = loadingText ?? t('common.loading');
  const finalNoOptionText = noOptionText ?? t('common.search_not_found');
  const finalStartTypingText = startTypingText ?? t('common.start_typing');

  const dropdownText = useMemo(() => {
    if (loading) {
      return finalLoadingText;
    }

    if (formHelper.formState.values.title === '' && options.length === 0) {
      return finalStartTypingText;
    }

    return finalNoOptionText;
  }, [
    finalLoadingText,
    finalNoOptionText,
    finalStartTypingText,
    formHelper.formState.values.title,
    loading,
    options.length
  ]);

  const context = useAutocompleteContext();

  const handleClose = () => {
    formHelper.resetField('title', '');
    context.toggle(false);
    setOpen(false);
  };

  const handleOpen = () => {
    context.toggle(true);
    setOpen(true);
  };

  return (
    <Autocomplete
      classes={{
        paper: classes.paper + selectAll ? classes.paperWithSelectAll : ''
      }}
      className={clsx(classes.root, className)}
      clearIcon={<FilterCancelIcon color="red" />}
      clearOnBlur={false}
      clearOnEscape={false}
      disableCloseOnSelect
      disabled={disabled}
      filterOptions={(options, params) => {
        const filtered = filterOptions(options, params);
        return selectAll
          ? [{ label: 'Select All', value: 'select-all' } as any, ...filtered]
          : filtered;
      }}
      getOptionLabel={getOptionLabel}
      groupBy={groupBy}
      inputValue={formHelper.formState.values.title}
      isOptionEqualToValue={getOptionSelected}
      limitTags={0}
      ListboxComponent={
        CustomScrollbarList as React.ComponentType<React.HTMLAttributes<HTMLElement>>
      }
      multiple
      noOptionsText={dropdownText}
      onChange={handleChange}
      onClose={handleClose}
      onInputChange={onInputChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && open) {
          // If autocomplete is open, dont trigger keyboard section
          e.stopPropagation();
        }
      }}
      onOpen={handleOpen}
      open={open}
      options={options}
      popupIcon={<ChevronDownIcon />}
      renderInput={catamaranTextField}
      renderOption={(optionProps, option, { selected }) => {
        if ((option as any).value === 'select-all') {
          return (
            <ListItem
              className={clsx(classes.selectAllBox, 'flex')}
              {...optionProps}
              selected={allSelected}
            >
              <CatCheckbox checked={allSelected} style={{ marginRight: 8 }} />
              <Typography>{t('common.select_all')}</Typography>
            </ListItem>
          );
        }
        return (
          <ListItem {...optionProps} selected={selected}>
            <CatCheckbox checked={selected} style={{ marginRight: 8 }} />
            {getOptionLabel(option)}
          </ListItem>
        );
      }}
      value={finalValues}
    />
  );
}
const CustomScrollbarList = React.forwardRef((props, ref) => (
  <SelectCustomScrollbar {...props} ref={ref} />
));
type SelectScrollbarProps = {
  children: React.ReactNode;
  className: string;
};
const SelectCustomScrollbar = React.forwardRef<any, any>((props: SelectScrollbarProps, ref) => {
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { children, className } = props;
  return (
    <ul className={clsx(className, classes.scrollbar)} ref={ref}>
      <PerfectScrollbar options={{ suppressScrollX: true }} {...props} role="listbox">
        {children}
      </PerfectScrollbar>
    </ul>
  );
});
export default CatamaranAutocomplete;
