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
import { TFunction, Trans, useTranslation } from 'react-i18next';
import { Usability as UsabilityType } from 'store/slices/breakdown/common/types';
import { useDialogState } from 'hooks';
import ExpandIcon from 'catamaran/icons/Expand';
import InfoIcon from 'catamaran/icons/Info';
import TitleIcon from 'catamaran/icons/Title';
import Usability from './Usability';

type Props = {
  explanation: string;
  requesterUsability: UsabilityType;
  usability: UsabilityType;
};

const getUsabilityText = (usable: boolean, t: TFunction) =>
  usable
    ? t('tasks.detail.breakdown_information.usabilities.usable')
    : t('tasks.detail.breakdown_information.usabilities.notUsable');

function ExplanationUsability({ explanation, requesterUsability, usability }: Props) {
  const { t } = useTranslation();
  const usable = requesterUsability === 'usable';

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
        <CatMainContent className="grid gap-8 align-content-between">
          <div className="grid gap-4">
            <div className="flex justify-content-between">
              <CatTypography className="opacity-8" variant="body1">
                {t('tasks.detail.breakdown_information.breakdown_explanation')}
              </CatTypography>
              <div className="flex gap-4 align-items-center">
                <InfoIcon color="darkGrey" fontSize="small" hoverable={false} />
                <CatTypography className="opacity-8" variant="body2">
                  <Trans
                    components={{
                      style: (
                        <span
                          className={
                            usable
                              ? 'opacity-none c-main-green font-bold mr4'
                              : 'opacity-none c-main-red font-bold mr4'
                          }
                        />
                      )
                    }}
                    i18nKey="tasks.detail.breakdown_information.usability_explanation"
                    t={t}
                    values={{ usability: getUsabilityText(usable, t) }}
                  />
                </CatTypography>
              </div>
            </div>
            <CatTypography className="opacity-6 three-dot" variant="body1">
              {explanation}
            </CatTypography>
          </div>
          <div className="grid grid-auto-flow-column gap-8 align-content-between">
            <Usability usability={usability} />
            <div className="flex justify-content-end">
              <CatIconButton onClick={() => togglePopup(true)}>
                <ExpandIcon color="darkGrey" />
              </CatIconButton>
            </div>
          </div>
        </CatMainContent>
      </CatDataCard>
      {isOpen && (
        <CatDialog onClose={handleDetailDialogClose} open={isOpen}>
          <CatDialogTitle
            closable
            iconComponent={TitleIcon}
            title={t('tasks.detail.breakdown_information.breakdown_explanation')}
          />
          <CatDialogContent>
            <CatTypography variant="body1">{explanation}</CatTypography>
          </CatDialogContent>
          <CatDialogAction>
            <CatDialogButton component={GoBackButton} variant="close" />
          </CatDialogAction>
        </CatDialog>
      )}
    </>
  );
}

export default ExplanationUsability;
