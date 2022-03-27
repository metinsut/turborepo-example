import { Box, CatAreaButton } from 'catamaran/core';
import { Divider, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import {
  finish,
  gotoNextStep,
  selectSelectableContractIds,
  selectSelectedContractId
} from 'store/slices/contractplans/wizard/slice';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { selectContractById } from 'store/slices/contracts/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ContractIcon from 'catamaran/icons/Contract';
import OkIcon from 'catamaran/icons/Ok';
import React from 'react';
import WizardBottomBar from '../../WizardBottomBar';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    heigth: '312px',
    width: '496px'
  }
}));

type Props = {
  className?: string;
};

function SuccessStep(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const asset = useTypedSelector(selectAsset);
  const selectedContractId = useTypedSelector(selectSelectedContractId);
  const selectableContractIds = useTypedSelector(selectSelectableContractIds);
  const selectedContract = useTypedSelector((state) =>
    selectContractById(state, selectedContractId)
  );
  const contractDescription = t(`contracts.types.${selectedContract.type}`);

  const handleNext = () => {
    dispatch(gotoNextStep());
  };

  const handleFinish = async () => {
    dispatch(finish());
  };

  const isContractNew = !selectableContractIds.includes(selectedContractId);

  return (
    <Box className={clsx(classes.root, className)} pb={1}>
      <Box flex px={3} py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <ContractIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <Typography variant="h2">{t('common.success')}</Typography>
      </Box>
      <Divider style={{ margin: '0px 32px' }} />
      <Box flex flexDirection="column" mx={4} my={3}>
        <OkIcon alwaysHovered color="green" />
        <Box height="24px" />
        <Typography className="break-word" variant="body1">
          <Trans
            components={{
              bold: <b />,
              hide_and: <span hidden={!asset.id || !isContractNew} />,
              hide_asset: <span hidden={!asset.id} />,
              hide_create: <span hidden={!isContractNew} />
            }}
            i18nKey="contracts.wizard.create_success"
            t={t}
            values={{
              title: selectedContract.title,
              type: contractDescription
            }}
          />
        </Typography>
        <Box height="28px" />
        <CatAreaButton onClick={handleNext}>
          <Typography color="inherit" variant="subtitle2">
            {t(
              asset.id
                ? 'contracts.wizard.add_plan_question_with_asset'
                : 'contracts.wizard.add_plan_question'
            )}
          </Typography>
        </CatAreaButton>
      </Box>
      <WizardBottomBar finalStep onNext={handleFinish} />
    </Box>
  );
}

export default SuccessStep;
