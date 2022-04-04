import { Box, CatButton } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { isArrayNullOrEmpty } from 'utils';
import { selectInitialUserPermissions } from 'store/slices/users/details/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AdditionalPermIcon from 'catamaran/icons/AdditionalPerm';
import DisplayHeader from 'components/Sections/DisplayHeader';
import EditIcon from 'catamaran/icons/Edit';
import NoPermissionAdded from './NoPermissionAdded';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import ReadonlyPermissionChip from './ReadonlyPermissionChip';
import clsx from 'clsx';

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
  const permissions = useTypedSelector(selectInitialUserPermissions);
  const permissionsEmpty = isArrayNullOrEmpty(permissions);

  let title = t('users.modal.additional_permissions.title');
  if (permissionsEmpty) {
    title += ` (${t('common.optional')})`;
  }

  return (
    <Box className={clsx(classes.root, className)}>
      <DisplayHeader
        headerIcon={<AdditionalPermIcon contained={false} hoverable={false} opacity={0.8} />}
        headerText={title}
      />
      <Box ml={4}>
        {permissionsEmpty ? (
          <NoPermissionAdded />
        ) : (
          <Box alignItems="center" flex flexWrap="wrap" my={2}>
            {permissions.map((id) => (
              <ReadonlyPermissionChip key={id} permissionId={id} />
            ))}
          </Box>
        )}
        {editVisible && (
          <CatButton
            color={permissionsEmpty ? 'green' : 'blue'}
            endIcon={permissionsEmpty ? <PlusIcon /> : <EditIcon />}
            onClick={onEditClick}
            size="small"
          >
            {t(permissionsEmpty ? 'common.add' : 'common.edit')}
          </CatButton>
        )}
      </Box>
    </Box>
  );
}

export default DisplayMode;
