import { Box, CatButton } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { isArrayNullOrEmpty } from 'utils';
import { selectInitialUserBranches } from 'store/slices/users/details/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BranchChip from './BranchChip';
import BranchIcon from 'catamaran/icons/Branch';
import DisplayHeader from 'components/Sections/DisplayHeader';
import EditIcon from 'catamaran/icons/Edit';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import ValidationBadge from 'components/ValidationBadge';
import clsx from 'clsx';
import theme from 'catamaran/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  editVisible?: boolean;
  onEditClick?: () => void;
};

function DisplayMode(props: Props) {
  const classes = useStyles();
  const { className, editVisible = true, onEditClick } = props;

  const { t } = useTranslation();
  const branchAuthorization = useTypedSelector(selectInitialUserBranches);
  const authorizationExist =
    branchAuthorization.allBranches || !isArrayNullOrEmpty(branchAuthorization.branchIds);

  return (
    <Box className={clsx(classes.root, className)}>
      <DisplayHeader
        headerIcon={<BranchIcon contained={false} hoverable={false} opacity={0.8} />}
        headerText={t('users.modal.branches.title_readonly')}
      />
      <Box ml={4}>
        {authorizationExist ? (
          <Box alignItems="center" flex my={2}>
            {!branchAuthorization.allBranches &&
              branchAuthorization.branchIds.map((id) => (
                <Box key={id} mb={1} mr={1}>
                  <BranchChip branchId={id} />
                </Box>
              ))}
            <Box mb={1}>
              <Typography variant="caption">
                {branchAuthorization.allBranches
                  ? t('users.modal.branches.all_branches_selected')
                  : t('users.modal.branches.branch_selected', {
                      count: branchAuthorization.branchIds.length
                    })}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box alignItems="center" flex ml={3} my={2}>
            <ValidationBadge isValid={false} />
            <Box ml={1}>
              <Typography style={{ color: theme.palette.red[700] }} variant="caption">
                {t('common.required')}
              </Typography>
            </Box>
            <Box px={1} style={{ color: theme.palette.red[700] }}>
              |
            </Box>
            <Box>
              <Typography style={{ color: theme.palette.red[400] }} variant="caption">
                {t('users.modal.branches.no_branch_yet')}
              </Typography>
            </Box>
          </Box>
        )}
        {editVisible && (
          <CatButton
            color={authorizationExist ? 'blue' : 'green'}
            endIcon={authorizationExist ? <EditIcon /> : <PlusIcon />}
            onClick={onEditClick}
            size="small"
          >
            {t(authorizationExist ? 'common.edit' : 'users.modal.branches.branches')}
          </CatButton>
        )}
      </Box>
    </Box>
  );
}

export default DisplayMode;
