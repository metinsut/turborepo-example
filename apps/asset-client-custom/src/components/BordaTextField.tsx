import { TextField, TextFieldProps, Theme, colors, makeStyles } from 'catamaran/core/mui';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  helperText: {
    fontSize: 10,
    lineHeight: 1,
    marginTop: theme.spacing(0.25)
  },
  input: {
    color: colors.grey[500]
  }
}));

type Props = TextFieldProps & {};

export const BordaTextField = React.forwardRef((props: Props, ref: any) => {
  const classes = useStyles();
  const { focused, disabled, name, ...rest } = props;
  const inputRef = React.useRef<any>();

  React.useEffect(() => {
    if (focused) {
      inputRef?.current?.focus();
      const { length } = inputRef.current.value;
      inputRef?.current?.setSelectionRange(length, length);
    }
  }, [focused]);

  return (
    <TextField
      disabled={disabled}
      focused={focused}
      FormHelperTextProps={{
        className: classes.helperText
      }}
      InputLabelProps={{
        className: classes.input
      }}
      inputProps={{
        'data-name': name
      }}
      inputRef={inputRef}
      ref={ref}
      {...rest}
    />
  );
});
