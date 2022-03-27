import { CatKeyboardButton, CatPaper } from 'catamaran/core';
import { WAITINGFORCONFIRMATIONLIST } from 'routes/constant-route';
import { useCallback } from 'react';
import { useDialogState } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CatButton, { CancelButton, GoBackButton } from 'catamaran/core/Button';
import ConfirmModal from './ConfirmModal';
import DenyModal from './DenyModal';
import PersonIcon from 'catamaran/icons/Person';

type Props = {
  loading?: boolean;
  assetId?: string;
  breakdownId?: string;
};

const StickyBottomBar = ({ loading, assetId, breakdownId }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const handleGoBack = useCallback(() => {
    history.push(WAITINGFORCONFIRMATIONLIST);
  }, [history]);

  const { isOpen: isConfirmOpen, togglePopup: toggleConfirmPopup } = useDialogState();

  const handleConfirmModalClose = () => {
    toggleConfirmPopup(false);
  };

  const { isOpen: isDenyOpen, togglePopup: toggleDenyPopup } = useDialogState();

  const handleDenyModalClose = () => {
    toggleDenyPopup(false);
  };

  const handleModalConfirm = useCallback(() => {
    handleGoBack();
  }, [handleGoBack]);

  return (
    <>
      <CatPaper className="sticky-bottombar">
        <div className="flex align-items-center">
          <CatKeyboardButton component={GoBackButton} keyboardKey="escape" />
        </div>
        <div className="flex align-items-center">
          <CancelButton onClick={() => toggleDenyPopup(true)}>
            {t('tasks.waiting_for_confirmation.bottom_bar_deny')}
          </CancelButton>
          <div className="divider-vertical" />
          <CatButton
            color="green"
            endIcon={<PersonIcon />}
            loading={loading}
            onClick={() => toggleConfirmPopup(true)}
            size="large"
          >
            {t('tasks.waiting_for_confirmation.bottom_bar_proceed')}
          </CatButton>
        </div>
      </CatPaper>
      <ConfirmModal
        assetId={assetId}
        breakdownId={breakdownId}
        onClose={handleConfirmModalClose}
        onConfirm={handleModalConfirm}
        open={isConfirmOpen}
      />
      <DenyModal
        breakdownId={breakdownId}
        onClose={handleDenyModalClose}
        onConfirm={handleModalConfirm}
        open={isDenyOpen}
      />
    </>
  );
};

export default StickyBottomBar;
