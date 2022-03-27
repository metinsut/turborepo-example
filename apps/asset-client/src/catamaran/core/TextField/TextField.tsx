import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  Theme,
  styled
} from '../mui';
import InputConfirmedIcon from 'catamaran/icons/InputConfirmed';
import InputErrorIcon from 'catamaran/icons/InputError';
import InputRequiredIcon from 'catamaran/icons/InputRequired';
import React, { useMemo } from 'react';
import clsx from 'clsx';

type FormProps = {
  required?: boolean;
  touched?: boolean;
  valid?: boolean;
  validatable?: boolean;
  value?: unknown;
};

export type TextFieldProps = Partial<MuiTextFieldProps> & FormProps & {};

export const styledOptions = ({ theme }: { theme: Theme }) => ({
  '& .MuiFormHelperText-root': {
    color: theme.palette.red.main,
    marginBottom: '-8px',
    marginLeft: '4px',
    marginTop: theme.spacing(0.25)
  },
  '& .MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)':
    {
      // added to increase css specificity
      marginRight: '4px',
      marginTop: '5px'
    },
  '& .MuiInputBase-inputSizeSmall': {
    // input and paddings
    ':focus': {
      // added for select
      backgroundColor: 'transparent'
    },
    fontSize: '13px',
    height: '18px',
    lineHeight: '18px',
    minHeight: '18px',
    padding: '13px 0px 9px 0px'
  },
  '& .MuiInputBase-root': {
    '&.Mui-focused': {
      '&:after': {
        // focused border
        borderBottomColor: theme.palette.blue.main
      },
      // focused background
      backgroundColor: 'white'
    },
    '&:before, &:after': {
      // make default background transparent, variants will give the color
      borderBottomColor: `transparent`,
      borderBottomWidth: '1px',
      marginLeft: '8px',
      marginRight: '8px'
    },
    // textfield border
    borderRadius: '8px',
    padding: '0px 8px'
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      // focused label
      opacity: 1,
      transform: 'translate(8px, 1px) scale(0.7)'
    },
    '&.MuiInputLabel-shrink': {
      // shrink label
      transform: 'translate(8px, 1px) scale(0.7)'
    },
    // default label
    opacity: 0.6,
    transform: 'translate(8px, 11px) scale(1)'
  },
  '&.default .MuiInputBase-root:not(.Mui-focused)': {
    '&:hover': {
      '&:not(.Mui-disabled):before': {
        // default hover border
        borderBottomColor: theme.palette.blue[400]
      },
      // default hover bg
      backgroundColor: theme.palette.lightGrey[400]
    },
    // default bg
    backgroundColor: theme.palette.lightGrey.main
  },
  '&.green .MuiInputBase-root:not(.Mui-focused)': {
    '&:hover': {
      '&:not(.Mui-disabled):before': {
        // valid hover border
        borderBottomColor: theme.palette.green[400]
      },
      // valid hover bg
      backgroundColor: theme.palette.green[100]
    },
    // default bg
    backgroundColor: theme.palette.green[200]
  },
  '&.red .MuiInputBase-root:not(.Mui-focused)': {
    '&:hover': {
      '&:not(.Mui-disabled):before': {
        // invalid hover border
        borderBottomColor: theme.palette.red[400]
      },
      // invalid hover bg
      backgroundColor: theme.palette.red[100]
    },
    // default bg
    backgroundColor: theme.palette.red[200]
  }
});

const StyledTextField = styled(MuiTextField)(styledOptions);

export const Root = styled('div')({
  '& .validation-badge': {
    left: '-7px',
    position: 'absolute',
    top: '15px',
    zIndex: 2
  },
  position: 'relative'
});

export function ValidationIcon(props: FormProps & { className: string }) {
  const { className, required, touched, valid, validatable, value } = props;

  if (!touched && !value) {
    if (required) {
      return <InputRequiredIcon className={className} />;
    }
    return null;
  }
  if (required && !validatable) {
    return <InputRequiredIcon className={className} />;
  }

  if (validatable && valid) {
    return <InputConfirmedIcon className={className} />;
  }

  if (validatable && !valid) {
    return <InputErrorIcon className={className} />;
  }

  return null;
}

function TextField(props: TextFieldProps) {
  const {
    fullWidth = true,
    required = false,
    size = 'small',
    touched = false,
    valid = false,
    validatable = false,
    value,
    variant = 'filled' as any,
    ...rest
  } = props;

  const formProps = { required, touched, valid, validatable, value };
  const mergedProps = { fullWidth, size, value, variant };

  const inputClass = useMemo(() => {
    if (validatable && (touched || value)) {
      if (valid) {
        return 'green';
      }
      return 'red';
    }

    return 'default';
  }, [validatable, touched, value, valid]);

  return (
    <Root
      className={clsx({
        'w-full': fullWidth
      })}
    >
      <ValidationIcon className="validation-badge" {...formProps} />
      <StyledTextField className={inputClass} {...mergedProps} {...rest} />
    </Root>
  );
}

export default TextField;
