import {
  BreakdownCostType,
  addBreakdownCostType,
  deleteBreakdownCostType,
  expandCostType,
  selectCostTypeIsExpanded,
  updateBreakdownCostType
} from 'store/slices/taskConfiguration/breakdown/breakdownCosts';
import {
  CatDialog,
  CatDialogAction,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { CatTrans } from 'components/CatTrans';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { useDialogState, useFormState, useTypedDispatch, useTypedSelector } from 'hooks';
import InputItem from 'components/InputItem/InputItem';
import React, { useMemo } from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import breakdownCostTypeValidator from 'helpers/validations/TaskConfiguration/BreakdownCostTypeValidator';
import useLoading from 'hooks/useLoading';

type Props = {
  breakdownCostType?: BreakdownCostType;
  mainCategoryId?: string;
  onAddCompleted?: () => void;
};

function CostTypeItem({ breakdownCostType, mainCategoryId, onAddCompleted }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [deleteLoading, deleteDispatch] = useLoading();

  const expanded = useTypedSelector((state) =>
    selectCostTypeIsExpanded(state, breakdownCostType.id)
  );

  const newItem = !breakdownCostType.id;
  const formHelper = useFormState<BreakdownCostType>(
    () => breakdownCostType,
    breakdownCostTypeValidator
  );

  const handleConfirm = async (costType: BreakdownCostType) => {
    let finalItem = costType;
    if (newItem) {
      finalItem = await dispatch(
        addBreakdownCostType(mainCategoryId, breakdownCostType.parentCostTypeId, costType)
      );
      onAddCompleted();
    } else {
      finalItem = await dispatch(updateBreakdownCostType(mainCategoryId, costType));
    }

    return finalItem;
  };

  const handleClose = () => {
    if (newItem) {
      onAddCompleted();
    }
  };

  const { isOpen, togglePopup } = useDialogState();
  const handleDeleteConfirmed = async () => {
    await deleteDispatch(deleteBreakdownCostType(mainCategoryId, breakdownCostType.id));
  };

  const handleExpand = () => {
    dispatch(expandCostType(breakdownCostType, !expanded));
  };

  const handleBeforeActionStart = () => {
    if (expanded) {
      dispatch(expandCostType(breakdownCostType, false));
    }
  };

  const subTypeCount = useMemo(() => {
    if (breakdownCostType.parentCostTypeId) {
      return 1;
    }

    return breakdownCostType.subCostTypes ? breakdownCostType.subCostTypes.length + 1 : 1;
  }, [breakdownCostType.parentCostTypeId, breakdownCostType.subCostTypes]);

  return (
    <>
      <InputItem
        addMode={newItem}
        bodyClickable={!breakdownCostType.parentCostTypeId}
        checkable={false}
        defaultFocused={newItem}
        defaultReadonly={!newItem}
        deletable
        editable
        expandable={!breakdownCostType.parentCostTypeId}
        expandBodyClickActionEnabled
        expanded={expanded}
        formHelper={formHelper}
        formKey="name"
        inlineEditable
        label={t('task_configuration.breakdown.cost.title')}
        onBeforeActionStart={handleBeforeActionStart}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onDelete={() => togglePopup(true)}
        onExpand={handleExpand}
      />
      {isOpen && (
        <CatDialog open={isOpen}>
          <CatDialogTitle
            iconComponent={TrashIcon}
            title={
              <Trans
                i18nKey={
                  subTypeCount > 1
                    ? 'task_configuration.breakdown.cost.delete_dialog_header_plural'
                    : 'task_configuration.breakdown.cost.delete_dialog_header'
                }
                t={t}
                values={{ count: subTypeCount }}
              />
            }
          />
          <CatDialogContent>
            <CatTypography variant="body1">
              <CatTrans
                i18nKey={
                  subTypeCount > 1
                    ? 'task_configuration.breakdown.cost.delete_dialog_desc_plural'
                    : 'task_configuration.breakdown.cost.delete_dialog_desc'
                }
                t={t}
                values={{
                  count: subTypeCount,
                  title: breakdownCostType.name
                }}
              />
            </CatTypography>
          </CatDialogContent>
          <CatDialogAction>
            <GoBackButton onClick={() => togglePopup(false)} />
            <DeleteButton loading={deleteLoading} onClick={handleDeleteConfirmed} />
          </CatDialogAction>
        </CatDialog>
      )}
    </>
  );
}

export default CostTypeItem;
