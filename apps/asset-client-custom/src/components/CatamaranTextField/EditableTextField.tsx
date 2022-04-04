import { Box } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { TextField, TextFieldProps, Theme, makeStyles, useForkRef } from 'catamaran/core/mui';
import React, { useEffect, useRef, useState } from 'react';
import ValidationBadge from 'components/ValidationBadge';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  focused: {
    background: '#FFF !important',
    backgroundColor: '#FFF !important'
  },
  invalid: {
    background: theme.palette.redGradient[100]
  },
  numberInput: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  },
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.lightGrey.main,
    borderRadius: theme.spacing(1),
    display: 'flex',
    margin: theme.spacing(0, 0, 1.5),
    padding: theme.spacing(0, 1),
    position: 'relative'
  },
  textField: {
    '& .MuiFormHelperText-root': {
      color: theme.palette.red.main,
      marginBottom: '-15px',
      marginTop: theme.spacing(0.25)
    },
    '& .MuiInput-input': {
      paddingLeft: '0px',
      paddingTop: '13px'
    },
    '& .MuiInput-underline': {
      '&:before': {
        borderBottom: (props: any) =>
          props.isValid !== undefined
            ? `1px solid ${props.isValid ? theme.palette.green.main : theme.palette.red.main}`
            : `1px solid ${theme.palette.lightGrey.main}`
      },
      '&:hover:before': {
        borderBottom: (props: any) =>
          props.isValid !== undefined
            ? `2px solid ${props.isValid ? theme.palette.green.main : theme.palette.red.main}`
            : `2px solid ${theme.palette.blue.main}`
      },
      height: '100%',
      marginTop: '0'
    },
    '& .MuiInputBase-inputMultiline': {
      padding: '13px 8px 8px 0px'
    },
    '& .MuiInputBase-root': {
      color: '#494949'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#F3F5F6'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F3F5F6'
      },
      '&:hover fieldset': {
        borderColor: '#F3F5F6'
      }
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      '& fieldset': {
        borderColor: 'rgba(243,245,246, 0.6)'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(243,245,246, 0.6)'
      },
      '&:hover fieldset': {
        borderColor: 'rgba(243,245,246, 0.6)'
      }
    },
    '& label': {
      '&.MuiInputLabel-shrink': {
        '&.Mui-focused': {
          color: (props) => (props.label ? theme.palette.blue.main : 'transparent')
        },
        transform: 'translate(0px, 1px) scale(0.7)'
      },
      color: (props) => (props.label ? theme.palette.darkGrey[400] : 'transparent'),
      transform: 'translate(0px, 11px) scale(1)'
    },
    height: (props) => (!props.multiline ? '40px' : '100%'),
    minHeight: (props) => props.multiline && '40px',
    width: '100%'
  },
  valid: {
    background: theme.palette.greenGradient[100]
  }
}));

type Props<T> = TextFieldProps & {
  autoFocus?: boolean;
  className?: string;
  endAdornment?: React.ReactNode;
  focused?: boolean;
  formHelper: FormHelper<T>;
  isNumericString?: boolean;
  isRequired?: boolean;
  label?: string | React.ReactNode;
  name: string & keyof T;
  startAdornment?: React.ReactNode;
  validatable?: boolean;
};

function EditableTextField<T>(props: Props<T>, ref: any) {
  const {
    autoFocus,
    className,
    endAdornment,
    focused,
    formHelper,
    inputProps,
    isNumericString,
    isRequired,
    InputProps,
    label,
    multiline,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    startAdornment,
    validatable = true,
    type,
    variant = 'standard',
    ...rest
  } = props;

  const [internalFocused, setFocused] = useState(false);
  const finalFocused = focused ?? internalFocused;

  const { formState } = formHelper;
  const canValidate =
    validatable &&
    formState.validatable &&
    (formState.values[name]?.toString().length > 0 || formState.touchedFields[name]);
  const isValid = !formState.errors[name] && !formState.manualErrors[name];
  const error = formState.errors[name] ?? formState.manualErrors[name];

  const classes = useStyles({
    hasStartAdornment: !!startAdornment,
    isValid: canValidate ? isValid : undefined,
    label,
    multiline
  });

  const handleBlur = (e: any) => {
    onBlur?.(e);
    inputProps?.onBlur?.(e);
    setFocused(false);
  };

  const handleFocus = (e: any) => {
    onFocus?.(e);
    inputProps?.onFocus?.(e);
    setFocused(true);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (value && isNumericString && !Number(value)) {
      return;
    }

    formHelper.handleChange(e);
    onChange?.(e);
    inputProps?.onChange?.(e);
  };

  const inputRef = useRef(null);
  const forkedRef = useForkRef(inputRef, InputProps?.inputRef);

  useEffect(() => {
    const elementFocused = document.hasFocus() && inputRef.current.contains(document.activeElement);
    if (finalFocused && !elementFocused) {
      inputRef.current.focus();
    } else if (!finalFocused && elementFocused) {
      inputRef.current.blur();
    }
  }, [finalFocused]);

  return (
    <Box
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [classes.valid]: canValidate && isValid,
        [classes.invalid]: canValidate && !isValid,
        [classes.focused]: finalFocused,
        [classes.numberInput]: true
      })}
    >
      <div className="align-self-start mt20">
        {canValidate && <ValidationBadge isValid={isValid} />}
        {!canValidate && isRequired && <ValidationBadge isValid={false} />}
      </div>
      <TextField
        autoComplete="off"
        autoFocus={autoFocus}
        className={clsx({
          [classes.textField]: true
        })}
        focused={finalFocused}
        helperText={canValidate && !isValid ? error : ''}
        InputProps={{
          ...InputProps,
          autoComplete: 'off',
          endAdornment: (
            <div className="endAdornmentContainer align-self-start mt8">
              {endAdornment ?? InputProps?.endAdornment}
            </div>
          ),
          inputRef: forkedRef,
          startAdornment: startAdornment ? (
            <div className="startAdornmentContainer">{startAdornment}</div>
          ) : (
            InputProps?.startAdornment
          ),
          style: {
            fontSize: 13,
            ...InputProps?.style
          }
        }}
        inputProps={{
          ...inputProps,
          'data-name': name
        }}
        label={label ?? 'placeholder'}
        multiline={multiline}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={onKeyDown}
        ref={ref}
        size="small"
        type={type}
        value={formState.values[name] ?? ''}
        variant={variant}
        {...rest}
      />
    </Box>
  );
}

export default React.forwardRef(EditableTextField) as any as typeof EditableTextField;
