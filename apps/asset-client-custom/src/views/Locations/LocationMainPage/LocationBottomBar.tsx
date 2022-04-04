import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectSearchResultCount } from 'store/slices/location/locationFilter/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BottomBar from 'components/BottomBar';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(5),
    width: '100%'
  }
}));

type Props = {
  className?: string;
  searchModeActive: boolean;
};

function LocationBottomBar(props: Props) {
  const classes = useStyles();
  const { className, searchModeActive } = props;
  const { t } = useTranslation();

  const searchResultCount = useTypedSelector(selectSearchResultCount);

  return (
    searchModeActive && (
      <BottomBar
        className={clsx(classes.root, className)}
        textElement={t('locations.locationFilter.search_result', { count: searchResultCount })}
      />
    )
  );
}

export default LocationBottomBar;
