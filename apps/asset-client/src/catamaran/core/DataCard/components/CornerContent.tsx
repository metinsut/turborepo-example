import Box, { Props as BoxProps } from '../../Box';
import React from 'react';

export type Props = BoxProps;

function CornerContent(props: Props) {
  const { children, ...rest } = props;

  return (
    <Box bottom={8} position="absolute" right={8} {...rest}>
      {children}
    </Box>
  );
}

export default CornerContent;
