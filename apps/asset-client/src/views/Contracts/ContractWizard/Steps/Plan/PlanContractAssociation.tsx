import { Box } from 'catamaran/core';
import { Divider, Grid, IconButton, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { PlanContractAssociation } from 'store/slices/plans/types';
import {
  close,
  goBack,
  gotoNextStep,
  selectPlanContractAssociation,
  selectSelectedPlanType,
  updateContractAssociation
} from 'store/slices/contractplans/wizard/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CancelIcon from 'catamaran/icons/Cancel';
import ContractIcon from 'catamaran/icons/Contract';
import LinkIcon from 'catamaran/icons/Link';
import MaintenanceIcon from 'catamaran/icons/Maintenance';
import React from 'react';
import TypeItem from 'components/TypeItem';
import WizardBottomBar from '../../WizardBottomBar';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '408px',
    width: '560px'
  }
}));

type Props = {
  className?: string;
};

function PlanContractAssociationStep(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const contractAssociation = useTypedSelector(selectPlanContractAssociation);
  const selectedPlanType = useTypedSelector(selectSelectedPlanType);
  const planTypeResource = t(`plans.types.${selectedPlanType}`);

  const handleClose = () => {
    dispatch(close());
  };

  const handleNext = async () => {
    await dispatch(gotoNextStep());
  };

  const handleBack = async () => {
    dispatch(goBack());
  };

  const handleChange = (newContractAssociation: PlanContractAssociation) => {
    dispatch(updateContractAssociation(newContractAssociation));
  };

  const valid = !!contractAssociation;

  return (
    <Box className={clsx(classes.root, className)} flex flexDirection="column" pb={1}>
      <Box alignItems="center" flex px={3} py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <ContractIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <Typography variant="h2">{t('plans.wizard.contract_association_title')}</Typography>
        <Box flexGrow={1} />
        <IconButton onClick={handleClose} size="large">
          <CancelIcon color="red" contained fontSize="medium" />
        </IconButton>
      </Box>
      <Divider style={{ margin: '0px 32px' }} />
      <Box flex flexDirection="column" flexGrow={1} pt={2} px={4}>
        <Typography variant="body1">
          {t('plans.wizard.contract_association_description', {
            planType: planTypeResource.toLowerCase()
          })}
        </Typography>
        <Box alignItems="center" flex flexGrow={1}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TypeItem
                description={t('plans.wizard.with_contract_description', {
                  planType: planTypeResource
                })}
                onClick={() => handleChange('withContract')}
                selected={contractAssociation === 'withContract'}
                typeIcon={
                  <Box alignItems="center" flex>
                    <ContractIcon color="darkGrey" contained={false} hoverable={false} />
                    <LinkIcon
                      color="darkGrey"
                      contained={false}
                      fontSize="small"
                      hoverable={false}
                    />
                    <MaintenanceIcon color="darkGrey" contained={false} hoverable={false} />
                  </Box>
                }
                typeName={t('plans.wizard.with_contract')}
                wideIcon
              />
            </Grid>
            <Grid item xs={6}>
              <TypeItem
                description={t('plans.wizard.no_contract_description', {
                  planType: planTypeResource
                })}
                onClick={() => handleChange('noContract')}
                selected={contractAssociation === 'noContract'}
                typeIcon={
                  <Box alignItems="center" flex>
                    <ContractIcon color="darkGrey" contained={false} hoverable={false} />
                    <CancelIcon
                      color="darkGrey"
                      contained={false}
                      fontSize="small"
                      hoverable={false}
                    />
                    <MaintenanceIcon color="darkGrey" contained={false} hoverable={false} />
                  </Box>
                }
                typeName={t('plans.wizard.no_contract')}
                wideIcon
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <WizardBottomBar
        backButtonType="goBack"
        nextButtonType="next"
        nextDisabled={!valid}
        onBack={handleBack}
        onNext={handleNext}
      />
    </Box>
  );
}

export default PlanContractAssociationStep;
