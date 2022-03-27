import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { TFunction, Trans, useTranslation } from 'react-i18next';
import { Usability } from 'store/slices/breakdown/common/types';
import MaintenanceOkIcon from 'catamaran/icons/MaintenanceOk';
import NotUsableIcon from 'catamaran/icons/NotUsable';
import TitleIcon from 'catamaran/icons/Title';

type Props = {
  explanation?: string;
  usability?: Usability;
};

const getUsabilityText = (usable: boolean, t: TFunction) =>
  usable
    ? t('tasks.waiting_for_confirmation.breakdown_information.usabilities.usable')
    : t('tasks.waiting_for_confirmation.breakdown_information.usabilities.notUsable');

const getUsabilityIcon = (usable: boolean) =>
  usable ? (
    <MaintenanceOkIcon
      className="c-main-green opacity-none"
      contained={false}
      fontSize="small"
      hoverable={false}
    />
  ) : (
    <NotUsableIcon
      className="c-main-red opacity-none"
      contained={false}
      fontSize="small"
      hoverable={false}
    />
  );

const ExplanationCard = ({ explanation, usability }: Props) => {
  const { t } = useTranslation();
  const usable = usability === 'usable';

  return (
    <CatDataCard color="darkGrey" minWidth="auto" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={TitleIcon} />
        <CatEmptyIcon />
      </CatSidebar>
      <CatMainContent className="grid align-content-between">
        <div>
          <CatTypography className="opacity-8 mb8" variant="body1">
            {t('tasks.waiting_for_confirmation.breakdown_information.header')}
          </CatTypography>
          <CatTypography className="opacity-6" variant="body1">
            {explanation}
          </CatTypography>
        </div>
        <div>
          <CatTypography className="opacity-8 flex align-items-center" variant="body2">
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
                ),
                usability_icon: getUsabilityIcon(usable)
              }}
              i18nKey="tasks.waiting_for_confirmation.breakdown_information.usability_explanation"
              t={t}
              values={{ usability: getUsabilityText(usable, t) }}
            />
          </CatTypography>
        </div>
      </CatMainContent>
    </CatDataCard>
  );
};

export default ExplanationCard;
