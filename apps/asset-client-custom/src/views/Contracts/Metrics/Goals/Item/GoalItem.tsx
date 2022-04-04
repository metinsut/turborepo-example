import { CatIconButton } from 'catamaran/core';
import { Goal, GoalLimitType, MetricType, TimeType } from 'store/slices/contracts/types';
import { selectMetric } from 'store/slices/contracts/selectors';
import {
  updateMetricGoalPercentageValue,
  updateMetricGoalTimeType,
  updateMetricGoalTimeValue
} from 'store/slices/contracts/slice';
import { useCategoryNames } from './useCategoryNames';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import GoalCategoryPicker from './GoalCategoryPicker';
import GoalDescription from '../GoalDescription';
import TimeIntervalPicker from './TimeIntervalPicker';
import TimePercentagePicker from './TimePercentagePicker';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  goal?: Goal;
  metricType?: MetricType;
  index?: number;
  disabled?: boolean;
  limitType: GoalLimitType;
  onDelete?: (index: number) => void;
};

function GoalItem(props: Props) {
  const { goal, metricType, index, disabled, limitType, onDelete } = props;

  const dispatch = useTypedDispatch();

  const handleDelete = () => {
    onDelete(index);
  };

  const handleTimeTypeChange = (timeType: TimeType) => {
    dispatch(
      updateMetricGoalTimeType({
        index,
        metricType,
        timeType
      })
    );
  };

  const handleTimeValueChange = (timeValue: number) => {
    dispatch(
      updateMetricGoalTimeValue({
        index,
        metricType,
        timeValue
      })
    );
  };

  const handlePercentageValueChange = (percentageValue: number) => {
    dispatch(
      updateMetricGoalPercentageValue({
        index,
        metricType,
        percentageValue
      })
    );
  };

  const { goalForm } = useTypedSelector((state) => selectMetric(state, metricType.id));
  const goalItemCount = goalForm[goalForm.type].length;

  const categoryName = useCategoryNames(goal, goalItemCount, disabled);
  const percentageMode = goal.limitType === 'percentage';

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
        metricType={metricType}
      />
      {percentageMode ? (
        <TimePercentagePicker
          onPercentageChange={handlePercentageValueChange}
          percentageValue={goal.limitPercentageValue}
        />
      ) : (
        <TimeIntervalPicker
          onTimeTypeChange={handleTimeTypeChange}
          onTimeValueChange={handleTimeValueChange}
          timeType={goal.limitTimeType}
          timeValue={goal.limitTimeValue}
        />
      )}
      <GoalDescription
        categoryName={categoryName}
        goal={goal}
        metricType={metricType}
        variant="body2"
      />
      {!disabled && (
        <CatIconButton className="justify-self-end" onClick={handleDelete}>
          <TrashIcon color="red" contained />
        </CatIconButton>
      )}
    </div>
  );
}

export default GoalItem;
