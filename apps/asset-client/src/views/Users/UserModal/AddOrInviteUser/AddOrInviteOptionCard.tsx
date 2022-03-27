import { Box, CatRadio, CatToggleCard } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%'
  }
}));

type Props = {
  className?: string;
  description?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  selected?: boolean;
  title: string;
};

function AddOrInviteOptionCard(props: Props) {
  const classes = useStyles();
  const { className, description, disabled, icon, onClick, selected, title } = props;

  return (
    <CatToggleCard
      className={clsx(classes.root, className)}
      disabled={disabled}
      onClick={onClick}
      selected={selected}
      style={{ height: 144 }}
    >
      <Box flex flexDirection="column" height="100%" justifyContent="space-between" width="100%">
        <Box alignItems="center" flex>
          <CatRadio checked={selected} />
          <Typography variant="h2">{title}</Typography>
        </Box>
        <Typography variant="body1">{description}</Typography>
        {icon}
      </Box>
    </CatToggleCard>
  );
}

export default AddOrInviteOptionCard;
