import { List, Theme, Typography, makeStyles, useMediaQuery } from 'catamaran/core/mui';
import { NavigationGroup } from './navigations';
import { useTranslation } from 'react-i18next';
import NavItem from 'components/NavItem';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%'
  },
  subHeaderLarge: {
    color: theme.palette.darkGrey[600],
    fontSize: '11px',
    lineHeight: '15.47px',
    padding: '34px 0 10px 13px'
  },
  subHeaderSmall: {
    color: theme.palette.darkGrey[600],
    fontSize: '8px',
    lineHeight: '11.25px',
    padding: '34px 0 8px 0'
  }
}));

type Props = {
  className?: string;
  navigation: NavigationGroup;
};

function NavbarList(props: Props) {
  const classes = useStyles();
  const { className, navigation } = props;
  const { t } = useTranslation();

  const showLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const subHeader = t(navigation.subheader);
  const subHeaderShort = t(navigation.subheader_short);

  return (
    <List className={clsx(classes.root, className)}>
      {subHeader && (
        <Typography
          align={showLarge ? 'left' : 'center'}
          className={clsx({
            [classes.subHeaderSmall]: !showLarge,
            [classes.subHeaderLarge]: showLarge
          })}
          noWrap
        >
          {showLarge ? subHeader : subHeaderShort}
        </Typography>
      )}
      {navigation.items.map((item) => (
        <NavItem
          disabled={item.disabled}
          href={item.href}
          icon={item.icon}
          key={item.href}
          title={t(item.title)}
        />
      ))}
    </List>
  );
}

export default NavbarList;
