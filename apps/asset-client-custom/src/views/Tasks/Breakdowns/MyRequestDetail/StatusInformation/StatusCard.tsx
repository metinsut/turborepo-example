import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { TaskStatusInformation } from 'store/slices/breakdown/common/types';
import { getStatusIconComponent } from '../../Common/StatusIcon';
import { useTranslation } from 'react-i18next';

type Props = {
  taskStatusInformation?: TaskStatusInformation;
};

const ExplanationCard = ({ taskStatusInformation }: Props) => {
  const { status, myRequestStatus, substatus } = taskStatusInformation;
  const { t } = useTranslation();

  return (
    <CatDataCard color="darkGrey" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={getStatusIconComponent(status)} />
        <CatEmptyIcon />
      </CatSidebar>
      <CatMainContent className="grid align-items-center">
        <div className="grid gap-8">
          <CatTypography className="opacity-8" variant="body1">
            {t(`tasks.common.statusGroup.${myRequestStatus}`)}
          </CatTypography>
          <div className="grid gap-2">
            <CatTypography className="opacity-6" variant="subtitle1">
              {t(`tasks.common.statuses.${status}`)}
            </CatTypography>
            <CatTypography className="opacity-6" variant="body2">
              {substatus}
            </CatTypography>
          </div>
        </div>
      </CatMainContent>
    </CatDataCard>
  );
};

export default ExplanationCard;
