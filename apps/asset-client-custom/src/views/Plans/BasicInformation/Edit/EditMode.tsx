import { Box, CatKeyboardSection } from 'catamaran/core';
import { Plan } from 'store/slices/plans/types';
import { Typography } from 'catamaran/core/mui';
import { dequal } from 'dequal';
import { selectContractById } from 'store/slices/contracts/selectors';
import {
  selectInitialPlanBasicInformation,
  selectPlanBasicInformation
} from 'store/slices/plans/selectors';
import { updateBasicPlanInformation } from 'store/slices/plans/slice';
import { useDebounce } from 'react-use';
import { useFormState, useTypedDispatch } from 'hooks';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { validateBasicPlanInformation } from 'store/slices/plans/actions';
import AssociatedContractItem from './AssociatedContractItem';
import BranchIcon from 'catamaran/icons/Branch';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import Category2Icon from 'catamaran/icons/Category2';
import FirstPlanAndPeriodSelection from './FirstPlanAndPeriodSelection';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import PlanBranchMultiSelector from 'views/Plans/MultiSelectors/PlanBranchMultiSelector';
import PlanMainCategorySelector from 'views/Plans/SingleSelectors/PlanMainCategorySelector';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';
import TitleIcon from 'catamaran/icons/Title';
import makePlanInformationValidator from 'helpers/validations/PlanInformationValidator';

type Props = {
  editPlan?: Plan;
  onCancel?: () => void;
  onGoBack?: () => void;
  onSave?: () => void;
};

function EditMode(props: Props) {
  const { editPlan, onCancel, onGoBack, onSave } = props;

  const { t } = useTranslation();
  const planTypeResource = t(`plans.types.${editPlan.type}`);

  const planBasicInformation = useTypedSelector(selectPlanBasicInformation);
  const initialPlanBasicInformation = useTypedSelector(selectInitialPlanBasicInformation);

  const associatedContract = useTypedSelector((state) =>
    selectContractById(state, editPlan.contractId)
  );

  const planInformationValidator = useMemo(
    () => makePlanInformationValidator(associatedContract),
    [associatedContract]
  );

  const formHelper = useFormState(planBasicInformation, planInformationValidator);

  const dispatch = useTypedDispatch();
  useDebounce(
    () => {
      const { endDate, notes, startDate, title } = formHelper.formState.values;
      dispatch(updateBasicPlanInformation({ endDate, notes, startDate, title }));
    },
    300,
    [dispatch, formHelper.formState.values]
  );

  const handleCancel = async () => {
    await onCancel();
    onGoBack();
  };

  const handleSave = async () => {
    await onSave();
    onGoBack();
  };

  const planChanged = !dequal(planBasicInformation, initialPlanBasicInformation);

  const valid = useMemo(
    () => validateBasicPlanInformation(planBasicInformation, associatedContract),
    [associatedContract, planBasicInformation]
  );

  return (
    <CatKeyboardSection onEnter={handleSave} onEscape={handleCancel} open>
      <>
        <Box alignItems="center" flex mb={2.5}>
          <BranchIcon color="darkGrey" contained fontSize="small" hoverable={false} />
          <Box ml={1}>
            <Category2Icon color="darkGrey" contained fontSize="small" hoverable={false} />
          </Box>
          <Box ml={1}>
            <Typography variant="body2">{t('plans.edit.branch_and_main_category_desc')}</Typography>
          </Box>
        </Box>
        <Box flex mb={2.5}>
          <Box width="50%">
            <PlanBranchMultiSelector />
          </Box>
          <Box ml={2} width="50%">
            <PlanMainCategorySelector
              associatedContractCategoryId={associatedContract?.mainCategoryId ?? undefined}
              planId={editPlan.id}
            />
          </Box>
        </Box>
        <Box alignItems="flex-start" flex mb={2} ml={-5}>
          <TitleIcon
            color="darkGrey"
            contained={false}
            hoverable={false}
            style={{ opacity: '80%' }}
          />
          <Box ml={2}>
            <Box mb={1}>
              <Typography variant="subtitle1">
                {t('plans.edit.basic_information_header')}
              </Typography>
            </Box>
            <Typography style={{ opacity: '60%' }} variant="body1">
              {t('plans.edit.basic_information_helper')}
            </Typography>
          </Box>
        </Box>
        <Box flex justifyContent="space-between">
          <Box mb={2} width="50%">
            <Box mb={2}>
              <CatamaranTextField
                formHelper={formHelper}
                isRequired
                label={t('plans.edit.title_field')}
                mode="editOnly"
                name="title"
              />
            </Box>
            <Box mb={2}>
              <ReadonlyTextField label={t('plans.edit.type_field')} text={planTypeResource} />
            </Box>
            <CatamaranTextField
              formHelper={formHelper}
              label={t('plans.edit.notes_field')}
              mode="editOnly"
              multiline
              name="notes"
            />
          </Box>
          <Box alignItems="flex-end" mb={2} ml={2} width="30%">
            <AssociatedContractItem contract={associatedContract} />
          </Box>
        </Box>
        <FirstPlanAndPeriodSelection
          associatedContract={associatedContract}
          formHelper={formHelper}
          planBasicInformation={planBasicInformation}
        />
        <KeyboardSectionBottomButtons
          isConfirmDisabled={!planChanged || !valid}
          mode={editPlan.id ? 'edit' : 'add'}
          touched={planChanged}
        />
      </>
    </CatKeyboardSection>
  );
}

export default EditMode;
