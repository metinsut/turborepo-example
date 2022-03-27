import { Box } from 'catamaran/core';
import { Theme, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

type StyleProps = {
  reverseColors?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  chipMedium: {
    height: '24px',
    padding: '3px 6px'
  },
  chipSmall: {
    height: '12px',
    padding: '0 6px'
  },
  defaultStyling: {
    border: '1px solid',
    borderColor: (props: StyleProps) => (props.reverseColors ? '#F3F5F6' : 'rgba(73, 73, 73, 0.8)')
  },
  errorStyling: {
    '& p': {
      color: '#F3F5F6'
    },
    background: theme.palette.redGradient.main
  },
  filledStyling: {
    '& p': {
      color: (props: StyleProps) => (props.reverseColors ? '#494949' : '#F3F5F6')
    },
    backgroundColor: (props: StyleProps) => (props.reverseColors ? '#F3F5F6' : '#494949')
  }
}));

export type ToggleCardChipProps = {
  className?: string;
  error?: boolean;
  filled?: boolean;
  reverseColors?: boolean;
  size?: 'small' | 'medium';
  text?: string | React.ReactNode;
};

function ToggleCardChip(props: ToggleCardChipProps) {
  const { className, error = false, filled, reverseColors, size = 'medium', text = '' } = props;
  const classes = useStyles({ reverseColors });

  return (
    <Box
      borderRadius="8px"
      center
      className={clsx({
        [className]: true,
        [classes.defaultStyling]: !filled && !error,
        [classes.errorStyling]: error,
        [classes.filledStyling]: filled && !error,
        [classes.chipMedium]: size === 'medium',
        [classes.chipSmall]: size === 'small',
        noStyling: filled && !error
      })}
      flex
      maxWidth="100%"
      width="fit-content"
    >
      <Tooltip enterDelay={1000} enterNextDelay={1000} title={text}>
        <Typography
          noWrap
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          variant={size === 'medium' ? 'body1' : 'caption'}
        >
          {text}
        </Typography>
      </Tooltip>
    </Box>
  );
}

export default ToggleCardChip;
