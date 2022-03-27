import { FormHelper } from 'hooks/useFormState';
import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { LocationFilter } from 'store/slices/location/locationFilter/types';
import { getLocationLevels } from 'store/slices/location/locationLevels/actions';
import { selectDisplayedLocationLevels } from 'store/slices/location/locationLevels/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import MultiSelector from 'components/MultiSelector/MultiSelector';
import React, { useEffect } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 3, 3, 2)
  }
}));

type Props = {
  className?: string;
  formHelper: FormHelper<LocationFilter>;
};

function LocationLevel(props: Props) {
  const classes = useStyles();
  const { className, formHelper } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const locationLevels = useTypedSelector(selectDisplayedLocationLevels);
  const selectedLevels = formHelper.formState.values.locationLevelIds ?? [];

  useEffect(() => {
    dispatch(getLocationLevels());
  }, [dispatch]);

  const handleChange = (e: any) => {
    formHelper.handleChange({
      target: {
        name: 'locationLevelIds',
        value: (e.target.value as string[]).map((id) => +id)
      }
    });
  };

  return (
    <Grid className={clsx(classes.root, className)} container>
      <Typography>{t('locations.locationFilter.location_level_field')}</Typography>
      <MultiSelector
        displayProp="name"
        items={locationLevels}
        onChange={handleChange}
        primaryKey="id"
        renderValueString="locations.locationFilter.location_level_hint"
        selectedIds={selectedLevels.map(String)}
      />
    </Grid>
  );
}

export default LocationLevel;
