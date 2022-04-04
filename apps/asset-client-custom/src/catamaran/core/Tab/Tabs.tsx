import { Tabs as MuiTabs, TabsProps as MuiTabsProps, Theme, styled } from 'catamaran/core/mui';
import React, { ReactNode } from 'react';
import colorMap from 'catamaran/colors/colorMap';
import theme from 'catamaran/theme';

type TabsProps = MuiTabsProps & {
  menu?: boolean;
  autowidth?: boolean;
};

const StyledTabs = styled(MuiTabs)(
  ({
    theme,
    menu,
    autowidth,
    pallette: { gradient }
  }: {
    menu: number;
    autowidth: number;
    theme: Theme;
    pallette: { gradient: any };
  }) => ({
    '& .MuiButtonBase-root': {
      height: menu ? '40px' : '32px',
      maxHeight: menu ? '40px' : '32px',
      minHeight: menu ? '40px' : '32px',
      minWidth: autowidth ? 'auto' : '128px',
      width: autowidth ? 'auto' : '128px'
    },
    '& .MuiTabs-flexContainer': {
      display: autowidth ? 'grid' : 'flex',
      gridAutoFlow: autowidth ? 'column' : '',
      gridGap: '16px'
    },
    '& .MuiTabs-indicator': {
      background: gradient.main,
      borderRadius: theme.spacing(2),
      height: '100%',
      zIndex: 2
    },
    backgroundColor: menu ? 'transparent' : '#f9f9f9',
    borderRadius: theme.spacing(2),
    height: menu ? '40px' : '32px',
    maxHeight: menu ? '40px' : '32px',
    minHeight: menu ? '40px' : '32px',
    zIndex: 1
  })
);

const Tabs = (props: TabsProps, ref: React.Ref<any>) => {
  const { className, children, menu = false, autowidth = false, value, ...rest } = props;

  const childValue = children[value as keyof ReactNode] as any;
  const childProps = childValue?.props as any;
  const color = childProps?.color || 'blue';
  const pallette = colorMap(color);

  return (
    <StyledTabs
      autowidth={autowidth ? 1 : 0}
      className={className}
      menu={menu ? 1 : 0}
      pallette={pallette}
      ref={ref}
      theme={theme}
      value={value}
      {...rest}
    >
      {children}
    </StyledTabs>
  );
};

export default React.forwardRef(Tabs);
