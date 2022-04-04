import { FormHelper } from 'hooks/useFormState';
import { TextFieldProps, Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import ValidatedTextField from './ValidatedTextField';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiInputBase-root': {
      backgroundColor: '#F3F5F6',
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
        backgroundColor: 'rgba(243,245,246, 0.6)',
        borderColor: 'rgba(243,245,246, 0.6)'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(243,245,246, 0.6)'
      },
      '&:hover fieldset': {
        borderColor: 'rgba(243,245,246, 0.6)'
      },
      backgroundColor: 'rgba(243,245,246, 0.6)'
    },
    '& label.Mui-focused': {
      color: 'gray'
    },
    width: '100%'
  }
}));

type Props<T> = TextFieldProps & {
  formHelper: FormHelper<T>;
  name: keyof T & string;
  defaultValue?: string;
};

function StyledValidatedTextField<T>(props: Props<T>) {
  const classes = useStyles();

  return (
    <ValidatedTextField
      classes={{
        root: classes.root
      }}
      {...props}
    />
  );
}

export default StyledValidatedTextField;
