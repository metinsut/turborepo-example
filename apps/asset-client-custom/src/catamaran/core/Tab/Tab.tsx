import { Tab as MuiTab, TabProps, Theme, styled } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';
import colorMap, { Colors } from 'catamaran/colors/colorMap';
import theme from 'catamaran/theme';

const StyledTab = styled(MuiTab)(
  ({ pallette: { solid }, theme }: { pallette: { gradient: any; solid: any }; theme: Theme }) => ({
    '&.Mui-selected': {
      '&:hover': {
        color: 'white'
      },
      color: 'white',
      opacity: 0.8
    },
    '&:hover': {
      // background: gradient['100'],
      background: solid['100'],
      color: solid.main,
      opacity: 1
    },
    borderRadius: theme.spacing(2),
    color: theme.palette.darkGrey.main,
    fontSize: '11px',
    gridGap: '4px',
    height: '40px',
    maxHeight: '40px',
    minHeight: '40px',
    opacity: 0.6,
    overflow: 'initial',
    padding: 0,
    textTransform: 'none',
    transition: 'all 0.3s ease-out',
    zIndex: 3
  })
);

export type Props = TabProps & {
  color?: Colors;
};

const Tab = (props: Props, ref: React.Ref<any>) => {
  const { className, color = 'blue', ...rest } = props;

  const pallette = colorMap(color);

  return (
    <StyledTab
      className={clsx(className, 'tab-divider')}
      disableRipple
      pallette={pallette}
      ref={ref}
      theme={theme}
      {...rest}
    />
  );
};

export default React.forwardRef(Tab);
