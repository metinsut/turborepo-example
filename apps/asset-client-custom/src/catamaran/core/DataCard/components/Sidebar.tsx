import { useCardContext } from '../useCardContext';
import Box, { Props as BoxProps } from '../../Box';
import React, { ReactNode } from 'react';

export type Props = BoxProps & {
  children?: ReactNode;
};

function Sidebar(props: Props) {
  const { children, ...rest } = props;
  const { color, hovered } = useCardContext();

  return (
    <Box
      alignSelf="stretch"
      // background={hovered ? color.gradient.main : color.gradient[100]}
      borderRadius="16px"
      flex
      flexDirection="column"
      justifyContent="space-between"
      opacity={hovered ? 0.8 : 1}
      p={0.5}
      style={{
        backgroundColor: hovered ? color.solid.main : color.solid[100],
        margin: '-1px 0px -1px -1px',
        transition: 'all 0.3s ease-out'
      }}
      width={32}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default Sidebar;
