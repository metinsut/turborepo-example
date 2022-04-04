import { CatIconButton, CatMenu, CatMenuItem, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { UserModalType } from './UserModal/helpers';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useDialogState } from 'hooks';
import { useState } from 'react';
import GeneralAdminIcon from 'catamaran/icons/GeneralAdmin';
import GeneralAdminModal from './UserModal/GeneralAdminModal';
import PersonIcon from 'catamaran/icons/Person';
import PlusIcon from 'catamaran/icons/Plus';
import UserAddModal from './UserModal/UserAddModal';

function UserAddOptions() {
  const { t } = useTranslation();

  const [userModalType, setUserModalType] = useState<UserModalType>(undefined);

  const { isOpen: userAddOpen, togglePopup: userAddTogglePopup } = useDialogState();

  const { isOpen: generalAdminOpen, togglePopup: generalAdminTogglePopup } = useDialogState();

  const handleUserAddItemClick = () => {
    setUserModalType('standardUser');
    userAddTogglePopup(true);
  };

  const handleGeneralAdminItemClick = () => {
    setUserModalType('generalAdmin');
    generalAdminTogglePopup(true);
  };

  const handleGeneralAdminConfirm = async () => {
    generalAdminTogglePopup(false);
    userAddTogglePopup(true);
  };

  const popupState = usePopupState({ popupId: 'userAddOptions', variant: 'popover' });

  return (
    <>
      <CatIconButton {...bindTrigger(popupState)}>
        <PlusIcon color="green" />
      </CatIconButton>
      <CatMenu {...bindMenu(popupState)} addEmptyFirstItem width="292px">
        <CatMenuItem onClick={handleUserAddItemClick}>
          <PersonIcon color="blue" fontSize="small" />
          <CatTypography variant="body2">
            <Trans components={{ bold: <b /> }} i18nKey="users.list.create_user_menu_item" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuItem onClick={handleGeneralAdminItemClick}>
          <GeneralAdminIcon fontSize="small" />
          <CatTypography variant="body2">
            <Trans
              components={{ bold: <b /> }}
              i18nKey="users.list.create_general_admin_menu_item"
              t={t}
            />
          </CatTypography>
        </CatMenuItem>
      </CatMenu>
      <UserAddModal
        onClose={() => userAddTogglePopup(false)}
        onConfirm={() => userAddTogglePopup(false)}
        open={userAddOpen}
        userModalType={userModalType}
      />
      <GeneralAdminModal
        onClose={() => generalAdminTogglePopup(false)}
        onConfirm={handleGeneralAdminConfirm}
        open={generalAdminOpen}
      />
    </>
  );
}

export default UserAddOptions;
