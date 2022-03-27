import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { Priority } from 'store/slices/breakdown/common/types';
import { Trans, useTranslation } from 'react-i18next';
import ExclamationIcon from 'catamaran/icons/Exclamation';
import PriorityIcon from './PriorityIcon';

type Props = {
  priority?: Priority;
  firstName?: string;
  lastName?: string;
};

const PriorityBasic = (props: Props) => {
  const { firstName, lastName, priority } = props;
  const { t } = useTranslation();

  return (
    <CatDataCard color="darkGrey" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={ExclamationIcon} />
        <CatEmptyIcon />
      </CatSidebar>
      <CatMainContent>
        <div className="grid gap-4 align-content-between justify-item-start h-full">
          <CatTypography className="opacity-5 c-main-darkgray" variant="body1">
            {t('tasks.breakdowns.common.priority.title')}
          </CatTypography>
          {firstName && (
            <CatTypography className="opacity-6" variant="body2">
              <Trans
                i18nKey={`tasks.breakdowns.common.priority.set_by_${priority}`}
                t={t}
                values={{ firstName, lastName }}
              />
            </CatTypography>
          )}
          <PriorityIcon className="justify-self-start" priorityType={priority} />
        </div>
      </CatMainContent>
    </CatDataCard>
  );
};

export default PriorityBasic;
