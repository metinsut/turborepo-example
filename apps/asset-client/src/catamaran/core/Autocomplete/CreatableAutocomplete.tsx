import { CatIconButton } from '..';
import { CircularProgress, Fade, Popper, createFilterOptions } from '../mui';
import { TextField, TextFieldProps } from '../TextField';
import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import Autocomplete, { AutoCompleteProps } from './Autocomplete';
import CancelIcon from 'catamaran/icons/Cancel';
import Chip from '../Chip/Chip';
import DownIcon from 'catamaran/icons/Down';
import NewBadge from 'components/NewBadge';
import Paper from '../Paper';
import PlusIcon from 'catamaran/icons/Plus';
import Typography from '../Typography';

export type CreatableAutocompleteProps<T, K> = Omit<AutoCompleteProps<T, K>, 'disableClearable'> & {
  autoFocus?: boolean;
  addHintObjectName?: React.ReactNode;
  disableClearable?: boolean;
  displayAddButtonWhenNoMatch?: boolean;
  freeSoloAddItemText?: React.ReactNode;
  TextFieldProps?: TextFieldProps;
  showNewBadge?: boolean;
};

function CreatableAutocomplete<T, K>(props: CreatableAutocompleteProps<T, K>) {
  const {
    autoFocus = false,
    addHintObjectName,
    blurOnSelect = true,
    className,
    clearOnBlur = true,
    clearOnEscape = true,
    disableClearable = false,
    displayAddButtonWhenNoMatch,
    freeSoloAddItemText,
    getOptionLabel = (option) => option as any as string,
    getOptionValue,
    TextFieldProps = {},
    label,
    loading,
    onBlur,
    onChange,
    onFocus,
    onInputChange,
    options,
    renderInput,
    showNewBadge = false,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState<string>('');
  const [focused, setFocused] = useState(false);

  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>();
  const popperRef = useRef<HTMLInputElement>();

  const exactMatch = useMemo(
    () => options.some((option) => inputValue === getOptionLabel(option)),
    [inputValue, getOptionLabel, options]
  );

  const handleInputChange = (event: any, value: string, reason: any) => {
    onInputChange?.(event, value, reason);
    setInputValue(value);
  };

  const handleAddButton = (e: any) => {
    e.stopPropagation();
    onChange(inputValue as any as K);
    inputRef.current.blur();
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    onFocus?.(e);
    setFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    onBlur?.(e);
    setFocused(false);
  };

  const filter = useMemo(() => createFilterOptions<T>(), []);
  const filteredOptions = useMemo(
    () => filter(options, { getOptionLabel, inputValue }),
    [filter, getOptionLabel, inputValue, options]
  );

  const matchMenuOpen = filteredOptions.length > 0;

  // Text field autoFocus breaks anchor position
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [autoFocus]);

  const getFinalFreeSoloAddItemText = () => (
    <div className="flex justify-content-between">
      <div className="flex w-half flex-direction-column">
        <Typography variant="body1">
          <Trans i18nKey="common.autocomplete_add_hint_first_line" t={t} />
        </Typography>
        <Typography variant="body1">
          <Trans
            i18nKey="common.autocomplete_add_hint_second_line"
            t={t}
            values={{ addedItem: addHintObjectName ?? t('common.autocomplete_add_hint_item') }}
          />
        </Typography>
        <Typography variant="body1">
          <Trans i18nKey="common.autocomplete_add_hint_third_line" t={t} />
        </Typography>
      </div>
      <div className="flex justify-content-between flex-direction-column align-items-end">
        <DownIcon className="opacity-8" style={{ transform: 'matrix(1, 0, 0, -1, 0, 0)' }} />
        <Chip label="⏎ Enter" size="small" />
      </div>
    </div>
  );
  const showAddButton = displayAddButtonWhenNoMatch && !!inputValue && !exactMatch && focused;
  const showClearButton = !disableClearable && !!inputValue && focused;

  const handleClear = () => {
    setInputValue('');
    onChange('' as any as K);
  };

  return (
    <>
      <Autocomplete
        blurOnSelect={blurOnSelect}
        className={className}
        clearOnBlur={clearOnBlur}
        clearOnEscape={clearOnEscape}
        disableClearable
        filterOptions={(_options, _params) => filteredOptions}
        forcePopupIcon={false}
        freeSolo
        getOptionValue={getOptionValue}
        inputValue={inputValue}
        multiple={false}
        onBlur={handleBlur}
        onChange={onChange}
        onFocus={handleFocus}
        onInputChange={handleInputChange}
        options={options}
        PopperComponent={(props) => {
          const { children, ...rest } = props;
          return (
            <Popper {...rest} open={matchMenuOpen && focused} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={300}>
                  {children as any}
                </Fade>
              )}
            </Popper>
          );
        }}
        ref={popperRef}
        renderInput={
          renderInput ??
          ((params) => {
            const { inputProps, InputProps, ...rest } = params;
            return (
              <TextField
                {...TextFieldProps}
                fullWidth
                inputProps={inputProps}
                inputRef={inputRef}
                label={label}
                onKeyDown={(e) => {
                  if (e.key === 'Escape' && !inputValue) {
                    inputRef.current.blur();
                  }
                }}
                {...params}
                InputProps={{
                  ...TextFieldProps.InputProps,
                  ...InputProps,
                  endAdornment: (
                    <>
                      {TextFieldProps.InputProps?.endAdornment}
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {showNewBadge && <NewBadge className="mr8" />}
                      {showClearButton && (
                        <CatIconButton
                          className="mr8"
                          onClick={handleClear}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <CancelIcon color="darkGrey" />
                        </CatIconButton>
                      )}
                      {showAddButton && (
                        <CatIconButton
                          className="mr8"
                          onClick={handleAddButton}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <PlusIcon color="blue" />
                        </CatIconButton>
                      )}
                    </>
                  )
                }}
                {...rest}
              />
            );
          })
        }
        {...rest}
      />
      {popperRef.current && (
        <Popper
          anchorEl={popperRef.current}
          open={!matchMenuOpen && focused}
          style={{
            width: (popperRef.current as any).clientWidth,
            zIndex: 1300
          }}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={300}>
              <Paper className="p16 radius-16">
                {freeSoloAddItemText ?? getFinalFreeSoloAddItemText()}
              </Paper>
            </Fade>
          )}
        </Popper>
      )}
    </>
  );
}

export default CreatableAutocomplete;
