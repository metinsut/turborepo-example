import { Box, CatAreaButton, CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { Divider, IconButton, ListItemText } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import {
  close,
  goBack,
  gotoNextStep,
  selectSelectablePlans,
  selectSelectedContractId,
  selectSelectedPlanId,
  selectSelectedPlanType,
  updateSelectedPlan
} from 'store/slices/contractplans/wizard/slice';
import { selectContractById } from 'store/slices/contracts/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CancelIcon from 'catamaran/icons/Cancel';
import PlanIcon from 'catamaran/icons/Plan';
import WizardBottomBar from '../../WizardBottomBar';

type Props = {
  className?: string;
};

function AddNewOrSelect(props: Props) {
  const { className } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const selectedPlanId = useTypedSelector(selectSelectedPlanId);
  const selectedContractId = useTypedSelector(selectSelectedContractId);

  const associatedContract = useTypedSelector((state) =>
    selectContractById(state, selectedContractId)
  );

  const planType = useTypedSelector(selectSelectedPlanType);

  const selectablePlans = useTypedSelector(selectSelectablePlans);

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
    dispatch(updateSelectedPlan(contractId));
  };

  const handleAddNew = async () => {
    dispatch(updateSelectedPlan(undefined));
    await dispatch(gotoNextStep());
  };

  const planTypeResource = t(`plans.types.${planType}`);
  const valid = !!selectedPlanId;

  return (
    <Box className={className} mb={1} mx={4} style={{ width: '560px' }} width="560px">
      <Box alignItems="center" flex py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <PlanIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <CatTypography variant="h2">{t('plans.wizard.add_or_select_header')}</CatTypography>
        <Box flexGrow={1} minWidth="8px" />
        <IconButton onClick={handleClose} size="large">
          <CancelIcon color="red" contained fontSize="medium" />
        </IconButton>
      </Box>
      <Divider />
      <Box flex flexDirection="column" mb={2} mt={3}>
        {associatedContract && (
          <CatTypography style={{ height: '60px', marginBottom: '24px' }} variant="subtitle1">
            <Trans
              components={{
                bold: <b />,
                wrap: <CatTypography className="three-dot" variant="subtitle1" />
              }}
              i18nKey="plans.wizard.add_or_select_desc_contract"
              t={t}
              values={{
                associatedContract: associatedContract.title
              }}
            />
          </CatTypography>
        )}
        <CatTypography style={{ height: '60px ' }} variant="subtitle1">
          {associatedContract ? (
            <Trans
              components={{ wrap: <CatTypography className="three-dot" variant="subtitle1" /> }}
              i18nKey="plans.wizard.add_or_select_desc_associated"
              t={t}
              values={{
                associatedContract: associatedContract.title
              }}
            />
          ) : (
            t('plans.wizard.add_or_select_desc')
          )}
        </CatTypography>
        <CatSelect
          displayEmpty
          fullWidth
          menuOverflow={false}
          onChange={handleChange}
          value={selectedPlanId ?? ''}
        >
          <CatMenuItem disabled key="" value="">
            {t('plans.wizard.add_or_select_dropdown_hint', { planType: planTypeResource })}
          </CatMenuItem>
          {selectablePlans.map((p) => (
            <CatMenuItem key={p.id} value={p.id}>
              <ListItemText primary={p.title} />
            </CatMenuItem>
          ))}
        </CatSelect>
        <Box alignItems="center" flex height="40px">
          <CatTypography variant="subtitle1">{t('common.or')}</CatTypography>
        </Box>
        <CatAreaButton onClick={handleAddNew}>
          <CatTypography color="inherit" variant="subtitle2">
            {t('plans.wizard.create_plan_button')}
          </CatTypography>
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
