import { Box, CatDatePicker, CatKeyboardSection, CatTypography } from 'catamaran/core';
import { Contract } from 'store/slices/contracts/types';
import { dequal } from 'dequal';
import {
  selectContractBasicInformation,
  selectInitialContractBasicInformation
} from 'store/slices/contracts/selectors';
import { updateBasicInformation } from 'store/slices/contracts/slice';
import { useDebounce } from 'react-use';
import { useFormState } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, withFormHelper } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BranchIcon from 'catamaran/icons/Branch';
import CalendarIcon from 'catamaran/icons/CalendarMaster';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import Category2Icon from 'catamaran/icons/Category2';
import ContractBranchMultiSelector from '../MultiSelectors/ContractBranchMultiSelector';
import ContractMainCategorySelector from '../SingleSelectors/ContractMainCategorySelector';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import React from 'react';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';
import TitleIcon from 'catamaran/icons/Title';
import contractInformationValidator from 'helpers/validations/ContractInformationValidator';

type Props = {
  editContract?: Contract;
  onCancel?: () => void;
  onGoBack?: () => void;
  onSave?: () => void;
};

const CatDatePickerWithFormHelper = withFormHelper(CatDatePicker);

function EditMode(props: Props) {
  const { editContract, onCancel, onGoBack, onSave } = props;

  const { t } = useTranslation();
  const contractTypeResource = t(`contracts.types.${editContract.type}`);

  const contractInformation = useTypedSelector(selectContractBasicInformation);
  const initialContractInformation = useTypedSelector(selectInitialContractBasicInformation);

  const formHelper = useFormState(contractInformation, contractInformationValidator);

  const dispatch = useTypedDispatch();

  useDebounce(
    () => {
      const { notes, title, startDate, endDate } = formHelper.formState.values;
      dispatch(updateBasicInformation({ endDate, notes, startDate, title }));
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

  const contractChanged = !dequal(contractInformation, initialContractInformation);
  const valid = formHelper.formState.isValid && contractInformation.branchIds.length > 0;

  return (
    <CatKeyboardSection onEnter={handleSave} onEscape={handleCancel} open>
      <>
        <Box alignItems="center" flex mb={2.5}>
          <BranchIcon color="darkGrey" contained={false} fontSize="small" hoverable={false} />
          <Box ml={1}>
            <Category2Icon color="darkGrey" contained={false} fontSize="small" hoverable={false} />
          </Box>
          <Box ml={1}>
            <CatTypography variant="body2">
              {t('contracts.edit.branch_and_main_category_desc')}
            </CatTypography>
          </Box>
        </Box>
        <Box flex mb={2.5}>
          <Box className="w-half">
            <ContractBranchMultiSelector />
          </Box>
          <Box className="w-half" ml={2}>
            <ContractMainCategorySelector contractId={editContract.id} />
          </Box>
        </Box>
        <Box alignItems="flex-start" flex mb={2} ml={-5}>
          <TitleIcon className="opacity-8" color="darkGrey" contained={false} hoverable={false} />
          <Box ml={2}>
            <Box mb={1}>
              <CatTypography variant="subtitle1">
                {t('contracts.edit.basic_information_header')}
              </CatTypography>
            </Box>
            <CatTypography className="opacity-6" variant="body1">
              {t('contracts.edit.basic_information_helper')}
            </CatTypography>
          </Box>
        </Box>
        <Box flex mb={2}>
          <Box className="w-half">
            <CatamaranTextField
              formHelper={formHelper}
              isRequired
              label={t('contracts.edit.title_field')}
              mode="editOnly"
              name="title"
            />
          </Box>
          <Box className="w-half" ml={2}>
            <ReadonlyTextField label={t('contracts.edit.type_field')} text={contractTypeResource} />
          </Box>
        </Box>
        <Box flex mb={2}>
          <Box className="w-full">
            <CatamaranTextField
              formHelper={formHelper}
              label={t('contracts.edit.notes_field')}
              mode="editOnly"
              multiline
              name="notes"
            />
          </Box>
        </Box>
        <Box alignItems="center" flex mb={2}>
          <CalendarIcon
            className="opacity-8"
            color="darkGrey"
            contained={false}
            fontSize="small"
            hoverable={false}
          />
          <Box ml={1}>
            <CatTypography className="opacity-6" variant="body2">
              {t('contracts.edit.date_desc')}
            </CatTypography>
          </Box>
        </Box>
        <Box flex mb={2}>
          <Box className="w-half">
            <CatDatePickerWithFormHelper
              formHelper={formHelper}
              label={t('contracts.edit.date_start_field')}
              maxDate={editContract.endDate}
              name="startDate"
              required
            />
          </Box>
          <Box className="w-half" ml={2}>
            <CatDatePickerWithFormHelper
              formHelper={formHelper}
              label={t('contracts.edit.date_end_field')}
              minDate={editContract.startDate}
              name="endDate"
              required
            />
          </Box>
        </Box>
        <KeyboardSectionBottomButtons
          isConfirmDisabled={!contractChanged || !valid}
          mode={editContract.id ? 'edit' : 'add'}
          touched={contractChanged}
        />
      </>
    </CatKeyboardSection>
  );
}

export default EditMode;
