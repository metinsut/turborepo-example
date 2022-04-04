import {
  CatCheckbox,
  CatMenu,
  CatMenuDivider,
  CatMenuItem,
  CatToggleButton,
  CatToggleCardCheckbox,
  CatTypography
} from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { isArrayNullOrEmpty } from 'utils';
import { selectAllBranchIds, selectAllBranches } from 'store/slices/branches';
import { useCallback, useEffect, useState } from 'react';
import { useTypedSelector } from 'hooks';
import BranchIcon from 'catamaran/icons/Branch';
import clsx from 'clsx';

type Props = {
  selectedBranchIds?: any;
  onChange?: (branchIds: string[]) => void;
  minOneBranch?: boolean;
};

const BranchFilter = ({ selectedBranchIds = [], onChange, minOneBranch = true }: Props) => {
  const { t } = useTranslation();
  const branches = useTypedSelector(selectAllBranches);
  const branchIds = useTypedSelector(selectAllBranchIds);
  const [localBranchIds, setLocalBranchIds] = useState<string[]>(selectedBranchIds);

  const handleChange = useCallback(
    (branchIds: string[]) => {
      onChange(branchIds);
    },
    [onChange]
  );

  const handleClose = () => {
    handleChange(localBranchIds);
  };

  const handleSelect = (id: string) => {
    setLocalBranchIds((prevState) => {
      let newState: string[] = [];
      const hasBranch = prevState.includes(id);
      if (!hasBranch && prevState.length === 0) {
        newState = (branchIds as string[]).filter((branchId) => branchId !== id);
        return newState;
      }

      if (hasBranch) {
        newState = prevState.filter((branchId) => branchId !== id);
        return newState;
      }

      // If all branch selected make array empty because If array is empty BE send data as if all branches were selected.
      if (!hasBranch && prevState.length + 1 === branchIds.length) {
        newState = [];
        return newState;
      }
      return [...prevState, id];
    });
  };

  const renderFilterButtonText = (value: string[]) => {
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

  const renderAllSelectButtonText = (value: string[]) => {
    switch (value.length) {
      case branches.length:
        return t('branches.all_branched_selected', { count: value.length });
      default:
        return t('branches.select_all');
    }
  };

  const handleSelectAll = () => {
    setLocalBranchIds([]);
  };

  useEffect(() => {
    setLocalBranchIds(selectedBranchIds);
  }, [selectedBranchIds]);

  const allBranchSelected =
    isArrayNullOrEmpty(localBranchIds) || localBranchIds.length === branchIds.length;

  const popupState = usePopupState({ popupId: 'branchFilter', variant: 'popover' });

  if (branchIds.length === 1) {
    return null;
  }

  return (
    <>
      <CatToggleButton
        {...bindTrigger(popupState)}
        color="darkGrey"
        icon={<BranchIcon />}
        keepIconColor
        reverse
        selected={popupState.isOpen}
        title={renderFilterButtonText(localBranchIds)}
      />
      <CatMenu
        {...bindMenu(popupState)}
        addEmptyFirstItem
        onClose={() => {
          bindMenu(popupState).onClose();
          handleClose();
        }}
        width="292px"
      >
        <CatTypography className="mx16" variant="body1">
          <Trans i18nKey="branches.branch_filter" t={t} />
        </CatTypography>
        <div className="mx8 mt16">
          <CatToggleButton
            className="radius-24"
            color="darkGrey"
            disabled={allBranchSelected}
            icon={<CatToggleCardCheckbox checked={allBranchSelected} />}
            keepIconColor
            onClick={handleSelectAll}
            reverse
            selected={allBranchSelected}
            size="large"
            title={renderAllSelectButtonText(localBranchIds)}
          />
        </div>
        <CatMenuDivider />
        <div className="overflow-y-auto" style={{ maxHeight: '170px' }}>
          {branches.map((branch: any) => {
            const checked = localBranchIds.length === 0 || localBranchIds.includes(branch.id);
            return (
              <CatMenuItem
                disabled={minOneBranch && localBranchIds.length === 1 && checked}
                key={branch.id}
                onClick={() => handleSelect(branch.id)}
              >
                <CatCheckbox checked={checked} id={branch.id} paddingSize="none" />
                <CatTypography className={clsx(checked ? 'font-bold' : '')} variant="body2">
                  {branch.name}
                </CatTypography>
              </CatMenuItem>
            );
          })}
        </div>
      </CatMenu>
    </>
  );
};

export default BranchFilter;
