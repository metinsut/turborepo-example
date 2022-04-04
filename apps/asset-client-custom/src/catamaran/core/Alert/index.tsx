import { Box, CatIconButton } from 'catamaran/core';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from 'catamaran/icons/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';
import WarningIcon from 'catamaran/icons/Warning';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiAlert-action': {
      padding: 0
    },
    '& .MuiAlert-icon, .MuiAlert-message': {
      alignItems: 'center',
      display: 'flex',
      padding: 0
    },
    '& .MuiDivider-root': {
      backgroundColor: theme.palette.darkGrey.main,
      height: '16px',
      margin: theme.spacing(0, 2)
    },
    '&.MuiAlert-filledError': {
      '& .MuiAlert-icon, .MuiAlert-message': {
        '& .MuiDivider-root': {
          backgroundColor: theme.palette.lightGrey.main
        },
        '& h6': {
          color: theme.palette.lightGrey.main
        }
      },
      background: theme.palette.redGradient.main
    },
    '&.MuiAlert-filledInfo': {
      background: theme.palette.lightGrey.main,
      border: `1px solid ${theme.palette.darkGrey.main}`
    },
    '&.MuiAlert-filledSuccess': {
      background: theme.palette.lightGrey.main,
      border: `1px solid ${theme.palette.green.main}`
    },
    '&.MuiAlert-filledWarning': {
      '& .MuiAlert-icon, .MuiAlert-message': {
        '& h6': {
          color: theme.palette.red.main
        }
      },
      background: theme.palette.lightGrey.main,
      border: `1px solid ${theme.palette.red.main}`
    },
    borderRadius: '20px',
    boxShadow: '0px 8px 16px rgba(73, 73, 73, 0.1)',
    height: '40px'
  },
  warningIcon: {
    background: theme.palette.redGradient.main,
    border: '1px solid white',
    borderRadius: '16px',
    height: '10px',
    width: '10px'
  }
}));

type Props = AlertProps & {
  className?: string;
};

function Alert(props: Props, ref: React.Ref<any>) {
  const classes = useStyles();
  const { className, onClose, severity, variant = 'filled', ...rest } = props;

  const defaultAction = (
    <CatIconButton onClick={onClose}>
      <CloseIcon color="darkGrey" />
    </CatIconButton>
  );

  const iconMapping = {
    error: <WarningIcon color="lightGrey" contained={false} hoverable={false} />,
    info: <Box className={classes.warningIcon} />,
    success: <></>,
    warning: <></>
  };

  return (
    <MuiAlert
      action={defaultAction}
      className={clsx(classes.root, className)}
      iconMapping={iconMapping}
      ref={ref}
      severity={severity}
      variant={variant}
      {...rest}
    />
  );
}

export default React.forwardRef(Alert);
