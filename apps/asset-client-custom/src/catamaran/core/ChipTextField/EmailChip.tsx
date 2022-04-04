import { Chip, Theme, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { validateEmail } from 'helpers/validations/base/EmailValidator';
import CancelIcon from 'catamaran/icons/Cancel';
import React, { useMemo } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  error: {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.red.main,
    color: theme.palette.red.main
  },
  root: {
    '& .MuiChip-label': {
      marginRight: '5px'
    },
    maxWidth: theme.spacing(32)
  }
}));

type Props = {
  className?: string;
  error?: boolean;
  onDelete?: () => void;
  text?: string;
};

function EmailChip(props: Props) {
  const classes = useStyles();
  const { className, error, onDelete, text } = props;

  const isEmailValid = useMemo(() => validateEmail(text), [text]);
  const isValid = !error && isEmailValid;

  return (
    <Chip
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [classes.error]: !isValid
      })}
      deleteIcon={<CancelIcon color={isValid ? 'darkGrey' : 'red'} />}
      label={
        <Tooltip title={text}>
          <Typography color="inherit" variant="body2">
            {text}
          </Typography>
        </Tooltip>
      }
      onDelete={onDelete}
      size="small"
      style={{ alignSelf: 'center', marginRight: '8px' }}
      variant={isValid ? 'filled' : 'outlined'}
    />
  );
}

export default EmailChip;
