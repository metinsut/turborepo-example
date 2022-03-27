import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatTypography
} from 'catamaran/core';
import { ConfirmButton, GoBackButton } from 'catamaran/core/Button';
import { LocationFilter } from 'store/slices/location/locationFilter/types';
import { saveLocationFilter } from 'store/slices/location/locationFilter/actions';
import { useFormState, useTypedDispatch, withDialogWrapper } from 'hooks';
import { useTranslation } from 'react-i18next';
import StyledValidatedTextField from 'components/StyledValidatedTextField';
import locationFilterValidator from 'helpers/validations/LocationFilterValidator';

type Props = {
  locationFilter: LocationFilter;
  onClose: () => void;
  open: boolean;
};

function FilterSaveDialog(props: Props) {
  const { locationFilter, onClose, open } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const formHelper = useFormState(locationFilter, locationFilterValidator);

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    }

    formHelper.reset(locationFilter);
  };

  const handleConfirm = async () => {
    const newLocationFilter = formHelper.formState.values;
    await dispatch(saveLocationFilter(newLocationFilter));

    if (onClose) {
      onClose();
    }
  };

  return (
    <CatDialog onAction={handleConfirm} onClose={handleGoBack} open={open}>
      <CatDialogContent>
        <CatTypography className="text-center">
          {t('locations.locationFilter.save_filter_description')}
        </CatTypography>
        <StyledValidatedTextField
          formHelper={formHelper}
          label={t('locations.locationFilter.name_field')}
          margin="dense"
          name="name"
          variant="outlined"
        />
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={ConfirmButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(FilterSaveDialog);
