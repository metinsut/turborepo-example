import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import PersonIcon from 'catamaran/icons/Person';

const AllStaffPersonCard = () => {
  const { t } = useTranslation();

  return (
    <CatDataCard color="darkGrey" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={PersonIcon} />
        <CatEmptyIcon />
      </CatSidebar>
      <CatMainContent>
        <div className="flex flex-auto-flow-column">
          <CatTypography className="opacity-8" variant="subtitle1">
            {t('tasks.breakdowns.common.all_staff_card_title')}
          </CatTypography>
          <CatTypography variant="caption">
            {t('tasks.breakdowns.common.all_staff_card_info')}
          </CatTypography>
        </div>
      </CatMainContent>
    </CatDataCard>
  );
};

export default AllStaffPersonCard;
