import { CatMenuItem } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { Grid, TextField, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { LocationFilter } from 'store/slices/location/locationFilter/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StyledValidatedTextField from 'components/StyledValidatedTextField';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: { padding: theme.spacing(3, 3, 3, 2) }
}));

type AreaFilterType = 'between' | 'lessThan' | 'moreThan' | 'equals' | '';

export const getFilterTypeFromArea = (minArea: number, maxArea: number) => {
  if (minArea && !maxArea) {
    return 'moreThan';
  }
  if (!minArea && maxArea) {
    return 'lessThan';
  }
  if (minArea && maxArea && minArea === maxArea) {
    return 'equals';
  }
  if (minArea && maxArea) {
    return 'between';
  }
  return '';
};

type Props = {
  className?: string;
  formHelper: FormHelper<LocationFilter>;
};

function LocationAreaFilter(props: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { className, formHelper } = props;
  const [filterType, setFilterType] = useState<AreaFilterType>('between');

  useEffect(() => {
    if (formHelper.formState.values.id) {
      const { minArea, maxArea } = formHelper.formState.values;
      setFilterType(getFilterTypeFromArea(minArea, maxArea));
    }
  }, [formHelper.formState.values]);

  const showMinField =
    filterType === 'between' || filterType === 'moreThan' || filterType === 'equals';

  const showMaxField = filterType === 'between' || filterType === 'lessThan';

  const minLabel =
    filterType === 'between'
      ? t('locations.locationFilter.area_min')
      : t('locations.locationFilter.location_area_title');
  const maxLabel =
    filterType === 'between'
      ? t('locations.locationFilter.area_max')
      : t('locations.locationFilter.location_area_title');

  const handleMinChange = (e: any) => {
    const { value } = e.target;
    formHelper.handleChange({
      target: { name: 'minArea', type: 'number', value }
    });

    if (filterType === 'equals') {
      formHelper.handleChange({
        target: { name: 'maxArea', type: 'number', value }
      });
    }
  };

  const handleFilterTypeChange = (e: any) => {
    const { value } = e.target;
    formHelper.handleChange({
      target: {
        name: 'minArea',
        type: 'number',
        value: 0
      }
    });
    formHelper.handleChange({
      target: {
        name: 'maxArea',
        type: 'number',
        value: 0
      }
    });
    setFilterType(value);
  };

  return (
    <Grid alignItems="flex-end" className={clsx(classes.root, className)} container>
      <Grid container item style={{ marginBottom: '6px' }} xs>
        <Typography>{t('locations.locationFilter.location_area_title')}</Typography>
        <TextField
          onChange={handleFilterTypeChange}
          select
          style={{ width: '100%' }}
          value={filterType}
          variant="outlined"
        >
          <CatMenuItem value="between">
            <em>{t('locations.locationFilter.area_between')}</em>
          </CatMenuItem>
          <CatMenuItem value="lessThan">
            <em>{t('locations.locationFilter.area_less')}</em>
          </CatMenuItem>
          <CatMenuItem value="moreThan">
            <em>{t('locations.locationFilter.area_more')}</em>
          </CatMenuItem>
          <CatMenuItem value="equals">
            <em>{t('locations.locationFilter.area_equals')}</em>
          </CatMenuItem>
        </TextField>
      </Grid>
      {showMinField && (
        <Grid item style={{ paddingLeft: '4px' }} xs>
          <StyledValidatedTextField
            formHelper={formHelper}
            label={minLabel}
            margin="dense"
            name="minArea"
            onChange={handleMinChange}
            type="number"
            variant="outlined"
          />
        </Grid>
      )}
      {showMaxField && (
        <Grid item style={{ paddingLeft: '4px' }} xs>
          <StyledValidatedTextField
            formHelper={formHelper}
            label={maxLabel}
            margin="dense"
            name="maxArea"
            type="number"
            variant="outlined"
          />
        </Grid>
      )}
    </Grid>
  );
}

export default LocationAreaFilter;
