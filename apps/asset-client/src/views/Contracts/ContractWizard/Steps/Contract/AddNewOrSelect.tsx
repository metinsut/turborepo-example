import { Box, CatAreaButton, CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { Divider, IconButton, ListItemText } from 'catamaran/core/mui';
import {
  close,
  goBack,
  gotoNextStep,
  selectSelectableContracts,
  selectSelectedContractId,
  selectSelectedContractType,
  updateSelectedContract
} from 'store/slices/contractplans/wizard/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';
import ContractBaseIcon from 'catamaran/icons/Contract';
import WizardBottomBar from '../../WizardBottomBar';

type Props = {
  className?: string;
};

function AddNewOrSelect(props: Props) {
  const { className } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const contractType = useTypedSelector(selectSelectedContractType);
  const selectedContractId = useTypedSelector(selectSelectedContractId);

  const contracts = useTypedSelector(selectSelectableContracts);

  const handleClose = () => {
    dispatch(close());
  };

  const handleNext = async () => {
    await dispatch(gotoNextStep());
  };

  const handleBack = async () => {
    dispatch(goBack());
  };

  const handleChange = (event: any) => {
    const contractId: string = event.target.value;
    dispatch(updateSelectedContract(contractId));
  };

  const handleAddNew = async () => {
    dispatch(updateSelectedContract());
    await dispatch(gotoNextStep());
  };

  const contractTypeResource = t(`contracts.types.${contractType}`);

  const valid = !!selectedContractId;

  return (
    <Box className={className} mb={1} mx={4} width="560px">
      <Box alignItems="center" flex py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <ContractBaseIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <CatTypography variant="h2">{t('contracts.wizard.add_or_select_header')}</CatTypography>
        <Box flexGrow={1} minWidth="8px" />
        <IconButton onClick={handleClose} size="large">
          <CancelIcon color="red" contained fontSize="medium" />
        </IconButton>
      </Box>
      <Divider />
      <Box flex flexDirection="column" mb={2} mt={3}>
        <Box alignItems="center" flex height="40px">
          <CatTypography variant="subtitle1">{t('contracts.wizard.select_existing')}</CatTypography>
        </Box>
        <CatSelect
          displayEmpty
          fullWidth
          menuOverflow={false}
          onChange={handleChange}
          value={selectedContractId ?? ''}
        >
          <CatMenuItem disabled key="" value="">
            {t('contracts.wizard.select_contract', { type: contractTypeResource })}
          </CatMenuItem>
          {contracts.map((c) => (
            <CatMenuItem key={c.id} value={c.id}>
              <ListItemText primary={c.title} />
            </CatMenuItem>
          ))}
        </CatSelect>
        <Box alignItems="center" flex height="40px">
          <CatTypography variant="subtitle1">{t('common.or')}</CatTypography>
        </Box>
        <CatAreaButton onClick={handleAddNew}>
          {t('contracts.wizard.create_contract', { type: contractTypeResource })}
        </CatAreaButton>
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

export default AddNewOrSelect;
