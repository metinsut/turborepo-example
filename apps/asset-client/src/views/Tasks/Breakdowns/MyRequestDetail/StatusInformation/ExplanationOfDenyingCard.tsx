import {
  CatCenterIcon,
  CatDataCard,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatEmptyIcon,
  CatIconButton,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { GoBackButton } from 'catamaran/core/Button';
import { useDialogState } from 'hooks';
import { useTranslation } from 'react-i18next';
import ExpandIcon from 'catamaran/icons/Expand';
import TitleIcon from 'catamaran/icons/Title';

type Props = {
  denyExplanation?: string;
};

const ExplanationCard = ({ denyExplanation }: Props) => {
  const { t } = useTranslation();
  const { isOpen, togglePopup } = useDialogState();

  const handleDetailDialogClose = () => {
    togglePopup(false);
  };

  return (
    <>
      <CatDataCard color="darkGrey" transparentBackground>
        <CatSidebar>
          <CatEmptyIcon />
          <CatCenterIcon component={TitleIcon} />
          <CatEmptyIcon />
        </CatSidebar>
        <CatMainContent
          className="grid"
          style={{ gridTemplateRows: 'auto 1fr auto', paddingBottom: '4px' }}
        >
          <CatTypography variant="body1">
            {t('tasks.breakdowns.my_request.explanation_of_denying_title')}
          </CatTypography>
          <CatTypography
            className="opacity-8"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            variant="body1"
          >
            {denyExplanation}
          </CatTypography>
          <CatIconButton className="justify-self-end" onClick={() => togglePopup(true)}>
            <ExpandIcon color="darkGrey" />
          </CatIconButton>
        </CatMainContent>
      </CatDataCard>
      {isOpen && (
        <CatDialog onClose={handleDetailDialogClose} open={isOpen}>
          <CatDialogTitle
            closable
            iconComponent={TitleIcon}
            title={t('tasks.breakdowns.my_request.explanation_of_denying_title')}
          />
          <CatDialogContent>
            <CatTypography className="opacity-8" variant="body1">
              {denyExplanation}
            </CatTypography>
          </CatDialogContent>
          <CatDialogAction>
            <CatDialogButton component={GoBackButton} variant="close" />
          </CatDialogAction>
        </CatDialog>
      )}
    </>
  );
};

export default ExplanationCard;
