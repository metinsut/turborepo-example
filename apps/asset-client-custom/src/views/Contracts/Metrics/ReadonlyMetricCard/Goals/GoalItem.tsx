import { Box } from 'catamaran/core';
import { Goal, MetricType } from 'store/slices/contracts/types';
import { useCategoryNames } from '../../Goals/Item/useCategoryNames';
import GoalDescription from '../../Goals/GoalDescription';
import React from 'react';

type Props = {
  isDefaultGoal: boolean;
  goal: Goal;
  metricType: MetricType;
  totalGoalCount: number;
};

function GoalItem(props: Props) {
  const { isDefaultGoal, goal, metricType, totalGoalCount } = props;

  const categoryNames = useCategoryNames(goal, totalGoalCount, isDefaultGoal);

  return (
    <Box mb="4px">
      <GoalDescription
        categoryName={categoryNames}
        goal={goal}
        metricType={metricType}
        variant="caption"
      />
    </Box>
  );
}

export default GoalItem;
