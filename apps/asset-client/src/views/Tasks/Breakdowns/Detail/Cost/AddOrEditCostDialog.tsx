import { BreakdownCost } from 'store/slices/breakdown/common/types';
import {
  BreakdownCostType,
  selectAllBreakdownCostTypes,
  selectCostTypeDisplayValue
} from 'store/slices/taskConfiguration/breakdown/breakdownCosts';
import { CancelButton, ContinueButton, GoBackButton } from 'catamaran/core/Button';
import {
  CatAreaButton,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTextField,
  CatTypography
} from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { addBreakdownCost, updateBreakdownCost } from 'store/slices/breakdown/taskDetail/action';
import { initialBreakdownCost } from 'store/slices/breakdown/taskDetail/data';
import { showSaveSuccessSnackbar } from 'store/slices/application';
import { useDialogState, useFormState, useTypedDispatch, useTypedSelector } from 'hooks';
import CancelEditDialog from './CancelEditDialog';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import CheckIcon from 'catamaran/icons/Check';
import CostIcon from 'catamaran/icons/Cost';
import CostTypeSelector from 'views/Tasks/Breakdowns/Detail/Cost/CostTypeSelector';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import costValidator from 'helpers/validations/Breakdown/CostValidator';

type Props = {
  breakdownId: string;
  onClose: () => void;
  open: boolean;
  breakdownCost?: BreakdownCost;
};

function getBreakdownCostModel(
  breakdownCost: BreakdownCost,
  breakdownCostTypes: BreakdownCostType[]
): BreakdownCost {
  if (!breakdownCost) {
    return initialBreakdownCost;
  }

  const isBreakdownCostValid = breakdownCostTypes.some((costType) => {
    if (costType.id === breakdownCost.costTypeId) return true;
    if (costType.id === breakdownCost.parentCostTypeId) {
      return costType.subCostTypes.some((subType) => subType.id === breakdownCost.costTypeId);
    }
    return false;
  });
  if (!isBreakdownCostValid) {
    const breakdownCostModel: BreakdownCost = {
      ...breakdownCost,
      costType: null,
      costTypeId: null,
      parentCostType: null,
      parentCostTypeId: null
    };
    return breakdownCostModel;
  }

  return breakdownCost;
}

function AddOrEditCostDialog({ breakdownId, breakdownCost, onClose, open }: Props) {
  const { t } = useTranslation();
  const costTypes = useTypedSelector(selectAllBreakdownCostTypes);

  const mode = breakdownCost ? 'edit' : 'add';
  const dispatch = useTypedDispatch();

  const formHelper = useFormState(
    () => getBreakdownCostModel(breakdownCost, costTypes),
    costValidator
  );

  const { isOpen: cancelEditOpen, togglePopup: toggleCancelEdit } = useDialogState();

  const renderValue = useTypedSelector((state) =>
    selectCostTypeDisplayValue(state, {
      id: formHelper.formState.values.costTypeId,
      name: formHelper.formState.values.costType,
      parentCostTypeId: formHelper.formState.values.parentCostTypeId
    })
  );

  const handleConfirm = async () => {
    if (mode === 'add') {
      await dispatch(addBreakdownCost(breakdownId, formHelper.formState.values));
    } else {
      await dispatch(
        updateBreakdownCost(breakdownId, breakdownCost.id, formHelper.formState.values)
      );
      formHelper.reset(formHelper.formState.values);
    }
    handleClose();
    dispatch(showSaveSuccessSnackbar());
  };

  const handleClose = () => {
    formHelper.clear();
    onClose();
  };

  const handleCancel = () => {
    toggleCancelEdit(true);
  };

  const isCancelMode = formHelper.formState.isTouched;

  return (
    <>
      <CatDialog
        onAction={handleConfirm}
        onClose={isCancelMode ? handleCancel : handleClose}
        open={open}
      >
        <CatDialogTitle
          iconComponent={CostIcon}
          title={
            mode === 'edit' ? t('tasks.detail.cost.edit_cost') : t('tasks.detail.cost.add_cost')
          }
        />
        <CatDialogContent>
          <div className="flex flex-direction-column">
            <div className="flex">
              <InfoCautionIcon className="mr8" color="darkGrey" hoverable={false} />
              <CatTypography className="mb16 opacity-8" variant="body2">
                <Trans i18nKey="tasks.detail.cost.cost_dialog_warning_text" t={t} />
              </CatTypography>
            </div>
            <div className="mt8">
              <CatTypography className="mb16" variant="subtitle1">
                {t('tasks.detail.cost.information')}
              </CatTypography>
              <CatamaranTextField
                className="mb12"
                formHelper={formHelper}
                label={t('tasks.detail.cost.explanation')}
                mode="editOnly"
                name="explanation"
                required
                validatable
              />
              <CostTypeSelector formHelper={formHelper} renderValue={renderValue} />
              <div className="mt16 divider-horizontal" />
              <CatTypography className="my16" variant="subtitle1">
                {t('tasks.detail.cost.cost')}
              </CatTypography>
              <CatamaranTextField
                className="mb12"
                formHelper={formHelper}
                isNumericString
                label={`$ ${t('tasks.detail.cost.amount')}`}
                mode="editOnly"
                name="amount"
                required
                validatable
              />
              <CatAreaButton disabled onClick={undefined}>
                <Trans i18nKey="tasks.detail.cost.add_receipt" t={t} />
              </CatAreaButton>
              <div className="my16 divider-horizontal" />
              <CatTypography className="my16" variant="subtitle1">
                {t('tasks.detail.cost.bids')}
              </CatTypography>
              <CatAreaButton disabled onClick={undefined}>
                <Trans i18nKey="tasks.detail.cost.add_receipt" t={t} />
              </CatAreaButton>
              <CatTextField
                className="my8"
                disabled
                label={t('tasks.detail.cost.title_of_field')}
              />
              <CatTextField className="mb8" disabled label={t('tasks.detail.cost.amount')} />
              <CatTextField
                className="mb8"
                disabled
                label={t('tasks.detail.cost.amount_of_savings')}
              />
            </div>
          </div>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={isCancelMode ? CancelButton : GoBackButton} variant="close" />
          <CatDialogButton
            component={ContinueButton}
            disabled={
              !formHelper.formState.isValid || !renderValue || !formHelper.formState.isTouched
            }
            endIcon={mode === 'add' ? <PlusIcon /> : <CheckIcon />}
            variant="action"
          >
            {mode === 'add' ? t('common.add') : t('common.confirm')}
          </CatDialogButton>
        </CatDialogAction>
      </CatDialog>
      <CancelEditDialog
        handleCloseDialog={handleClose}
        onToggle={toggleCancelEdit}
        open={cancelEditOpen}
      />
    </>
  );
}

export default AddOrEditCostDialog;
