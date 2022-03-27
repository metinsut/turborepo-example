import { Checkbox, CheckboxProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckBoxCheckedIcon from 'catamaran/icons/CheckboxChecked';
import CheckBoxIcon from 'catamaran/icons/Checkbox';
import CheckboxIndeterminateIcon from 'catamaran/icons/CheckboxIndeterminate';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.Checkbox-large': {
      padding: '14px'
    },
    '&.Checkbox-medium': {
      padding: '8px'
    },
    '&.Checkbox-none': {
      padding: 0
    },
    '&.Checkbox-small': {
      padding: '4px'
    },
    fontSize: 12
  }
}));

export type Props = CheckboxProps & {
  className?: string;
  paddingSize?: 'none' | 'small' | 'medium' | 'large';
};

function BordaCheckbox(props: Props, ref: React.Ref<any>) {
  const classes = useStyles();
  const { className, paddingSize = 'medium', ...rest } = props;

  return (
    <Checkbox
      checkedIcon={<CheckBoxCheckedIcon fontSize="inherit" />}
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [`Checkbox-${paddingSize}`]: true
      })}
      icon={<CheckBoxIcon fontSize="inherit" />}
      indeterminateIcon={<CheckboxIndeterminateIcon fontSize="inherit" />}
      ref={ref}
      {...rest}
    />
  );
}

BordaCheckbox.displayName = 'BordaCheckbox';
export default React.forwardRef(BordaCheckbox);
