import { Box, Theme, makeStyles } from 'catamaran/core/mui';
import { CatIconButton } from 'catamaran/core';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    height: '5vh',
    width: '5vh'
  },
  line: {
    backgroundColor: theme.palette.primary.main,
    height: '32vh',
    opacity: '0.2',
    width: '3px'
  },
  root: {
    display: 'grid',
    justifyItems: 'center',
    margin: theme.spacing(2, 2, 0, 0)
  }
}));

type Props = {
  className?: string;
  buttonIndex: number;
  disabled?: boolean;
  onButtonClick: (index: number) => void;
};

function LocationLevelAddButton(props: Props) {
  const classes = useStyles();
  const { className, buttonIndex, disabled, onButtonClick } = props;

  const handleClick = () => {
    onButtonClick(buttonIndex);
  };
  return (
    <div className={clsx(classes.root, className)}>
      <Box className={classes.line} />
      <CatIconButton
        className={classes.button}
        color="primary"
        disabled={disabled}
        onClick={handleClick}
      >
        <PlusIcon contained fontSize="large" />
      </CatIconButton>
      <Box className={classes.line} />
    </div>
  );
}

export default LocationLevelAddButton;
