import { Theme, makeStyles } from 'catamaran/core/mui';
import { getDisabledBranchIds, getSelectableBranches } from 'store/slices/plans/actions';
import {
  selectDisabledBranchIds,
  selectPlanBranchIds,
  selectSelectableBranches
} from 'store/slices/plans/selectors';
import { updateBranchIds } from 'store/slices/plans/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import BranchMultiSelector, {
  BranchMultiSelectorProps
} from 'components/MultiSelector/BranchMultiSelector';
import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = Omit<
  BranchMultiSelectorProps,
  'disabledBranchIds' | 'onBranchIdsChange' | 'selectedBranchIds' | 'branches'
> & {
  className?: string;
};

function PlanBranchMultiSelector(props: Props) {
  const classes = useStyles();
  const { className, ...rest } = props;

  const dispatch = useTypedDispatch();
  const selectedBranches = useTypedSelector(selectPlanBranchIds);
  const disabledBranchIds = useTypedSelector(selectDisabledBranchIds);

  useEffect(() => {
    dispatch(getSelectableBranches());
    dispatch(getDisabledBranchIds());
  }, [dispatch]);

  const branches = useTypedSelector(selectSelectableBranches);

  const handleBranchIdsChanged = useCallback(
    (branchIds: string[]) => {
      dispatch(updateBranchIds(branchIds));
    },
    [dispatch]
  );

  return (
    <BranchMultiSelector
      branches={branches}
      className={clsx(classes.root, className)}
      disabledBranchIds={disabledBranchIds}
      error={selectedBranches.length === 0}
      onBranchIdsChange={handleBranchIdsChanged}
      selectedBranchIds={selectedBranches}
      {...rest}
    />
  );
}

export default PlanBranchMultiSelector;
