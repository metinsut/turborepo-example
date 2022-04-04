import { Box, CatMenuItem, CatSelect } from 'catamaran/core';
import { selectAllBranches } from 'store/slices/branches';
import { selectBranchLocationCodeType } from 'store/slices/location/locations/selectors';
import { styled } from 'catamaran/core/mui';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';

const StyledSelect = styled(CatSelect)(() => ({
  '.MuiSelect-root': {
    borderRadius: '16px'
  },
  '.MuiSelect-select': {
    '&focus': {
      background: 'transparent'
    }
  },
  background: 'transparent',
  opacity: '0.8',
  width: '240px'
}));

type Props = {
  className?: string;
  onBranchChanged: (branchId: string) => void;
};

function LocationBranchSelector(props: Props) {
  const { className, onBranchChanged } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const branches = useTypedSelector(selectAllBranches);
  const branchLocationCode = useTypedSelector(selectBranchLocationCodeType);

  useEffect(() => {
    if (branches?.length > 0 && !branchLocationCode) {
      const branchId = branches[0].id;
      onBranchChanged(branchId);
    }
  }, [branchLocationCode, branches, dispatch, onBranchChanged]);

  const handleBranchChange = (e: any) => {
    const branchId = e.target.value as string;
    onBranchChanged(branchId);
  };

  return (
    <Box className={className}>
      <Box fontSize={9} ml={2} opacity={0.4} position="relative" top="6px">
        {t('branches.branch_field')}
      </Box>
      <StyledSelect onChange={handleBranchChange} value={branchLocationCode?.branchId ?? ''}>
        {branches.map((branch: any) => (
          <CatMenuItem key={branch.id} value={branch.id}>
            {branch.name}
          </CatMenuItem>
        ))}
      </StyledSelect>
    </Box>
  );
}

export default LocationBranchSelector;
