import { PaperProps } from '@mui/material';
import Paper from '../Paper';
import React from 'react';
import clsx from 'clsx';

type Props = PaperProps;

function Panel({ children, className, ...rest }: Props) {
  return (
    <Paper className={clsx(className, 'panel-wrapper w-full py16 px24')} {...rest}>
      {children}
    </Paper>
  );
}

export default Panel;
