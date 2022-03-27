import { Box, CatKeyboardSection } from 'catamaran/core';
import { DisplayType } from 'utils';
import { availableAdditionalPermissions } from 'store/slices/users/common/data';
import { selectDraftUserPermissions } from 'store/slices/users/details/selectors';
import { toggleAdditionalPermission } from 'store/slices/users/details/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AdditionalPermIcon from 'catamaran/icons/AdditionalPerm';
import EditHeader from 'components/Sections/EditHeader';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import PermissionCard from './PermissionCard';
import React from 'react';

type Props = {
  mode?: DisplayType;
  onCancel?: () => void;
  onGoBack?: () => void;
  onConfirm?: () => void;
};

function EditMode(props: Props) {
  const { mode, onCancel, onGoBack, onConfirm } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const selectedPermissions = useTypedSelector(selectDraftUserPermissions);
  const handleAdditionalPermissionSelect = (permissionId: string) => {
    dispatch(toggleAdditionalPermission(permissionId));
  };

  const handleCancel = async () => {
    await onCancel();
    onGoBack();
  };

  const handleConfirm = async () => {
    await onConfirm();
    onGoBack();
  };

  return (
    <CatKeyboardSection onEnter={handleConfirm} onEscape={handleCancel} open>
      <Box>
        <EditHeader
          descriptionText={t('users.modal.additional_permissions.description')}
          headerIcon={<AdditionalPermIcon contained={false} hoverable={false} opacity={0.8} />}
          headerText={t('users.modal.additional_permissions.title')}
        />
        <Box flex mt={1}>
          {Object.keys(availableAdditionalPermissions).map((permissionId) => (
            <PermissionCard
              key={permissionId}
              onClick={() => handleAdditionalPermissionSelect(permissionId)}
              permissionId={permissionId}
              selected={selectedPermissions.includes(permissionId)}
            />
          ))}
        </Box>
        <Box ml={5}>
          <KeyboardSectionBottomButtons isConfirmDisabled={false} mode={mode} touched />
        </Box>
      </Box>
    </CatKeyboardSection>
  );
}

export default EditMode;
