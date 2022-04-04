import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography,
  useLocalizationHelpers
} from 'catamaran/core';
import { ContractInformation } from 'store/slices/breakdown/common/types';
import { Trans, useTranslation } from 'react-i18next';
import { getContractIconComponent } from 'views/Contracts/ContractIcon';

type Props = {
  contract?: ContractInformation;
};

const ContractBasic = ({ contract }: Props) => {
  const { t } = useTranslation();
  const { formatDate } = useLocalizationHelpers();

  return contract ? (
    <CatDataCard color="darkGrey" minWidth="auto" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={getContractIconComponent(contract?.type)} />
        <CatEmptyIcon />
      </CatSidebar>
      <CatMainContent className="grid align-content-between gap-16">
        <div>
          <CatTypography variant="body1">{contract?.title}</CatTypography>
          <CatTypography className="opacity-8 capitalize" variant="body1">
            {t('tasks.waiting_for_confirmation.type_contract', { type: contract?.type })}
          </CatTypography>
        </div>
        <div>
          <CatTypography variant="body2">
            <b>{t('common.start')}: </b>
            {formatDate(contract?.startDate)}
          </CatTypography>
          <CatTypography variant="body2">
            <b>{t('common.end')}: </b>
            {formatDate(contract?.endDate)}
          </CatTypography>
        </div>
      </CatMainContent>
    </CatDataCard>
  ) : (
    <CatDataCard color="darkGrey" minWidth="auto" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={getContractIconComponent('none')} />
        <CatEmptyIcon />
      </CatSidebar>
      <CatMainContent className="flex align-items-center gap-4">
        <CatTypography variant="body1">
          <Trans i18nKey="tasks.waiting_for_confirmation.no_relevant_contract" t={t} />
        </CatTypography>
      </CatMainContent>
    </CatDataCard>
  );
};

export default ContractBasic;
