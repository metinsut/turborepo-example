import { forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import clsx from 'clsx';

type Props = MuiMenuItemProps & {
  className?: string;
  width?: string;
  dense?: boolean;
  selected?: boolean;
};

const StyledMenuItem = styled(MuiMenuItem)<Props>(({ theme, dense, width }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.green[100]
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.green[200]
  },
  '&:hover': {
    backgroundColor: theme.palette.darkGrey[100]
  },
  gridTemplateColumns: 'auto 1fr auto',
  minHeight: dense ? '25px' : '32px',
  padding: dense ? '6px 16px' : '8px 16px',
  transition: 'background 0.3s ease-out',
  width: width ?? 'auto',
  [theme.breakpoints.up('sm')]: {
    minHeight: dense ? '25px' : '32px'
  }
}));

const MenuItem = (props: Props, ref: any) => {
  const { className, children, width, dense, selected, ...rest } = props;

  return (
    <StyledMenuItem
      className={clsx({ [className]: true, 'grid align-items-center gap-16': true })}
      dense={dense}
      ref={ref}
      selected={selected}
      width={width}
      {...rest}
    >
      {children}
    </StyledMenuItem>
  );
};

export default forwardRef(MenuItem);
