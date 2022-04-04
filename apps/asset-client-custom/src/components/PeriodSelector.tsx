import * as React from 'react';
import { Box } from 'catamaran/core';
import {
  Fade,
  Theme,
  ToggleButton,
  ToggleButtonProps,
  Typography,
  makeStyles
} from 'catamaran/core/mui';
import { SwitchTransition } from 'react-transition-group';
import Cancel from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import clsx from 'clsx';
import useHover from 'hooks/useHover';

const useStyles = makeStyles((theme: Theme) => ({
  darkGreyIcon: {
    '& .MuiSvgIcon-root': {
      background: `${theme.palette.darkGrey[100]} !important`
    }
  },
  medium: {
    '& .MuiSvgIcon-root': {
      position: 'absolute',
      right: '2px',
      top: '2px'
    },
    '&.MuiToggleButton-root': {
      '& .MuiToggleButton-label': {
        justifyContent: 'left'
      },
      '&.MuiToggleButtonGroup-grouped': {
        borderRadius: theme.spacing(1)
      },
      borderRadius: theme.spacing(1),
      height: 40,
      width: 67
    }
  },
  root: {
    '&.MuiToggleButton-root': {
      '& .MuiTypography-root': {
        color: theme.palette.darkGrey[400],
        transition: 'color 0.3s ease-out',
        whiteSpace: 'pre-line'
      },
      '&.Mui-selected': {
        '& .MuiTypography-root': {
          color: theme.palette.green.main
        },
        '&:hover': {
          '& .MuiTypography-root': {
            color: theme.palette.darkGrey[800]
          },
          backgroundColor: theme.palette.green[100]
        },
        backgroundColor: theme.palette.green[100],
        boxShadow: `0 0 0 0.6pt ${theme.palette.green.main}`
      },
      '&:hover': {
        '& .MuiTypography-root': {
          color: theme.palette.darkGrey[800]
        },
        backgroundColor: theme.palette.green[100]
      },
      backgroundColor: theme.palette.lightGrey.main,
      border: 'none',
      textTransform: 'none'
    },
    marginRight: theme.spacing(1),
    transition: 'all 0.3s ease-out'
  },
  small: {
    '&.MuiToggleButton-root': {
      '& .MuiToggleButton-label': {
        flexDirection: 'column'
      },
      '&.MuiToggleButtonGroup-grouped': {
        borderRadius: theme.spacing(10)
      },
      borderRadius: theme.spacing(10),
      height: 40,
      width: 40
    }
  },
  whiteIcon: {
    '& .MuiSvgIcon-root': {
      background: `${theme.palette.lightGrey.main} !important`,
      filter: 'drop-shadow(0px 1px 2px rgba(73, 73, 73, 0.1))'
    }
  }
}));

export type Props = Omit<ToggleButtonProps, 'value'> & {
  className?: string;
  size?: 'small' | 'medium';
  value?: string;
};

function PeriodSelector(props: Props, ref: React.Ref<any>) {
  const classes = useStyles();
  const [hover, hoverProps] = useHover();
  const { className, size = 'medium', selected, children, value = '', ...rest } = props;

  const showIcon = selected || (size === 'medium' && hover);
  const showCheckIcon = showIcon && !(selected && hover);
  const showCancelIcon = showIcon && selected && hover;

  let icon = 'none';
  if (showCheckIcon) {
    icon = 'check';
  } else if (showCancelIcon) {
    icon = 'cancel';
  }

  return (
    <ToggleButton
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [classes.small]: size === 'small',
        [classes.medium]: size === 'medium',
        [classes.whiteIcon]: size !== 'small' && hover,
        [classes.darkGreyIcon]: size === 'small' && selected && hover
      })}
      ref={ref}
      selected={selected}
      value={value}
      {...hoverProps}
      {...rest}
    >
      <Box center className="flex" flexDirection="column">
        <SwitchTransition>
          <Fade key={icon} timeout={200}>
            <span>
              {icon === 'check' && (
                <CheckIcon color="green" contained fontSize="small" hoverable={false} />
              )}
              {icon === 'cancel' && (
                <Cancel color="darkGrey" contained fontSize="small" hoverable={false} />
              )}
            </span>
          </Fade>
        </SwitchTransition>

        <Typography align="left" component="span" fontWeight={700} variant="body2">
          {children}
        </Typography>
      </Box>
    </ToggleButton>
  );
}

PeriodSelector.displayName = 'BordaToggleButton';
export default React.forwardRef(PeriodSelector);
