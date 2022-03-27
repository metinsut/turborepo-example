import { Button, Theme, makeStyles } from 'catamaran/core/mui';
import PhotoIcon from 'catamaran/icons/Photo';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.blueGradient.main,
    border: '3px',
    borderRadius: '50%',
    height: '72px !important',
    opacity: 0.1,
    width: '72px !important'
  }
}));

type Props = {
  className?: string;
};

function ImageSelectorRoundButton(props: Props) {
  const classes = useStyles();
  const { className } = props;

  return (
    <Button className={clsx(classes.root, className)}>
      <PhotoIcon color="lightBlue" contained={false} fontSize="large" hoverable={false} />
    </Button>
  );
}

export default ImageSelectorRoundButton;
