import { Box } from 'catamaran/core';
import { ContractType } from 'store/slices/contracts/types';
import { Divider, Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { contractTypes } from 'store/slices/contracts/data';
import {
  goBack,
  gotoNextStep,
  selectSelectedContractType,
  setSelectedContractType
} from 'store/slices/contractplans/wizard/slice';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ContractBaseIcon from 'catamaran/icons/Contract';
import ContractIcon from 'views/Contracts/ContractIcon';
import React from 'react';
import TypeItem from 'components/TypeItem';
import WizardBottomBar from '../../WizardBottomBar';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '496px',
    width: '560px'
  }
}));

type Props = {
  className?: string;
};

function ContractTypeStep(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const asset = useTypedSelector(selectAsset);
  const selectedContractType = useTypedSelector(selectSelectedContractType);

  const handleItemClick = (contractType: ContractType) => {
    if (contractType !== selectedContractType) {
      dispatch(setSelectedContractType(contractType));
    }
  };

  const handleNext = async () => {
    await dispatch(gotoNextStep());
  };

  const handleBack = async () => {
    dispatch(goBack());
  };

  const valid = !!selectedContractType;

  return (
    <Box className={clsx(classes.root, className)} flex flexDirection="column" pb={1}>
      <Box alignItems="center" flex px={3} py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <ContractBaseIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <Typography variant="h2">{t('contracts.wizard.contract_type_header')}</Typography>
      </Box>
      <Divider style={{ margin: '0px 32px' }} />
      <Box alignContent="center" flex flexGrow={1}>
        <Grid alignContent="center" container justifyContent="center">
          {contractTypes.map((contractType) => {
            const contractTypeResource = t(`contracts.types.${contractType}`);
            return (
              <TypeItem
                description={
                  <Trans
                    components={{
                      hide: <span hidden={!asset.id} />
                    }}
                    i18nKey="contracts.wizard.contract_type_item_description"
                    t={t}
                    values={{ type: contractTypeResource.toLowerCase() }}
                  />
                }
                key={contractType}
                onClick={() => handleItemClick(contractType)}
                selected={selectedContractType === contractType}
                typeIcon={
                  <ContractIcon contained={false} contractType={contractType} hoverable={false} />
                }
                typeName={contractTypeResource}
              />
            );
          })}
        </Grid>
      </Box>
      <WizardBottomBar
        backButtonType="cancel"
        nextButtonType="next"
        nextDisabled={!valid}
        onBack={handleBack}
        onNext={handleNext}
      />
    </Box>
  );
}

export default ContractTypeStep;
