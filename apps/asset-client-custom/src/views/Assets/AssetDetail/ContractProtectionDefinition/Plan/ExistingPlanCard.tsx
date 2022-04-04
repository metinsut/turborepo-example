import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import PlanCard, { Props as PlanCardProps } from 'views/Plans/PlanCard';
import React from 'react';
import UnlinkIcon from 'catamaran/icons/Unlink';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = Partial<PlanCardProps> & {
  className?: string;
};

function ExistingPlanCard(props: Props) {
  const classes = useStyles();
  const { className, ...rest } = props;

  const { t } = useTranslation();

  return (
    <PlanCard
      className={clsx(className, classes.root)}
      color="red"
      iconComponent={UnlinkIcon}
      title={
        <Trans components={{ bold: <b /> }} i18nKey="plans.wizard.existing_plan_header" t={t} />
      }
      transparentBackground
      {...rest}
    />
  );
}

export default ExistingPlanCard;
