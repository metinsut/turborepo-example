import { CatDialog, CatDialogContent } from 'catamaran/core';
import {
  checkPlanExistsFromStore,
  deletePlan,
  disassociatePlan,
  initializePlanModal
} from 'store/slices/plans/actions';
import { clearInitialPlanForm } from 'store/slices/plans/slice';
import { selectIsPlanAssociatedWithAsset } from 'store/slices/asset/detail/selectors';
import { selectPlanDraft } from 'store/slices/plans/selectors';
import { updateSelectedPlan } from 'store/slices/contractplans/wizard/slice';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import BasicPlanInformation from './BasicInformation/BasicPlanInformation';
import NotifiedPersons from './NotifiedPersons/NotifiedPersons';
import PersonnelAssignments from './PersonnelAssignment/PersonnelAssignments';
import PlanPageHeader from './PlanPageHeader';
import React, { useEffect, useState } from 'react';

type Props = {
  id?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  open: boolean;
};

type Section = '' | 'basicInfo' | 'notifiedPersons' | 'assignment';
function PlanPageModal(props: Props) {
  const { id, onClose, open, onConfirm } = props;

  const dispatch = useTypedDispatch();
  const plan = useTypedSelector(selectPlanDraft);
  const [activeSection, setActiveSection] = useState<Section>(id ? '' : 'basicInfo');

  const isAssociated = useTypedSelector((state) => selectIsPlanAssociatedWithAsset(state, plan.id));
  useEffect(() => {
    if (id) {
      dispatch(initializePlanModal(id));
    }
  }, [dispatch, id]);

  useEffect(
    () => () => {
      dispatch(clearInitialPlanForm());
    },
    [dispatch]
  );

  const handleConfirm = async () => {
    dispatch(updateSelectedPlan(plan.id));
    await onConfirm();
  };

  const handleClose = async () => {
    await onClose();
  };

  const handleDelete = async () => {
    await dispatch(deletePlan(plan.id));
    await onClose();
  };

  const handleDisassociate = React.useCallback(async () => {
    await dispatch(disassociatePlan(plan?.id));
  }, [dispatch, plan?.id]);

  if (id && plan.id !== id) {
    return null;
  }

  const getSectionProps = (sectionType: Section) => ({
    disabled: activeSection !== sectionType && activeSection !== '',
    isActive: activeSection === sectionType,
    onActivate: async (active: boolean) => {
      if (activeSection === 'basicInfo' && !active) {
        const planExists = await dispatch(checkPlanExistsFromStore());
        if (!planExists) {
          onClose();
          return;
        }
      }

      setActiveSection(active ? sectionType : '');
    }
  });

  const isEditing = !!activeSection;
  const disassociateDisabled = isEditing || !isAssociated;

  return (
    <CatDialog fullWidth onAction={handleConfirm} onClose={onClose} open={open} size="large">
      <PlanPageHeader
        closeDisabled={isEditing}
        confirmDisabled={isEditing}
        deleteDisabled={isEditing}
        disassociateDisabled={disassociateDisabled}
        mode={id ? 'edit' : 'add'}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        onDisassociate={handleDisassociate}
        plan={plan}
      />
      <CatDialogContent className="grid">
        <BasicPlanInformation planId={plan.id} {...getSectionProps('basicInfo')} />
        <div className="divider-horizontal" />
        <PersonnelAssignments planId={plan.id} {...getSectionProps('assignment')} />
        <div className="divider-horizontal" />
        <NotifiedPersons planId={plan.id} {...getSectionProps('notifiedPersons')} />
      </CatDialogContent>
    </CatDialog>
  );
}

export default withDialogWrapper(PlanPageModal);
