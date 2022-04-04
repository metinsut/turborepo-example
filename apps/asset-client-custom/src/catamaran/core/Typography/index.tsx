import { Typography as MUITypography, TypographyProps as TP } from '@mui/material';
import { forwardRef } from 'react';
import clsx from 'clsx';

export type TypographyProps = TP & {
  noBreak?: boolean;
};
function Typography({ className, noBreak = false, ...rest }: TypographyProps, ref: React.Ref<any>) {
  return (
    <MUITypography className={clsx(noBreak ? '' : 'break-word', className)} ref={ref} {...rest} />
  );
}

export default forwardRef(Typography);
