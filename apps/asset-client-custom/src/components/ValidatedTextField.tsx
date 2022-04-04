import { BordaTextField } from './BordaTextField';
import { FormHelper } from 'hooks/useFormState';
import { TextFieldProps, Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({}));

type Props<TEntity> = TextFieldProps & {
  formHelper: FormHelper<TEntity>;
  name: keyof TEntity & string;
  defaultValue?: string;
};

function ValidatedTextField<TEntity>(props: Props<TEntity>) {
  const { defaultValue, formHelper, name, ...rest } = props;
  const { formState } = formHelper;
  const classes = useStyles();

  const error = !!formState.touchedFields[name] && !!formState.errors[name];
  const helperText = formState.touchedFields[name] ? formState.errors[name] ?? '' : '';

  return (
    <BordaTextField
      error={error}
      helperText={helperText}
      name={name.toString()}
      onChange={formHelper.handleChange}
      value={formState.values[name] ?? defaultValue ?? ''}
      {...rest}
    />
  );
}

export default React.memo(ValidatedTextField) as any as typeof ValidatedTextField;
