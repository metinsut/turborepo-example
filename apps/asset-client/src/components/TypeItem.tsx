import { Box, CatToggleCard } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '152px',
    width: '240px'
  }
}));

type Props = {
  className?: string;
  description: string | React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  typeIcon: React.ReactNode;
  typeName: string;
  wideIcon?: boolean;
};

function TypeItem(props: Props) {
  const { className, description, onClick, selected, typeIcon, typeName, wideIcon } = props;

  const classes = useStyles();

  return (
    <CatToggleCard className={clsx(classes.root, className)} onClick={onClick} selected={selected}>
      <div className="flex flex-auto-flow-column justify-content-start h-full w-full">
        <Box
          alignItems={wideIcon ? 'flex-start' : 'center'}
          flex
          flexDirection={wideIcon ? 'column' : 'row'}
          mb={2}
          mr={6}
        >
          {typeIcon}
          <Box width="8px" />
          <Typography variant="subtitle1">
            <b>{typeName}</b>
          </Typography>
        </Box>
        <Typography variant="body1">{description}</Typography>
      </div>
    </CatToggleCard>
  );
}

export default TypeItem;
