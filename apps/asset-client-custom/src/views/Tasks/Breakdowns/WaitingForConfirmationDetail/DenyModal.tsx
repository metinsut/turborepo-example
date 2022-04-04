import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { DenyBreakdown } from 'store/slices/breakdown/common/types';
import { GoBackButton } from 'catamaran/core/Button';
import { denyBreakdown } from 'store/slices/breakdown/waitingForConfirmation/action';
import { maxDefinitionCharacterCount } from 'store/slices/breakdown/open/data';
import { useFormState, useTypedDispatch } from 'hooks';
import { useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import RemainingCharacters from 'components/RemainingCharacters';
import denyBreakdownValidator from 'helpers/validations/Breakdown/DenyBreakdownValidator';

type Props = {
  breakdownId: string;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

function DenyModal({ breakdownId, open, onClose, onConfirm }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const formHelper = useFormState<DenyBreakdown>({ explanation: '' }, denyBreakdownValidator);

  const handleGoBack = () => {
    formHelper.reset({ explanation: '' });
    onClose?.();
  };

  const handleDeny = async () => {
    await dispatch(denyBreakdown(breakdownId, formHelper.formState.values));
    formHelper.reset({ explanation: '' });
    onClose?.();
    onConfirm?.();
  };

  return (
    <CatDialog onAction={handleDeny} onClose={handleGoBack} open={open}>
      <CatDialogTitle iconComponent={CancelIcon} title={t('tasks.breakdowns.deny_modal.title')} />
      <CatDialogContent>
        <div className="grid gap-24">
          <CatTypography variant="body1">
            {t('tasks.breakdowns.deny_modal.description')}
          </CatTypography>
          <div className="grid gap-8">
            <CatamaranTextField
              className="w-full h-full"
              formHelper={formHelper}
              label={t('tasks.breakdowns.deny_modal.explanation_field')}
              mode="editOnly"
              multiline
              name="explanation"
              rows={5}
            />
            <RemainingCharacters
              className="justify-self-end"
              currentCount={formHelper.formState.values.explanation.length}
              maxCount={maxDefinitionCharacterCount}
            />
          </div>
        </div>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton
          color="red"
          disabled={!formHelper.formState.isValid}
          endIcon={<CancelIcon />}
          size="large"
          variant="action"
        >
          {t('common.deny_request')}
        </CatDialogButton>
      </CatDialogAction>
    </CatDialog>
  );
}

export default DenyModal;
