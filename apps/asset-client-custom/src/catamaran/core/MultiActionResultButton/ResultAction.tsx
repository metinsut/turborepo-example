import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      '&:hover': {
        backgroundColor: theme.palette.lightGrey[800]
      },
      backgroundColor: theme.palette.darkGrey[100],
      color: theme.palette.darkGrey[800],
      transition: '0.25s'
    },
    borderRadius: theme.spacing(2),
    marginLeft: theme.spacing(1),
    position: 'relative'
  }
}));

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function ResultAction(props: Props) {
  const classes = useStyles();
  const { className, children, onClick } = props;
  const rippleRef = React.useRef(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    rippleRef.current.start(event);
  };
  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    rippleRef.current.stop(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClick?.();
  };

  return (
    <div
      className={clsx(classes.root, className)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <TouchRipple center={false} ref={rippleRef} />
      {children}
    </div>
  );
}

export default ResultAction;
