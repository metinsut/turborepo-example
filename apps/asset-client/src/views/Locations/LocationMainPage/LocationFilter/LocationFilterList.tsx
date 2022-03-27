import { CatMenuItem } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { LocationFilter } from 'store/slices/location/locationFilter/types';
import { TextField } from 'catamaran/core/mui';
import { dequal } from 'dequal';
import { getLocationFilters } from 'store/slices/location/locationFilter/actions';
import { selectAllFilters } from 'store/slices/location/locationFilter/selectors';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import clsx from 'clsx';

type Props = {
  className?: string;
  formHelper: FormHelper<LocationFilter>;
};

function LocationFilterList(props: Props) {
  const { className, formHelper } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const locationFilters = useTypedSelector(selectAllFilters);

  useEffect(() => {
    dispatch(getLocationFilters());
  }, [dispatch]);

  useEffect(() => {
    const formValues = formHelper.formState.values;
    if (formValues.id) {
      const selectedFilter = locationFilters.find((filter) => filter.id === formValues.id);

      if (!dequal(selectedFilter, formValues)) {
        formHelper.handleChange({
          target: { name: 'id', value: null }
        });
        formHelper.handleChange({
          target: { name: 'name', value: '' }
        });
      }
    }
  }, [formHelper, locationFilters]);

  const handleFilterSelected = (e: any) => {
    const selectedId: string = e.target.value;
    const filter = locationFilters.find((filter) => filter.id === selectedId);
    formHelper.reset(filter);
  };

  return (
    <TextField
      className={clsx('w-full', className)}
      label={t('locations.locationFilter.saved_filters')}
      onChange={handleFilterSelected}
      select
      value={formHelper.formState.values.id ?? ''}
      variant="outlined"
    >
      {locationFilters.map((filter) => (
        <CatMenuItem key={filter.id} value={filter.id}>
          <em>{filter.name}</em>
        </CatMenuItem>
      ))}
    </TextField>
  );
}

export default LocationFilterList;
