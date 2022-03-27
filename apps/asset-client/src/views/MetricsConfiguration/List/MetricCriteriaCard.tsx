import { CatPaper, CatTypography } from 'catamaran/core';
import { METRICSCONFIGURATION_LIST } from 'routes/constant-route';
import { Trans, useTranslation } from 'react-i18next';
import CategorySelectorWithQuery, {
  useMainCategory
} from 'components/Category/CategorySelectorWithQuery';
import LighthouseIcon from 'catamaran/icons/Lighthouse';
import React from 'react';

function MetricCriteriaCard() {
  const { t } = useTranslation();
  const baseCategorySelectorUrl = METRICSCONFIGURATION_LIST;

  const mainCategoryId = useMainCategory(baseCategorySelectorUrl);

  return (
    <CatPaper
      className="px24 py16 grid grid-auto-flow-column gap-24 align-items-center"
      style={{ gridTemplateColumns: '24px auto minmax(auto, 340px)' }}
    >
      <LighthouseIcon fontSize="small" />
      <div className="grid gap-8">
        <CatTypography className="opacity-8" variant="h2">
          {t('metrics_configuration.list.metric_criteria_title')}
        </CatTypography>
        <CatTypography className="opacity-6" variant="body1">
          <Trans i18nKey="metrics_configuration.list.metric_criteria_desc" t={t} />
        </CatTypography>
      </div>
      <CategorySelectorWithQuery
        baseUrl={baseCategorySelectorUrl}
        selectedMainCategoryId={mainCategoryId}
      />
    </CatPaper>
  );
}

export default MetricCriteriaCard;
