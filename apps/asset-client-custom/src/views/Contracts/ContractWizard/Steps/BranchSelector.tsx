import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectAllBranches } from 'store/slices/branches';
import {
  selectDisabledBranchIds,
  selectSelectedBranchIds,
  updateSelectedBranchIds
} from 'store/slices/contractplans/wizard/slice';
import { useCallback } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import BranchMultiSelector, {
  BranchMultiSelectorProps
} from 'components/MultiSelector/BranchMultiSelector';
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

function BranchSelector(props: Props) {
  const classes = useStyles();
  const { className, ...rest } = props;

  const dispatch = useTypedDispatch();
  const selectedBranchIds = useTypedSelector(selectSelectedBranchIds);
  const disabledBranchIds = useTypedSelector(selectDisabledBranchIds);

  const branches = useTypedSelector(selectAllBranches);

  const handleBranchIdsChanged = useCallback(
    (branchIds: string[]) => {
      dispatch(updateSelectedBranchIds(branchIds));
    },
    [dispatch]
  );

  return (
    <BranchMultiSelector
      branches={branches}
      className={clsx(classes.root, className)}
      disabledBranchIds={disabledBranchIds}
      onBranchIdsChange={handleBranchIdsChanged}
      selectedBranchIds={selectedBranchIds}
      {...rest}
    />
  );
}

export default BranchSelector;
