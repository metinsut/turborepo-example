import { CatIconButton } from 'catamaran/core';
import { Goal, GoalLimitType, TimeType } from 'store/slices/metricsConfiguration/detail/type';
import {
  goalPercentageValueChanged,
  goalTimeTypeChanged,
  goalTimeValueChanged
} from 'store/slices/metricsConfiguration/detail/slice';
import { selectDraftGoalForm } from 'store/slices/metricsConfiguration/detail/selectors';
import { useCategoryNames } from './useCategoryNames';
import { useTypedDispatch } from 'hooks/useTypedDispatch';
import { useTypedSelector } from 'hooks';
import GoalCategoryPicker from './GoalCategoryPicker';
import GoalDescription from './GoalDescription';
import React from 'react';
import TimeIntervalPicker from './TimeIntervalPicker';
import TimePercentagePicker from './TimePercentagePicker';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  goal?: Goal;
  index?: number;
  disabled?: boolean;
  limitType: GoalLimitType;
  onDelete?: (index: number) => void;
};

function GoalItem({ goal, index, disabled, limitType, onDelete }: Props) {
  const dispatch = useTypedDispatch();

  const goalForm = useTypedSelector(selectDraftGoalForm);
  const goalItemCount = goalForm[goalForm.type].length;

  const categoryName = useCategoryNames(goal, goalItemCount, disabled);

  const handleDelete = () => {
    onDelete(index);
  };

  const handleTimeTypeChange = (timeType: TimeType) => {
    dispatch(
      goalTimeTypeChanged({
        index,
        timeType
      })
    );
  };

  const handleTimeValueChange = (timeValue: number) => {
    dispatch(
      goalTimeValueChanged({
        index,
        timeValue
      })
    );
  };

  const handlePercentageValueChange = (percentageValue: number) => {
    dispatch(
      goalPercentageValueChanged({
        index,
        percentageValue
      })
    );
  };

  return (
    <div
      className="grid gap-8 grid-auto-flow-column align-items-center justify-content-start bg-lightGrey radius-24 p8"
      style={{ gridTemplateColumns: '300px auto 1fr auto', height: '48px' }}
    >
      <GoalCategoryPicker
        categoryName={categoryName}
        checkedCategoryIds={goal.categoryIds ?? []}
        disabled={disabled}
        index={index}
        limitType={limitType}
      />
      {goal.limitType === 'percentage' && (
        <TimePercentagePicker
          onPercentageChange={handlePercentageValueChange}
          percentageValue={goal.limitPercentageValue}
        />
      )}
      {goal.limitType === 'timeBased' && (
        <TimeIntervalPicker
          onTimeTypeChange={handleTimeTypeChange}
          onTimeValueChange={handleTimeValueChange}
          timeType={goal.limitTimeType}
          timeValue={goal.limitTimeValue}
        />
      )}
      <GoalDescription categoryName={categoryName} goal={goal} variant="body2" />
      {!disabled && (
        <CatIconButton className="justify-self-end" onClick={handleDelete}>
          <TrashIcon color="red" contained />
        </CatIconButton>
      )}
    </div>
  );
}

export default GoalItem;
