import { Box, CatKeyboardSection } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Firm } from 'store/slices/contracts/types';
import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { dequal } from 'dequal';
import { selectInitialFirm } from 'store/slices/contracts/selectors';
import { updateFirm } from 'store/slices/contracts/slice';
import { useDebounce } from 'react-use';
import { useFormState } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import React from 'react';
import firmValidator from 'helpers/validations/FirmValidator';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  firm?: Firm;
  onGoBack: () => void;
  onSave: (firm: Firm) => Promise<Firm>;
  mode?: DisplayType;
};

function Edit(props: Props) {
  const classes = useStyles();
  const { firm, onGoBack, onSave, mode } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const initialFirm = useTypedSelector(selectInitialFirm);

  const formHelper = useFormState(firm, firmValidator);

  const changed = !dequal(firm, initialFirm);

  useDebounce(
    () => {
      const firm = formHelper.formState.values;
      dispatch(updateFirm(firm));
    },
    500,
    [dispatch, formHelper.formState.values]
  );

  const handleCancel = async () => {
    dispatch(updateFirm(initialFirm));
    onGoBack();
  };

  const handleSave = async () => {
    await onSave(formHelper.formState.values);
    onGoBack();
  };

  return (
    <CatKeyboardSection onEnter={handleSave} onEscape={handleCancel} open>
      <>
        <Box mb={2}>
          <Typography variant="body2">{t('contracts.edit.firm_contact_helper')}</Typography>
        </Box>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={6}>
            <CatamaranTextField
              formHelper={formHelper}
              label={t('contracts.edit.firm_field')}
              mode="editOnly"
              name="firmName"
            />
          </Grid>
          <Grid item xs={6}>
            <CatamaranTextField
              formHelper={formHelper}
              label={t('contracts.edit.contact_person_field')}
              mode="editOnly"
              name="contactPerson"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={6}>
            <CatamaranTextField
              formHelper={formHelper}
              isNumericString
              label={t('contracts.edit.phone_field')}
              mode="editOnly"
              name="phone"
            />
          </Grid>
          <Grid item xs={6}>
            <CatamaranTextField
              formHelper={formHelper}
              label={t('contracts.edit.email_field')}
              mode="editOnly"
              name="email"
            />
          </Grid>
        </Grid>
        <KeyboardSectionBottomButtons
          isConfirmDisabled={!formHelper.formState.isValid}
          mode={mode}
          touched={changed}
        />
      </>
    </CatKeyboardSection>
  );
}

export default Edit;
