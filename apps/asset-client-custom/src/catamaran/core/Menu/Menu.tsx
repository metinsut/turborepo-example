import { forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from './MenuItem';
import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import clsx from 'clsx';

const StyledMenu = styled(MuiMenu)<Props>(({ width }) => ({
  '& .MuiMenu-list': {
    maxWidth: '560px',
    width: width || 'auto'
  }
}));

type Props = MuiMenuProps & {
  addEmptyFirstItem?: boolean;
  className?: string;
  width?: string;
};

const Menu = (props: Props, ref: any) => {
  const {
    addEmptyFirstItem = false,
    anchorOrigin,
    children,
    className,
    transformOrigin,
    width,
    ...rest
  } = props;
  return (
    <StyledMenu
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom', ...anchorOrigin }}
      classes={{
        list: clsx(className, 'py8'),
        paper: 'radius-16'
      }}
      ref={ref}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
        ...transformOrigin
      }}
      width={width}
      {...rest}
    >
      {addEmptyFirstItem && <MenuItem style={{ height: '0', minHeight: '0', padding: '0' }} />}
      {children}
    </StyledMenu>
  );
};

export default forwardRef(Menu);
