import { Box, CatKeyboardSection } from 'catamaran/core';
import { Department } from 'store/slices/users/departments/types';
import { DisplayType } from 'utils';
import { useFormState } from 'hooks';
import { useTranslation } from 'react-i18next';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import EditHeader from 'components/Sections/EditHeader';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import TitleIcon from 'catamaran/icons/Title';
import departmentInformationValidator from 'helpers/validations/User/DepartmentInformationValidator';

type Props = {
  department: Department;
  onGoBack?: () => void;
  onConfirm?: (name: string, notes: string) => void;
  onNext?: () => void;
  sectionMode?: DisplayType;
};

function EditMode(props: Props) {
  const { department, onGoBack, onConfirm, onNext, sectionMode } = props;

  const { t } = useTranslation();

  const formHelper = useFormState(department, departmentInformationValidator);

  const handleCancel = async () => {
    formHelper.reset(department);
    onGoBack();
  };

  const handleConfirm = async () => {
    const { name, notes } = formHelper.formState.values;
    await onConfirm(name, notes);
    onNext();
  };

  const touched = formHelper.formState.isTouched;

  return (
    <CatKeyboardSection onEnter={handleConfirm} onEscape={handleCancel} open>
      <Box>
        <Box mb={2}>
          <EditHeader
            descriptionText={t('users.departments.edit.basicInfo.description')}
            headerIcon={<TitleIcon color="darkGrey" contained={false} hoverable={false} />}
            headerText={t('users.departments.edit.basicInfo.header')}
          />
        </Box>
        <Box flex mb={2}>
          <Box width="50%">
            <CatamaranTextField
              formHelper={formHelper}
              label={t('users.departments.edit.basicInfo.title_field')}
              mode="editOnly"
              name="name"
            />
          </Box>
          <Box ml={2} width="50%">
            <CatamaranTextField
              formHelper={formHelper}
              label={t('users.departments.edit.basicInfo.notes_field')}
              mode="editOnly"
              name="notes"
            />
          </Box>
        </Box>
        <KeyboardSectionBottomButtons
          isConfirmDisabled={!formHelper.formState.isValid}
          mode={sectionMode}
          touched={touched}
        />
      </Box>
    </CatKeyboardSection>
  );
}

export default EditMode;
