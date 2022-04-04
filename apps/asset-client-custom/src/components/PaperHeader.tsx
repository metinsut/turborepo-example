import { Box } from 'catamaran/core';
import { BoxProps, Collapse, Paper } from 'catamaran/core/mui';
import { useWindowScroll } from 'react-use';
import React from 'react';
import clsx from 'clsx';

type Props = React.PropsWithChildren<Omit<BoxProps, 'flex'> & { style?: React.CSSProperties }>;

// (menu-height) + (breadcrumbs-height) - (top-space)
const stickyLimitPosition = 56 + 62 - 8;
function PaperHeader(props: Props) {
  const { children, className, hidden = false, ...rest } = props;
  const { y } = useWindowScroll();

  return (
    <Collapse
      className={clsx({
        [className]: true,
        'fixed-container': y > stickyLimitPosition && !hidden,
        sticky: y > stickyLimitPosition && !hidden
      })}
      in={!hidden}
    >
      <Box
        alignItems="center"
        borderRadius="16px"
        boxShadow={2}
        component={Paper}
        display="flex"
        height="48px"
        mb={1}
        px={1}
        {...rest}
      >
        {children}
      </Box>
    </Collapse>
  );
}

export default PaperHeader;
