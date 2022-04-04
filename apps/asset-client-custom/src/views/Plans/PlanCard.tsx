import {
  Box,
  CatCenterIcon,
  CatDataCard,
  CatDataCardProps,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography,
  useLocalizationHelpers
} from 'catamaran/core';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { getPlanIconComponent } from './PlanTypeIcon';
import { selectPlanById } from 'store/slices/plans/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

export type Props = Omit<CatDataCardProps, 'title'> & {
  className?: string;
  planId?: string;
  iconComponent?: React.ElementType<IconBaseProps>;
  title?: React.ReactNode;
};

function PlanCard(props: Props) {
  const classes = useStyles();
  const { className, color = 'blue', planId, iconComponent, style, title, ...rest } = props;

  const { t } = useTranslation();
  const { formatDate } = useLocalizationHelpers();

  const plan = useTypedSelector((state) => selectPlanById(state, planId));

  if (!plan) {
    return null;
  }

  return (
    <>
      <CatDataCard
        className={clsx(className, classes.root, 'break-word')}
        color={color}
        style={{ ...style, minHeight: 116 }}
        {...rest}
      >
        {(hover, color) => (
          <>
            <CatSidebar>
              <CatEmptyIcon />
              <CatCenterIcon component={iconComponent ?? getPlanIconComponent(plan.type)} />
              <CatEmptyIcon />
            </CatSidebar>
            <CatMainContent col color={color} flex justifyContent="space-between">
              <CatTypography color="inherit" variant="subtitle1">
                {title ?? plan.title}
              </CatTypography>
              <Box col flex>
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="plans.item.type_field"
                    t={t}
                    values={{ type: t(`plans.types.${plan?.type}`) }}
                  />
                </CatTypography>
                <Box height={3} />
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="plans.item.title_field"
                    t={t}
                    values={{ title: plan.title }}
                  />
                </CatTypography>
                <Box height={8} />
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="plans.item.start_date_field"
                    t={t}
                    values={{ date: formatDate(plan.startDate) }}
                  />
                </CatTypography>
                <Box height={3} />
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="plans.item.end_date_field"
                    t={t}
                    values={{ date: formatDate(plan.endDate) }}
                  />
                </CatTypography>
              </Box>
            </CatMainContent>
          </>
        )}
      </CatDataCard>
    </>
  );
}

export default PlanCard;
