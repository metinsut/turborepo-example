import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTab,
  CatTabs,
  CatTypography
} from 'catamaran/core';
import { Priority as PriorityType } from 'store/slices/breakdown/common/types';
import { useTranslation } from 'react-i18next';
import ExclamationIcon from 'catamaran/icons/Exclamation';

type Props = {
  onPriorityChange: (type: PriorityType) => void;
  priority: PriorityType;
};
const Priority = ({ onPriorityChange, priority }: Props) => {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: PriorityType) => {
    onPriorityChange(newValue);
  };

  return (
    <CatDataCard color="darkGrey" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={ExclamationIcon} />
        <CatEmptyIcon />
      </CatSidebar>
      <CatMainContent>
        <div className="grid align-content-between h-full">
          <div className="grid gap-4">
            <CatTypography className="opacity-8" variant="body1">
              {t('tasks.breakdowns.common.priority.title')}
            </CatTypography>
            <CatTypography className="opacity-6" variant="body2">
              {t('tasks.breakdowns.common.priority.description')}
            </CatTypography>
          </div>
          <CatTabs
            autowidth
            className="align-self-end"
            onChange={handleChange}
            scrollButtons={false}
            value={priority}
          >
            <CatTab label={t('tasks.breakdowns.common.priority.low')} value="low" />
            <CatTab label={t('tasks.breakdowns.common.priority.medium')} value="medium" />
            <CatTab label={t('tasks.breakdowns.common.priority.high')} value="high" />
          </CatTabs>
        </div>
      </CatMainContent>
    </CatDataCard>
  );
};

export default Priority;
