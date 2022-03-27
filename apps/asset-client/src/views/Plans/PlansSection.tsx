import { getAllPlanBasics } from 'store/slices/plans/actions';
import { selectAllPlans } from 'store/slices/plans/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import PlanList from './PlanList';
import PlanPageModal from './PlanPageModal';
import React, { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

function PlansSection() {
  const [plansLoading, plansLoadingDispatch] = useLoading();

  const plans = useTypedSelector(selectAllPlans);

  useEffect(() => {
    plansLoadingDispatch(getAllPlanBasics());
  }, [plansLoadingDispatch]);

  const [planEditOpen, setPlanEditOpen] = React.useState(false);
  const [planEditId, setPlanEditId] = React.useState('');

  const handlePlanEditClick = React.useCallback((planId: string) => {
    setPlanEditId(planId);
    setPlanEditOpen(true);
  }, []);

  const handleEditClose = React.useCallback(() => {
    setPlanEditOpen(false);
  }, []);

  const handleEditConfirm = React.useCallback(() => {
    setPlanEditOpen(false);
  }, []);

  return (
    <>
      <PlanList loading={plansLoading} onPlanEdit={handlePlanEditClick} plans={plans} />
      <PlanPageModal
        id={planEditId}
        onClose={handleEditClose}
        onConfirm={handleEditConfirm}
        open={planEditOpen}
      />
    </>
  );
}

export default PlansSection;
