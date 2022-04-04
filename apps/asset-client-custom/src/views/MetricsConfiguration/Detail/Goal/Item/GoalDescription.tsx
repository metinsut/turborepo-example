import { CatTypography } from 'catamaran/core';
import { Goal } from 'store/slices/metricsConfiguration/detail/type';
import { Trans, useTranslation } from 'react-i18next';
import { TypographyProps } from 'catamaran/core/mui';
import { useMemo } from 'react';

type Props = TypographyProps & {
  categoryName?: string;
  goal: Goal;
};

function GoalDescription(props: Props) {
  const { categoryName = '', goal, ...rest } = props;

  const { t } = useTranslation();

  const descriptionText = useMemo(() => {
    let description = <></>;
    if (goal.limitType === 'percentage') {
      description = (
        <Trans
          i18nKey="metrics_configuration.detail.goals.percentage_based_description"
          t={t}
          values={{
            categories: categoryName,
            value: goal.limitPercentageValue
          }}
        />
      );
    } else if (goal.limitType === 'timeBased') {
      description = (
        <Trans
          i18nKey="metrics_configuration.detail.goals.time_based_description"
          t={t}
          values={{
            categories: categoryName,
            timeType: t(`metrics_configuration.detail.goals.time_types.${goal.limitTimeType}`),
            value: goal.limitTimeValue
          }}
        />
      );
    }

    return description;
  }, [
    categoryName,
    goal.limitPercentageValue,
    goal.limitTimeType,
    goal.limitTimeValue,
    goal.limitType,
    t
  ]);

  return <CatTypography {...rest}>{descriptionText}</CatTypography>;
}

export default GoalDescription;
