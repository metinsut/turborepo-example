import { CatTypography } from 'catamaran/core';
import { ReactNode } from 'react';
import { makeStyles } from '@mui/styles';
import CatButton, { ButtonProps } from '..';
import PlusIcon from '../../../icons/Plus';
import clsx from 'clsx';
import useHover from 'hooks/useHover';

type StyleProps = {
  disabled?: boolean;
};

const useStyles = makeStyles(() => ({
  root: {
    '&:hover': {
      border: 'solid 1px transparent'
    },
    border: (props: StyleProps) =>
      props.disabled ? 'dashed 2px rgba(73, 73, 73, 0.1)' : 'dashed 1px rgba(105,201,255,0.6)',
    height: '40px',
    justifyContent: 'flex-start',
    width: '100%'
  }
}));

export type Props = Omit<ButtonProps, 'startIcon'> & {
  startIcon?: ReactNode | ((hovered: boolean) => ReactNode);
};

function AreaButton(props: Props) {
  const {
    className,
    children,
    disabled,
    color = 'blue',
    size = 'large',
    startIcon,
    transformText = false,
    ...rest
  } = props;
  const classes = useStyles({ disabled });

  const [hover, hoverProps] = useHover();

  const calculatedStartIcon = (typeof startIcon === 'function'
    ? (startIcon(hover) as ReactNode)
    : startIcon) ?? <PlusIcon />;

  return (
    <CatButton
      className={clsx(classes.root, className)}
      color={color}
      disabled={disabled}
      size={size}
      startIcon={calculatedStartIcon}
      transformText={transformText}
      {...hoverProps}
      {...rest}
    >
      <CatTypography color="inherit" variant="subtitle1">
        {children}
      </CatTypography>
    </CatButton>
  );
}

export default AreaButton;
