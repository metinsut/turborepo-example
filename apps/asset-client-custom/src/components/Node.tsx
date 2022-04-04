import { Box } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  filledItem: {
    backgroundColor: theme.palette.darkGrey.main,
    borderRadius: theme.spacing(3),
    margin: theme.spacing(0.2),
    padding: theme.spacing(0.4, 0.8)
  },
  filledText: {
    color: 'white',
    textAlign: 'center'
  },
  item: {
    border: '1px solid #494949',
    borderRadius: theme.spacing(3),
    margin: theme.spacing(0.2),
    padding: theme.spacing(0.4, 0.8)
  },
  nodes: {
    height: '16px'
  },
  root: {},
  text: {
    color: theme.palette.darkGrey.main,
    textAlign: 'center'
  }
}));

type NodeProps = {
  className?: string;
  filled?: boolean;
  value?: string | React.ReactNode;
};

function Node(props: NodeProps) {
  const { className, filled, value } = props;

  const classes = useStyles();
  return (
    <Box
      center
      className={clsx(filled ? classes.filledItem : classes.item, classes.nodes, className)}
      flex
    >
      <Typography className={filled ? classes.filledText : classes.text} noWrap variant="caption">
        {value}
      </Typography>
    </Box>
  );
}

export default Node;
