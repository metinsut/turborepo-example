import { Branch } from 'store/slices/branches';
import { CatCheckbox, CatMenuItem, CatSelect } from 'catamaran/core';
import { ListItemText, makeStyles } from 'catamaran/core/mui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  disabled: {
    '&.MuiFilledInput-root': {
      backgroundColor: 'transparent'
    },
    width: '240px'
  },
  headerVariant: {
    '& .MuiSelect-select:focus': {
      background: 'transparent'
    },
    background: 'transparent',
    width: '240px'
  }
}));

type Props = {
  className?: string;
  branches?: Branch[];
  disabled?: boolean;
  minOneBranch?: boolean;
  onBranchChange?: (branchIds: string[]) => void;
  selectedBranchIds?: string[];
  onHeader?: boolean;
  onClear?: () => void;
  clearActive?: boolean;
};

const MultipleBranchButton = (props: Props) => {
  const {
    branches,
    disabled = false,
    minOneBranch = false,
    onBranchChange,
    selectedBranchIds,
    className,
    onHeader,
    onClear,
    clearActive
  } = props;
  const classes = useStyles();

  const [localBranchIds, setLocalBranchIds] = useState<string[]>(selectedBranchIds);

  const { t } = useTranslation();

  const handleBranchChange = (e: any) => {
    const branchIds = e.target.value as string[];
    setLocalBranchIds(branchIds);
  };

  const handleClose = () => {
    onBranchChange(localBranchIds);
  };

  useEffect(() => {
    setLocalBranchIds(selectedBranchIds);
  }, [selectedBranchIds]);

  const getRenderValue = (value: string[]) => {
    switch (value.length) {
      case 0:
        if (branches.length === 1) {
          return branches[0].name;
        }

        return t('branches.all_branches');
      case 1:
        return branches.find((i) => i.id === value[0]).name;
      case branches.length:
        return t('branches.all_branches');
      default:
        return t('branches.branches_with_count', { count: value.length });
    }
  };

  return (
    <CatSelect
      className={clsx({
        [classes.headerVariant]: onHeader,
        [className]: true,
        [classes.disabled]: disabled
      })}
      clearActive={clearActive}
      disabled={disabled || branches.length === 1}
      displayEmpty
      fullWidth
      InputLabelProps={{ shrink: true }}
      label={t('branches.branch_field')}
      multiple
      onChange={handleBranchChange}
      onClear={onClear}
      onClose={handleClose}
      renderValue={(value) =>
        disabled ? t('branches.all_branches') : getRenderValue(value as string[])
      }
      value={localBranchIds}
    >
      {branches?.map((branch) => {
        const checked = localBranchIds.length === 0 || localBranchIds.includes(branch.id);
        return (
          <CatMenuItem
            disabled={minOneBranch && localBranchIds.length === 1 && checked}
            key={branch.id}
            value={branch.id}
          >
            <CatCheckbox checked={checked} style={{ marginRight: '12px' }} />
            <ListItemText primary={branch.name} />
          </CatMenuItem>
        );
      })}
    </CatSelect>
  );
};

export default MultipleBranchButton;
