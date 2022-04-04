import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatPanel,
  CatPanelContent,
  CatPanelHeader,
  CatSidebar,
  CatTypography,
  useLocalizationHelpers
} from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import TimeIcon from 'catamaran/icons/Time';
import styles from '../BreakdownCommon.module.scss';

type Props = {
  requestDate: string;
};

const DateTime = ({ requestDate }: Props) => {
  const { t } = useTranslation();

  const { formatDate, formatTime } = useLocalizationHelpers();

  return (
    <CatPanel className={styles.panel_wrapper}>
      <CatPanelHeader title={t('tasks.waiting_for_confirmation.date_time')} />
      <CatPanelContent>
        <CatDataCard color="darkGrey" transparentBackground width="336px">
          <CatSidebar>
            <CatEmptyIcon />
            <CatCenterIcon component={TimeIcon} />
            <CatEmptyIcon />
          </CatSidebar>
          <CatMainContent className="grid align-content-between gap-16">
            <CatTypography variant="subtitle1">
              {t('tasks.waiting_for_confirmation.request_date_time')}
            </CatTypography>
            <div>
              <CatTypography variant="h1">{formatTime(requestDate)}</CatTypography>
              <CatTypography className="opacity-8" variant="subtitle1">
                {formatDate(requestDate)}
              </CatTypography>
            </div>
          </CatMainContent>
        </CatDataCard>
      </CatPanelContent>
    </CatPanel>
  );
};

export default DateTime;
