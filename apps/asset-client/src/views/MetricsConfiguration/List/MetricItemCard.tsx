import { CatTypography, useLocalizationHelpers } from 'catamaran/core';
import { METRICSCONFIGURATION_DETAIL } from 'routes/constant-route';
import { Metric } from 'store/slices/metricsConfiguration/detail/type';
import { Paper, styled } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import EditIcon from 'catamaran/icons/Edit';

const StyledPaper = styled(Paper)(() => ({
  '& .fade-in': {
    opacity: 0,
    transition: 'all 0.30s ease-out',
    width: '0px'
  },
  '&:hover': {
    '& .fade-in': {
      opacity: 1,
      width: '24px'
    },
    opacity: 1
  },
  opacity: 0.8,
  transition: 'opacity 0.30s ease-out'
}));

type Props = {
  metric: Metric;
};

function MetricItemCard({ metric }: Props) {
  const { t } = useTranslation();
  const { formatDateAndTime } = useLocalizationHelpers();
  const history = useHistory();

  const handleEditClick = () => {
    const route = `${METRICSCONFIGURATION_DETAIL.replace(':metricId', metric.id)}`;
    history.push(route);
  };

  return (
    <StyledPaper className="flex mt8 px24 radius-16 cursor-pointer" onClick={handleEditClick}>
      <div className="flex gap-8 align-items-center w-full">
        <div className="fade-in">
          <EditIcon fontSize="medium" />
        </div>
        <div className="flex justify-content-between w-full py16">
          <div className="grid justify-content-center align-items-start">
            <CatTypography className="opacity-8 " variant="caption">
              {t('metrics_configuration.list.asset_metric_header')}
            </CatTypography>
            <CatTypography variant="subtitle1">
              {t('metrics_configuration.list.asset_metric_desc')}
            </CatTypography>
          </div>
          <div className="grid justify-content-center align-items-end">
            <CatTypography className="opacity-8" variant="caption">
              {metric.updatedDate && (
                <Trans
                  i18nKey="metrics_configuration.list.last_edited"
                  t={t}
                  values={{ date: formatDateAndTime(metric.updatedDate) }}
                />
              )}
            </CatTypography>
            <CatTypography className="text-right" variant="body2">
              {metric.updatedByUser &&
                `${metric.updatedByUser.firstName} ${metric.updatedByUser.lastName}`}
            </CatTypography>
          </div>
        </div>
        <div className="fade-in">
          <AvatarItem person={metric.updatedByUser} size="medium" />
        </div>
      </div>
    </StyledPaper>
  );
}

export default MetricItemCard;
