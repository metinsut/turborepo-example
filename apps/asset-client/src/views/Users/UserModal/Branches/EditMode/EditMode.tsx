import { Box, CatKeyboardSection } from 'catamaran/core';
import { BranchUserCount } from 'store/slices/users/details/types';
import { DisplayType, isArrayNullOrEmpty } from 'utils';
import { Typography } from 'catamaran/core/mui';
import { checkBranch, getBranchUserCounts } from 'store/slices/users/details/actions';
import { selectAllBranches } from 'store/slices/branches';
import { selectDraftUserBranches } from 'store/slices/users/details/selectors';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import BranchCard from 'components/Branch/BranchCard/BranchCard';
import BranchCardSkeleton from 'components/Branch/BranchCard/BranchCardSkeleton';
import BranchIcon from 'catamaran/icons/Branch';
import EditAllBranchesRow from './EditAllBranchesRow';
import EditHeader from 'components/Sections/EditHeader';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import Node from 'components/Node';
import SelectCounter from 'components/SelectCounter';

type Props = {
  mode?: DisplayType;
  onCancel?: () => void;
  onGoBack?: () => void;
  onConfirm?: () => void;
  onNext?: () => void;
};

function EditMode(props: Props) {
  const { mode, onCancel, onGoBack, onConfirm, onNext } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const branches = useTypedSelector(selectAllBranches);
  const branchAuthorization = useTypedSelector(selectDraftUserBranches);

  const [branchUserCounts, setBranchUserCounts] = useState<BranchUserCount[]>([]);

  useEffect(() => {
    async function fetchData() {
      const userCounts = await dispatch(getBranchUserCounts());
      if (userCounts) {
        setBranchUserCounts(userCounts);
      }
    }

    fetchData();
  }, [dispatch]);

  const handleBranchItemClick = (branchId: string) => {
    dispatch(checkBranch(branchId));
  };

  const confirmDisabled =
    !branchAuthorization.allBranches && isArrayNullOrEmpty(branchAuthorization.branchIds);

  const handleCancel = async () => {
    if (mode === 'add') {
      await onCancel();
    }
    onGoBack();
  };

  const handleConfirm = async () => {
    await onConfirm();
    onNext();
  };

  return (
    <CatKeyboardSection onEnter={handleConfirm} onEscape={handleCancel} open>
      <Box>
        <Box mb={2}>
          <EditHeader
            descriptionText={t('users.modal.branches.description')}
            headerIcon={<BranchIcon contained={false} hoverable={false} opacity={0.8} />}
            headerText={t('users.modal.branches.title')}
          />
        </Box>
        <Box mb={2}>
          <EditAllBranchesRow branchAuthorization={branchAuthorization} branches={branches} />
        </Box>
        <Box mb={2}>
          <Box alignItems="center" flex>
            <Node filled={false} value={branches.length.toString()} />
            <Box ml={1}>
              <Typography style={{ opacity: '60%' }} variant="body2">
                {t('users.modal.branches.total_branch', { count: branches.length })}
              </Typography>
            </Box>
            {!isArrayNullOrEmpty(branchAuthorization.branchIds) && (
              <>
                <Box px={1}>|</Box>
                <SelectCounter count={branchAuthorization.branchIds.length} size="small" />
                <Box ml={1}>
                  <Typography variant="body2">{t('users.modal.branches.selected')}</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
        <Box flex flexWrap="wrap" mb={2}>
          {isArrayNullOrEmpty(branches) ? (
            <>
              <BranchCardSkeleton className="mb16 mr16" />
              <BranchCardSkeleton className="mb16 mr16" />
            </>
          ) : (
            <>
              {branches.map((b) => (
                <Box key={b.id} mb={2} mr={2}>
                  <BranchCard
                    branchId={b.id}
                    onClick={() => handleBranchItemClick(b.id)}
                    selected={branchAuthorization.branchIds.includes(b.id)}
                    userCount={branchUserCounts.find((i) => i.branchId === b.id)?.userCount}
                  />
                </Box>
              ))}
            </>
          )}
        </Box>
        <KeyboardSectionBottomButtons isConfirmDisabled={confirmDisabled} mode={mode} touched />
      </Box>
    </CatKeyboardSection>
  );
}

export default EditMode;
