import { Goal, GoalLimitType, MetricType } from 'store/slices/contracts/types';
import { removeMetricGoal } from 'store/slices/contracts/slice';
import { useTypedDispatch } from 'hooks';
import { useUniqueIds } from 'hooks/useUniqueIds';
import GoalItem from './Item/GoalItem';

type Props = {
  goals?: Goal[];
  metricType?: MetricType;
  limitType?: GoalLimitType;
};

function GoalItems(props: Props) {
  const { goals, metricType, limitType } = props;

  // TODO THIS IS GENERATE NEW ID EVERY RENDER SO USELESS FOR HERE
  const uniqueIds = useUniqueIds(goals.length);
  const dispatch = useTypedDispatch();

  const handleDelete = (index: number) => {
    dispatch(
      removeMetricGoal({
        index,
        limitType,
        metricType
      })
    );
  };

  return (
    <div className="grid gap-8">
      {goals.map((goal, index) => (
        <GoalItem
          disabled={index === 0}
          goal={goal}
          index={index}
          key={uniqueIds[index]}
          limitType={limitType}
          metricType={metricType}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default GoalItems;
