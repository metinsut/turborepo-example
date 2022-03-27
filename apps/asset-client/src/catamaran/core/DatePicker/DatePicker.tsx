import { IconButton } from '../IconButton';
import { InputAdornment } from '@mui/material';
import {
  LocalizationProvider,
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps
} from '@mui/lab';
import { TextField, TextFieldProps } from '../TextField';
import { formatISO, isValid } from 'date-fns';
import { useEffect, useState } from 'react';
import { useInputFormat } from './helpers';
import CalendarMasterIcon from 'catamaran/icons/CalendarMaster';
import DateAdapter from '@mui/lab/AdapterDateFns';

const defaultMinDate = formatISO(new Date(1900, 1, 1));
const defaultMaxDate = formatISO(new Date(2099, 12, 31));

type NullableDate = Date | null;

export type DatePickerProps = Omit<
  MuiDatePickerProps<Date | null>,
  'onChange' | 'value' | 'minDate' | 'renderInput' | 'maxDate'
> & {
  helperText?: string;
  minDate?: string;
  maxDate?: string;
  onChange: (date: string) => void;
  required?: boolean;
  touched?: boolean;
  TextFieldProps?: TextFieldProps;
  value: string;
  valid?: boolean;
};

function DatePicker(props: DatePickerProps) {
  const {
    autoFocus,
    className,
    helperText,
    minDate = defaultMinDate,
    maxDate = defaultMaxDate,
    onChange,
    required = false,
    TextFieldProps = {},
    touched = false,
    valid = true,
    value,
    views,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);

  const [innerState, setInnerState] = useState<NullableDate>(() =>
    value ? new Date(value) : null
  );

  useEffect(() => {
    // Value changed from outside
    const newValue = value ? new Date(value) : null;
    setInnerState(newValue);
  }, [value]);

  const handleChange = (date: Date | null) => {
    if (date === null && value !== null) {
      // Empty callback
      onChange(null);
      return;
    }

    setInnerState(date);

    if (isValid(date)) {
      // Valid date change
      onChange(formatISO(date));
    } else if (value !== undefined) {
      // Invalid date
      onChange(undefined);
    }
  };

  const formatInfo = useInputFormat(views);

  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={formatInfo.locale}>
      <MuiDatePicker
        className={className}
        inputFormat={formatInfo.inputFormat}
        mask={formatInfo.mask}
        maxDate={new Date(maxDate)}
        minDate={new Date(minDate)}
        onChange={handleChange}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        renderInput={(params) => {
          const { inputProps, error, InputProps, ...rest } = params;
          const finalValid = valid && !error;
          return (
            <TextField
              {...TextFieldProps}
              autoComplete="off"
              autoFocus={autoFocus}
              helperText={helperText}
              InputProps={{
                ...TextFieldProps.InputProps,
                ...InputProps,
                endAdornment: (
                  <>
                    {TextFieldProps.InputProps?.endAdornment}
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <CalendarMasterIcon color="darkGrey" />
                      </IconButton>
                    </InputAdornment>
                  </>
                )
              }}
              inputProps={inputProps}
              required={required}
              touched={touched}
              valid={finalValid}
              validatable
              value={inputProps?.value}
              {...rest}
            />
          );
        }}
        value={innerState}
        views={views}
        {...rest}
      />
    </LocalizationProvider>
  );
}

export default DatePicker;
