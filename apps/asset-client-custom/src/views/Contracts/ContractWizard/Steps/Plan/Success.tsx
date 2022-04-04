import { Box } from 'catamaran/core';
import { Divider, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { finish, selectSelectedPlanId } from 'store/slices/contractplans/wizard/slice';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { selectContractById } from 'store/slices/contracts/selectors';
import { selectPlanById } from 'store/slices/plans/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import OkIcon from 'catamaran/icons/Ok';
import PlanIcon from 'catamaran/icons/Plan';
import React from 'react';
import WizardBottomBar from '../../WizardBottomBar';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    heigth: 'auto',
    width: '496px'
  }
}));

type Props = {
  className?: string;
};

function Success(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const asset = useTypedSelector(selectAsset);
  const selectedPlanId = useTypedSelector(selectSelectedPlanId);
  const plan = useTypedSelector((state) => selectPlanById(state, selectedPlanId));
  const associatedContract = useTypedSelector((state) =>
    selectContractById(state, plan.contractId)
  );

  const handleFinish = async () => {
    dispatch(finish());
  };

  const planTypeResource = t(`plans.types.${plan.type}`);

  return (
    <Box className={clsx(classes.root, className)} pb={1}>
      <Box flex px={3} py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <PlanIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <Typography variant="h2">{t('common.success')}</Typography>
      </Box>
      <Divider style={{ margin: '0px 32px' }} />
      <Box flex flexDirection="column" mx={4} my={3}>
        <OkIcon alwaysHovered color="green" />
        <Box height="24px" />
        <Typography className="break-word" variant="body1">
          {associatedContract ? (
            <Trans
              components={{
                bold: <b />,
                hide_asset: <span hidden={!asset.id} />,
                hide_created: <span hidden={!!asset.id} />
              }}
              i18nKey="plans.wizard.success_desc_with_contract"
              t={t}
              values={{
                associatedContractTitle: associatedContract.title,
                planTitle: plan.title,
                planType: planTypeResource
              }}
            />
          ) : (
            <Trans
              components={{
                bold: <b />,
                hide_asset: <span hidden={!asset.id} />,
                hide_created: <span hidden={!!asset.id} />
              }}
              i18nKey="plans.wizard.success_desc"
              t={t}
              values={{
                planTitle: plan.title
              }}
            />
          )}
        </Typography>
      </Box>
      <WizardBottomBar finalStep onNext={handleFinish} />
    </Box>
  );
}

export default Success;
