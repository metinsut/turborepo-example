import { CatCheckbox } from 'catamaran/core';
import { Props } from '../Checkbox';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckBoxCheckedLightIcon from 'catamaran/icons/CheckboxCheckedLight';
import CheckboxIndeterminateIcon from 'catamaran/icons/CheckboxIndeterminate';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

function ToggleCardCheckbox(props: Props) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <CatCheckbox
      checkedIcon={<CheckBoxCheckedLightIcon fontSize="inherit" />}
      className={clsx(classes.root, className)}
      indeterminateIcon={<CheckboxIndeterminateIcon fontSize="inherit" />}
      paddingSize="none"
      {...rest}
    />
  );
}

export default ToggleCardCheckbox;
