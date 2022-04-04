import { DialogWrapperContext } from 'hooks/withDialogWrapper';
import { Popover as MuiPopover, PopoverProps, styled } from '../mui';
import React, { useContext } from 'react';

const StyledPopover = styled(MuiPopover)<Props>(({ width }) => ({
  '& .MuiPopover-paper': {
    borderRadius: '16px',
    fontSize: '11px',
    maxWidth: '560px',
    padding: '10px 0px',
    width: width || 'auto'
  },
  '& .fieldset': {
    width: '100%'
  }
}));

type Props = PopoverProps & {
  children?: React.ReactNode;
  className?: string;
  width?: string;
};

const Popover = (props: Props) => {
  const { anchorOrigin, className, children, transformOrigin, width, TransitionProps, ...rest } =
    props;

  const dialogWrapperContext = useContext(DialogWrapperContext);
  const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    TransitionProps?.onEnter(node, isAppearing);
    dialogWrapperContext?.onTransitionEnter();
  };
  const handleExited = (node: HTMLElement) => {
    TransitionProps?.onExited(node);
    dialogWrapperContext?.onTransitionExited();
  };

  return (
    <StyledPopover
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom', ...anchorOrigin }}
      className={className}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
        ...transformOrigin
      }}
      TransitionProps={{
        ...TransitionProps,
        onEnter: handleEnter,
        onExited: handleExited
      }}
      width={width}
      {...rest}
    >
      {children}
    </StyledPopover>
  );
};

export default Popover;
