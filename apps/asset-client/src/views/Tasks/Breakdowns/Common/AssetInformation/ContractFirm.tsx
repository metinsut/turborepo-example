import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { FirmContract } from 'store/slices/breakdown/common/types';
import { Trans, useTranslation } from 'react-i18next';
import ContractIcon from 'catamaran/icons/Contract';

type Props = {
  firmContact?: FirmContract;
};

const ContractFirm = ({ firmContact: { contactPerson, firmName, phone, email } }: Props) => {
  const { t } = useTranslation();

  return (
    <CatDataCard color="darkGrey" minWidth="auto" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={ContractIcon} />
        <CatEmptyIcon />
      </CatSidebar>
      <CatMainContent className="grid align-content-between gap-8">
        <CatTypography variant="body1">
          {t('tasks.waiting_for_confirmation.contract_contact.title')}
        </CatTypography>
        <div className="grid gap-4">
          <CatTypography className="three-dot" variant="body2">
            <Trans
              i18nKey="tasks.waiting_for_confirmation.contract_contact.firm"
              t={t}
              values={{ firmName }}
            />
          </CatTypography>
          <CatTypography className="three-dot" variant="body2">
            <Trans
              i18nKey="tasks.waiting_for_confirmation.contract_contact.contact_person"
              t={t}
              values={{ contactPerson }}
            />
          </CatTypography>
          <CatTypography className="three-dot" variant="body2">
            <Trans
              i18nKey="tasks.waiting_for_confirmation.contract_contact.phone"
              t={t}
              values={{ phone }}
            />
          </CatTypography>
          <CatTypography className="three-dot" variant="body2">
            <Trans
              i18nKey="tasks.waiting_for_confirmation.contract_contact.e_mail"
              t={t}
              values={{ email }}
            />
          </CatTypography>
        </div>
      </CatMainContent>
    </CatDataCard>
  );
};

export default ContractFirm;
