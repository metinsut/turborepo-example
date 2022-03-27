import { CATEGORYONBOARDINGMODALREAD, saveToLocalStorage } from 'helpers/localStorage';
import { CatDialog, CatDialogAction, CatDialogButton, CatDialogTitle } from 'catamaran/core';
import { GoBackButton, NextButton } from 'catamaran/core/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DetailContent from './DetailContent';
import GotItButton from 'catamaran/core/Button/CommonButtons/GotItButton';
import InfoContent from './InfoContent';
import VariableIcon from 'catamaran/icons/Variable';

type Props = {
  open: boolean;
  onClose: () => void;
};

const OnboardingModal = (props: Props) => {
  const { onClose, open } = props;
  const { t } = useTranslation();
  const [detailContent, setDetailContent] = useState(false);

  const handleGotIt = async () => {
    await saveToLocalStorage(CATEGORYONBOARDINGMODALREAD, true);
    setDetailContent(false);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setDetailContent(false);
  };

  const handleNextModal = async () => {
    setDetailContent(true);
  };

  const handlePrevModal = () => {
    setDetailContent(false);
  };

  return (
    <CatDialog
      enableBackdropClickClose
      enableEscapeClose
      onAction={detailContent ? handleGotIt : handleNextModal}
      onClose={detailContent ? handlePrevModal : handleClose}
      open={open}
    >
      <CatDialogTitle
        iconComponent={VariableIcon}
        title={t('asset_configurations.categories.onboarding.asset_categories')}
      />
      {detailContent ? <DetailContent /> : <InfoContent />}
      {detailContent ? (
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton component={GotItButton} variant="action" />
        </CatDialogAction>
      ) : (
        <CatDialogAction>
          <CatDialogButton component={NextButton} variant="action" />
        </CatDialogAction>
      )}
    </CatDialog>
  );
};

export default OnboardingModal;
