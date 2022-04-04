import { Goal, GoalLimitType } from 'store/slices/metricsConfiguration/detail/type';
import { goalRemoved } from 'store/slices/metricsConfiguration/detail/slice';
import { useTypedDispatch } from 'hooks';
import { useUniqueIds } from 'hooks/useUniqueIds';
import GoalItem from './Item/GoalItem';
import React from 'react';

type Props = {
  goals?: Goal[];
  limitType?: GoalLimitType;
};

function GoalItems({ goals, limitType }: Props) {
  // TODO THIS IS GENERATE NEW ID EVERY RENDER SO USELESS FOR HERE
  const uniqueIds = useUniqueIds(goals.length);
  const dispatch = useTypedDispatch();

  const handleDelete = (index: number) => {
    dispatch(
      goalRemoved({
        index,
        limitType
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
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default GoalItems;
