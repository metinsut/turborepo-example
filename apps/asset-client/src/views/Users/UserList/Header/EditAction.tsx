import { CatButton } from 'catamaran/core';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useTranslation } from 'react-i18next';
import Action from 'catamaran/icons/Action';

const EditAction = () => {
  const { t } = useTranslation();
  const popupState = usePopupState({ popupId: 'userListEditAction', variant: 'popover' });

  return (
    <CatButton color="blue" disabled endIcon={<Action />} {...bindTrigger(popupState)}>
      {t('users.list.action')}
    </CatButton>
  );
};

export default EditAction;
