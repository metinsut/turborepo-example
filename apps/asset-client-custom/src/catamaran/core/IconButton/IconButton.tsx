import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@mui/material';
import { useStyles } from './styles';
import LoadingIcon from 'catamaran/icons/Loading';
import React from 'react';
import clsx from 'clsx';

export type IconButtonProps = MuiIconButtonProps & {
  disableHover?: boolean;
  loading?: boolean;
};

function IconButton(props: IconButtonProps, ref: React.Ref<any>) {
  const classes = useStyles();
  const { className, children, disableHover, loading, disabled, ...rest } = props;

  const childProps = React.isValidElement(children) ? children.props : null;

  return (
    <MuiIconButton
      className={clsx({
        [classes.root]: true,
        IconHoverContainer: !(disableHover ?? false),
        [className]: true
      })}
      disabled={disabled || loading}
      ref={ref}
      {...rest}
    >
      {!loading && children}
      {loading && <LoadingIcon {...childProps} style={{ padding: '1px' }} />}
    </MuiIconButton>
  );
}

export default React.memo(React.forwardRef(IconButton));
