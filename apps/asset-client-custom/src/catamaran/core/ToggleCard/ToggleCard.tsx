import { Theme, ToggleButton } from '@mui/material';
import { ToggleButtonProps } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';
import useHover from 'hooks/useHover';

type StyleProps = { disabled: boolean; keepIconColor: boolean };
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiToggleButton-root': {
      '& > *': {
        opacity: 0.6
      },
      '&.Mui-selected': {
        '& + &': {
          borderLeft: '1px solid transparent',
          marginLeft: '4px'
        },
        '& .MuiSvgIcon-root:not(.noStyling .MuiSvgIcon-root)': {
          color: (props: StyleProps) => !props.keepIconColor && theme.palette.lightGrey.main
        },
        '& > *': {
          opacity: 1
        },
        '& p:not(.noStyling p), h6:not(.noStyling h6), span:not(.noStyling span), h2:not(.noStyling h2)':
          {
            color: theme.palette.lightGrey.main
          },
        '&:hover': {
          backgroundColor: theme.palette.darkGrey[800],
          border: '1px solid transparent',
          boxShadow: '0px 2px 4px 0px rgba(73, 73, 73, 0.1)'
        },
        backgroundColor: theme.palette.darkGrey[800],
        border: '1px solid transparent',
        boxShadow: '0px 2px 4px 0px rgba(73, 73, 73, 0.1)'
      },
      '&:hover': {
        '& > *': {
          opacity: 1
        },
        backgroundColor: theme.palette.darkGrey[200],
        border: '1px solid rgba(73, 73, 73, 0.6)',
        boxShadow: '0px 1px 2px 0px rgba(73, 73, 73, 0.1)'
      },
      '&:hover:not(.Mui-disabled)': {
        cursor: (props: StyleProps) => (props.disabled ? 'default' : 'pointer')
      },
      backgroundColor: theme.palette.darkGrey[100],
      border: '1px solid rgba(73, 73, 73, 0.1)',
      borderRadius: theme.spacing(2),
      margin: theme.spacing(0.5),
      padding: '16px',
      textAlign: 'left',
      textTransform: 'none',
      transition: 'all 0.3s ease-out'
    }
  }
}));
type RenderChildrenType = (hovered: boolean) => React.ReactNode;
type Props = Omit<ToggleButtonProps, 'children' | 'value'> & {
  children?: React.ReactNode | RenderChildrenType;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  keepIconColor?: boolean;
};

function ToggleCard(props: Props, ref: React.Ref<any>) {
  const { children, className, disabled, onClick, selected, keepIconColor, ...rest } = props;

  const classes = useStyles({ disabled, keepIconColor });
  const [hovered, hoverProps] = useHover();

  return (
    <ToggleButton
      className={clsx(classes.root, className)}
      disableRipple={disabled}
      onClick={!disabled ? onClick : undefined}
      ref={ref}
      selected={!disabled && selected}
      value="togglebutton"
      {...hoverProps}
      {...rest}
    >
      {typeof children === 'function' ? (children as RenderChildrenType)(hovered) : children}
    </ToggleButton>
  );
}

export default React.forwardRef(ToggleCard);
