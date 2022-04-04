import { Asset } from 'store/slices/asset/detail/types';
import { AssetContext } from 'views/Assets/Assets';
import { Box } from 'catamaran/core';
import { Divider, Paper, Typography } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { getAssetContracts, getAssetPlans } from 'store/slices/asset/detail/actions';
import { useTypedDispatch } from 'hooks';
import ContractAddButton from './Contract/AddButton';
import ContractCard from './Contract/ContractCard';
import ContractIcon from 'catamaran/icons/Contract';
import PlanAddButton from './Plan/AddButton';
import PlanCard from './Plan/PlanCard';
import PlanIcon from 'catamaran/icons/Plan';
import React, { useEffect } from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  asset?: Asset;
};

function ContractProtectionDefinitionCard(props: Props) {
  const { className, asset } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (asset.id) {
      dispatch(getAssetContracts(asset.id));
      dispatch(getAssetPlans(asset.id));
    }
  }, [dispatch, asset.id]);

  if (!asset) {
    // Added to remove not-used warning
    return null;
  }

  return (
    <Paper className={clsx('radius-16 my8', className)}>
      <Box color="darkGrey.main" component="h2" fontSize={18} fontWeight={500} p={2}>
        {t('assets.protection.contract_protection_header')}
      </Box>
      <Box mb={2.5} px={2}>
        <Divider />
      </Box>
      <Box alignItems="flex-start" flex flexDirection="row">
        <Box p={2} width="50%">
          <Box flex mb={1.5}>
            <ContractIcon color="darkGrey" contained={false} hoverable={false} />
            <Box ml={2}>
              <Box mb={1}>
                <Typography style={{ opacity: '80%' }} variant="subtitle1">
                  {t('assets.protection.contracts_title')}
                </Typography>
              </Box>
              <Typography style={{ opacity: '80%' }} variant="body2">
                <Trans i18nKey="assets.protection.contracts_description" t={t} />
              </Typography>
            </Box>
          </Box>
          <AssetContext.Provider value={asset}>
            <ContractAddButton className="mb16" />
          </AssetContext.Provider>
          {asset.contractIds.map((id) => (
            <Box key={id} mb={2}>
              <ContractCard contractId={id} key={id} />
            </Box>
          ))}
        </Box>
        <Box p={2} width="50%">
          <Box flex mb={1.5}>
            <PlanIcon color="darkGrey" contained={false} hoverable={false} />
            <Box ml={2}>
              <Box mb={1}>
                <Typography style={{ opacity: '80%' }} variant="subtitle1">
                  {t('assets.protection.plans_title')}
                </Typography>
              </Box>
              <Typography style={{ opacity: '80%' }} variant="body2">
                <Trans i18nKey="assets.protection.plans_description" t={t} />
              </Typography>
            </Box>
          </Box>
          <AssetContext.Provider value={asset}>
            <PlanAddButton className="mb16" />
          </AssetContext.Provider>
          {asset.planIds.map((id) => (
            <Box key={id} mb={2}>
              <PlanCard key={id} planId={id} />
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

export default ContractProtectionDefinitionCard;
