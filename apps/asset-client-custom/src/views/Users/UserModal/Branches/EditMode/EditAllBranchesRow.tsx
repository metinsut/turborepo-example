import { Box } from 'catamaran/core';
import { Branch } from 'store/slices/branches';
import { BranchAuthorization } from 'store/slices/users/details/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { checkSetAllBranches } from 'store/slices/users/details/actions';
import { selectAuthorizedForAllBranches } from 'store/slices/users/details/selectors';
import { toggleAllBranchesOption } from 'store/slices/users/details/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AllBranchesOptionCard from 'components/Branch/BranchCard/AllBranchesOptionCard';
import BranchCard from 'components/Branch/BranchCard/BranchCard';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  branchAuthorization?: BranchAuthorization;
  branches?: Branch[];
};

function EditAllBranchesRow(props: Props) {
  const classes = useStyles();
  const { className, branchAuthorization, branches } = props;

  const dispatch = useTypedDispatch();
  const authorizedForAllBranches = useTypedSelector(selectAuthorizedForAllBranches);

  const handleSelectAllClick = () => {
    dispatch(
      checkSetAllBranches(!branchAuthorization.allBranchesCheckboxState, authorizedForAllBranches)
    );
  };

  const handleBranchOptionChanged = () => {
    dispatch(toggleAllBranchesOption());
  };

  const allBranchesOptionVisible =
    authorizedForAllBranches && branchAuthorization.allBranchesCheckboxState === true;

  return (
    <Box className={clsx(classes.root, className)} flex>
      <BranchCard
        onClick={handleSelectAllClick}
        selectAll
        selected={branchAuthorization.allBranchesCheckboxState}
      />
      {allBranchesOptionVisible && (
        <Box ml={2}>
          <AllBranchesOptionCard
            branchCount={branches.length}
            onClick={handleBranchOptionChanged}
            selected={branchAuthorization.allBranches}
          />
        </Box>
      )}
    </Box>
  );
}

export default EditAllBranchesRow;
