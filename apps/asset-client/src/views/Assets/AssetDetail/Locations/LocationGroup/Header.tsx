import { Box } from 'catamaran/core';
import { CircularProgress, Typography } from 'catamaran/core/mui';
import { Location } from 'store/slices/asset/locations/types';
import { Trans, useTranslation } from 'react-i18next';
import { selectLocationLevel } from 'store/slices/asset/locations/selectors';
import { useStyles } from './styles';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';

type Props = {
  parentLocation: Location;
  locationLevelId: string;
  loading?: boolean;
};

function Header(props: Props) {
  const classes = useStyles();
  const { parentLocation, locationLevelId, loading = false } = props;

  const { t } = useTranslation();
  const locationLevel = useTypedSelector((state) => selectLocationLevel(state, locationLevelId));

  let headerText: React.ReactElement;

  if (loading) {
    headerText = <></>;
  } else if (!locationLevel) {
    headerText = <b>{t('assets.locations.no_locations')}</b>;
  } else if (parentLocation) {
    headerText = (
      <Trans
        components={{ bold: <b /> }}
        i18nKey="assets.locations.sub_locations_title"
        t={t}
        values={{
          locationLevelName: locationLevel.name,
          locationName: parentLocation.name
        }}
      />
    );
  } else {
    headerText = <b>{locationLevel?.name ?? ''}</b>;
  }

  return (
    <Box px={1} width="100%">
      <Box flex flexDirection="row" justifyContent="space-between" sx={{ height: '48px' }}>
        <Box width={16} />
        <Box alignItems="center" flex>
          <Typography variant="body1">{headerText}</Typography>
        </Box>
        <Box center flex width={16}>
          {loading && <CircularProgress size={16} variant="indeterminate" />}
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
