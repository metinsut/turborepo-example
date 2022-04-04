import { Box, CatIconButton, CatTooltip, CatTypography } from 'catamaran/core';
import { Button, ButtonProps, Theme, styled, useMediaQuery } from 'catamaran/core/mui';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import React, { useMemo } from 'react';
import clsx from 'clsx';

interface ActivabeButton extends ButtonProps {
  activeClassName?: string;
  component?: React.ElementType;
  exact?: boolean;
  strict?: boolean;
  to?: string;
}

const StyledButton = styled(Button)<ActivabeButton>(({ theme }) => ({
  '&.active': {
    background: 'rgba(243, 245, 246, 0.8)',
    boxShadow: `0px 1px 2px rgba(73, 73, 73, 0.1)`,
    opacity: 0.8
  },
  '&.button-leaf': {
    '&.depth-0': {
      color: theme.palette.darkGrey[600],
      fontWeight: theme.typography.fontWeightMedium
    },
    color: theme.palette.darkGrey[600],
    fontWeight: theme.typography.fontWeightMedium
  },
  '.expand-icon': {
    height: '16px',
    marginLeft: 'auto',
    width: '16px'
  },
  justifyContent: 'flex-start',
  opacity: 0.6,
  padding: '2px',
  textTransform: 'none',
  width: '100%'
}));

type Props = {
  title: string;
  icon?: (props: IconBaseProps) => React.ReactElement;
  href?: string;
  className?: string;
  disabled?: boolean;
};

function NavItem({ disabled = false, title, href, icon: Icon, className, ...rest }: Props) {
  const history = useHistory();
  const showLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const isMatched = useMemo(() => {
    const path = history.location.pathname.split('/')[1];
    const hrefPath = href.split('/')[1];
    return path === hrefPath;
  }, [history.location.pathname, href]);

  return (
    <Box
      {...rest}
      center
      className={className}
      display="flex"
      key={title}
      mb={1}
      pb={0}
      pl={showLarge ? '10px' : 0}
      pt={0}
    >
      {showLarge ? (
        <StyledButton
          activeClassName="active"
          className={clsx('button-leaf')}
          component={RouterLink}
          disabled={disabled}
          startIcon={Icon && <Icon color="darkGrey" hoverable={false} />}
          strict
          style={{ width: '100%' }}
          to={href}
        >
          <CatTypography noWrap variant="body2">
            {title}
          </CatTypography>
        </StyledButton>
      ) : (
        <CatTooltip placement="right" title={title}>
          <span>
            <CatIconButton
              disabled={disabled}
              onClick={() => history.push(href)}
              style={{ opacity: 0.6 }}
            >
              <Icon alwaysHovered={isMatched} color="darkGrey" />
            </CatIconButton>
          </span>
        </CatTooltip>
      )}
    </Box>
  );
}

export default NavItem;
