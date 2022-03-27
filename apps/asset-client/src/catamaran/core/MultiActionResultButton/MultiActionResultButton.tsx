import { Box, CatTypography } from 'catamaran/core';
import { Button } from '@mui/material';
import React from 'react';
import clsx from 'clsx';
import useStyles, { ColorType } from './styles';

type Props = {
  color: ColorType;
  className?: string;
  description?: string | React.ReactNode;
  primaryAction?: React.ReactNode;
  onClick?: () => void;
  secondaryActions?: React.ReactNode[];
  startIcon?: React.ReactNode;
  title?: string | React.ReactNode;
};

function MultiActionResultButton(props: Props) {
  const {
    color,
    className,
    description,
    primaryAction,
    onClick,
    secondaryActions,
    startIcon,
    title
  } = props;
  const classes = useStyles({ color });

  return (
    <Button className={clsx(classes.root, className)} onClick={onClick} size="large">
      <Box className="MultiActionResultButton-startIcon">{startIcon}</Box>
      <Box>
        <CatTypography variant="subtitle1">{title}</CatTypography>
        <CatTypography variant="body1">{description}</CatTypography>
      </Box>
      <Box className="divider-vertical" style={{ marginRight: 0 }} />
      {secondaryActions}
      <Box className="MultiActionResultButton-mainAction">{primaryAction}</Box>
    </Button>
  );
}

export default MultiActionResultButton;
