import { useCardContext } from '../useCardContext';
import Box, { Props as BoxProps } from '../../Box';
import React from 'react';

export type Props = BoxProps;

function MainContent(props: Props) {
  const { children, onClick, ...rest } = props;
  const { hovered, disabled } = useCardContext();

  const handleClick = (e: any) => {
    if (!disabled) {
      onClick?.(e);
    }
  };

  return (
    <Box
      cursor={!!onClick}
      onClick={handleClick}
      opacity={hovered ? 1 : 0.8}
      p={1}
      position="relative"
      style={{ transition: 'all 0.3s ease-out' }}
      width={1}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default MainContent;
