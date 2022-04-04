import { Box } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  bottomIcon: {
    marginTop: '40px',
    position: 'absolute'
  },
  chip: {
    border: '1px solid rgba(73, 73, 73, 0.8)',
    borderRadius: theme.spacing(1),
    height: '40px',
    width: '40px'
  },
  root: {
    width: '48px'
  }
}));

type Props = {
  className?: string;
  description: string;
  icon: React.ReactNode;
  value: number;
};

function InformationChip(props: Props) {
  const classes = useStyles();
  const { className, description, icon, value } = props;

  return (
    <Box center className={clsx(classes.root, className)} flex flexDirection="column">
      <Box center className={classes.chip} flex>
        <Typography variant="h2">{value}</Typography>
        <Box className={classes.bottomIcon}>{icon}</Box>
      </Box>
      <Box mt="10px" textAlign="center">
        <Typography variant="caption">{description}</Typography>
      </Box>
    </Box>
  );
}

export default InformationChip;
