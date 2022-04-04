import { Branch } from 'store/slices/branches';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import MultiSelector, { MultiSelectorProps } from './MultiSelector';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

export type BranchMultiSelectorProps = Omit<
  MultiSelectorProps<Branch>,
  'disabledIds' | 'displayProp' | 'items' | 'primaryKey' | 'selectedIds'
> & {
  branches: Branch[];
  className?: string;
  disabledBranchIds: string[];
  onBranchIdsChange: (branchIds: string[]) => void;
  selectedBranchIds: string[];
};

function BranchMultiSelector(props: BranchMultiSelectorProps) {
  const classes = useStyles();
  const { branches, className, disabledBranchIds, onBranchIdsChange, selectedBranchIds, ...rest } =
    props;

  const { t } = useTranslation();

  return (
    <MultiSelector
      className={clsx(classes.root, className)}
      disabledIds={disabledBranchIds}
      displayProp="name"
      items={branches}
      label={t('branches.branch_field')}
      onChange={onBranchIdsChange}
      primaryKey="id"
      renderValueString="branches.wizard_selected_items"
      selectedIds={selectedBranchIds}
      {...rest}
    />
  );
}

export default BranchMultiSelector;
