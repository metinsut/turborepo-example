import { CatTypography } from 'catamaran/core';
import { TableCell, Tooltip } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import Branch from 'catamaran/icons/Branch';
import React, { useMemo } from 'react';

interface Props {
  branches?: any;
  allBranches?: boolean;
}

interface Branch {
  id: string;
  name: string;
}

const BranchesCell = ({ branches, allBranches }: Props) => {
  const { t } = useTranslation();

  const branchContent = useMemo(() => {
    const allBranchesText = t('users.list.body.all_branches');
    const branchesText = t('users.list.body.branch');
    const branchesCount = branches?.length;
    if (allBranches) {
      return <CatTypography variant="body2">{allBranchesText}</CatTypography>;
    }
    if (branchesCount === 1) {
      const singleBranch = branches[0].name;
      return <CatTypography variant="body2">{singleBranch}</CatTypography>;
    }
    if (branchesCount > 1) {
      const branchesToolTipContent = branches.map((branch: Branch) => branch.name).join(', ');

      return (
        <Tooltip arrow placement="bottom" title={branchesToolTipContent}>
          <div>
            <CatTypography className="no-wrap" noBreak variant="body2">
              {`<${`${branchesCount} ${branchesText}`}>`}
            </CatTypography>
          </div>
        </Tooltip>
      );
    }
    return null;
  }, [branches, allBranches, t]);

  return <TableCell className="border-0 text-nowrap">{branchContent}</TableCell>;
};

export default BranchesCell;
