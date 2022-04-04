import { CardProvider } from './useCardContext';
import Box, { Props as BoxProps } from '../Box';
import React, { ReactNode } from 'react';
import colorMap, { Colors } from '../../colors/colorMap';
import useHover from 'hooks/useHover';

type RenderChildrenType = (hovered: boolean, computedColor: string) => ReactNode;
export type DataCardProps = Omit<BoxProps, 'color'> & {
  children?: ReactNode | RenderChildrenType;
  color: Colors | ((hovered: boolean) => Colors);
  dashedBorder?: boolean;
  disabled?: boolean;
  minWidth?: number | string;
  size?: 'small' | 'medium';
  transparentBackground?: boolean;
};

function DataCard(props: DataCardProps) {
  const {
    children,
    className,
    minWidth,
    color,
    dashedBorder,
    disabled = false,
    size = 'medium',
    transparentBackground,
    ...rest
  } = props;

  const [hovered, hoverProps] = useHover({ disabled });
  const computedColor = typeof color === 'string' ? color : color(hovered);
  const solidColor = colorMap(computedColor).solid;
  const { gradient } = colorMap(computedColor);

  return (
    <CardProvider value={{ color: colorMap(computedColor), disabled, hovered }}>
      <Box
        alignItems="stretch"
        background={transparentBackground ? 'transparent' : gradient[100]}
        border={`1px ${hovered && dashedBorder ? 'dashed' : 'solid'} ${
          hovered ? solidColor[600] : solidColor[100]
        }`}
        borderRadius="16px"
        className={className}
        flex
        minHeight={size === 'medium' ? 112 : 64}
        minWidth={minWidth || 336}
        row
        style={{
          transition: 'all 0.3s ease-out'
        }}
        {...hoverProps}
        {...rest}
      >
        {typeof children === 'function'
          ? (children as RenderChildrenType)(hovered, solidColor.main)
          : children}
      </Box>
    </CardProvider>
  );
}

export default DataCard;
