import { goBack, gotoNextStep } from 'store/slices/contractplans/wizard/slice';
import { useTypedDispatch } from 'hooks';
import PlanPageModal from 'views/Plans/PlanPageModal';

function AddNew() {
  const dispatch = useTypedDispatch();

  const handleNext = async () => {
    await dispatch(gotoNextStep());
  };

  const handleBack = async () => {
    dispatch(goBack());
  };

  const handleConfirm = async () => {
    await handleNext();
  };

  return <PlanPageModal onClose={handleBack} onConfirm={handleConfirm} open />;
}

export default AddNew;
