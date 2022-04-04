import { CatTypography } from 'catamaran/core';
import { Goal, MetricType } from 'store/slices/contracts/types';
import { Trans, useTranslation } from 'react-i18next';
import { TypographyProps } from 'catamaran/core/mui';
import { useMemo } from 'react';

type Props = TypographyProps & {
  categoryName?: string;
  goal: Goal;
  metricType: MetricType;
};

function GoalDescription(props: Props) {
  const { categoryName = '', goal, metricType, ...rest } = props;

  const { t } = useTranslation();

  const descriptionText = useMemo(() => {
    let description = <></>;
    if (metricType) {
      if (goal.limitType === 'percentage') {
        description = (
          <Trans
            i18nKey="contracts.edit.metrics.goals.percentage_based_description"
            t={t}
            values={{
              categories: categoryName,
              metricType: metricType.isDefault
                ? t(`contracts.edit.metrics.types.${metricType?.name}`)
                : metricType?.name,
              value: goal.limitPercentageValue
            }}
          />
        );
      } else {
        description = (
          <Trans
            i18nKey="contracts.edit.metrics.goals.time_based_description"
            t={t}
            values={{
              categories: categoryName,
              metricType: metricType.isDefault
                ? t(`contracts.edit.metrics.types.${metricType.name}`)
                : metricType.name,
              timeType: t(`contracts.edit.metrics.time_types.${goal.limitTimeType}`),
              value: goal.limitTimeValue
            }}
          />
        );
      }
    }
    return description;
  }, [
    categoryName,
    goal.limitPercentageValue,
    goal.limitTimeType,
    goal.limitTimeValue,
    goal.limitType,
    metricType,
    t
  ]);

  return <CatTypography {...rest}>{descriptionText}</CatTypography>;
}

export default GoalDescription;
