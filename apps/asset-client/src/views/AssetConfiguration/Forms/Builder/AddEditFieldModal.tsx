import { CancelButton, ConfirmButton, CreateButton, GoBackButton } from 'catamaran/core/Button';
import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatMenuItem,
  CatSelect,
  CatSwitch,
  CatTooltip,
  CatTypography
} from 'catamaran/core';
import { FormField, SectionTypes } from 'store/slices/assetConfiguration/forms/types';
import { Trans, useTranslation } from 'react-i18next';
import { dataTypes, identificationDataTypes } from 'store/slices/assetConfiguration/forms/data';
import { handleFieldAction } from 'store/slices/assetConfiguration/forms/actions';
import { selectCurrentFormFields } from 'store/slices/assetConfiguration/forms/selector';
import { useFormState, useLoading, useTypedSelector, withDialogWrapper } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import EditIcon from 'catamaran/icons/Edit';
import InfoIcon from 'catamaran/icons/Info';
import InvalidFieldIcon from 'catamaran/icons/InvalidField';
import PlusIcon from 'catamaran/icons/Plus';
import ValidFieldIcon from 'catamaran/icons/ValidField';
import formsValidator from 'helpers/validations/FormsValidator';

type Props = {
  field: SectionTypes;
  formId?: string;
  onClose: () => void;
  open: boolean;
  sectionField?: FormField;
};

const AddEditFieldModal = (props: Props) => {
  const { onClose, field, sectionField = {}, formId, open } = props;
  const { t } = useTranslation();
  const currentFields = useTypedSelector(selectCurrentFormFields);
  const [handleFieldActionLoading, handleFieldActionDispatch] = useLoading<FormField>();

  const isEditField = sectionField?.title;

  const defaultStateField: FormField = {
    dataType: 'freeText',
    isRequired: !!(field === 'identification'),
    isUnique: field === 'identification' ? true : undefined,
    section: field,
    title: ''
  };
  const formHelper = useFormState(isEditField ? sectionField : defaultStateField, formsValidator);
  const {
    handleChange,
    formState: { values, errors, isTouched }
  } = formHelper;

  const modalTitle = isEditField
    ? 'categories.forms.form_builder.add_edit_modal.edit_field'
    : 'categories.forms.form_builder.add_edit_modal.create_field';

  const isTitleFieldValid = () => {
    if (errors.title) {
      return errors.title;
    }
    if (checkSameTitleExistInThisField()) {
      return t('categories.forms.form_builder.add_edit_modal.same_title_error');
    }
    return undefined;
  };

  const checkSameTitleExistInThisField = () => {
    const hasSameTitle = currentFields.find(
      (field) => field.title === values.title && field.id !== values.id
    );
    return !!hasSameTitle;
  };

  const confirmButtonDisableStatus = !!(errors.title || checkSameTitleExistInThisField());

  errors.title = isTitleFieldValid();

  const saveField = async () => {
    const newField = {
      dataType: values.dataType,
      id: values.id,
      isRequired: values.isRequired,
      isUnique: values.isUnique,
      section: values.section,
      title: values.title
    };
    const postType = isEditField ? 'edit' : 'add';
    await handleFieldActionDispatch(handleFieldAction(postType, newField, formId, field));
    onClose();
  };

  return (
    <CatDialog onAction={saveField} onClose={onClose} open={open}>
      <CatDialogTitle
        closable
        iconComponent={isEditField ? EditIcon : PlusIcon}
        title={t(modalTitle)}
      />
      <CatDialogContent className="grid gap-24">
        <CatTypography variant="body1">
          {t('categories.forms.form_builder.add_edit_modal.description')}
        </CatTypography>
        {field === 'identification' && (
          <div className="flex align-items-center gap-16">
            <InfoIcon alwaysHovered color="lightGrey" contained />
            <CatTypography variant="body2">
              <Trans i18nKey="categories.forms.form_builder.add_edit_modal.info" t={t} />
            </CatTypography>
          </div>
        )}
        <div className="divider-horizontal" />
        <CatamaranTextField
          formHelper={formHelper}
          label={t('categories.forms.form_builder.add_edit_modal.title_field')}
          mode="editOnly"
          name="title"
          onChange={handleChange}
          required
          validatable
        />
        <CatSelect
          fullWidth
          label={t('categories.forms.form_builder.add_edit_modal.data_type')}
          name="dataType"
          onChange={handleChange}
          required
          value={values.dataType}
        >
          {field === 'identification'
            ? identificationDataTypes.map((type) => (
                <CatMenuItem key={type} value={type}>
                  {t(`categories.forms.form_builder.data_type.${type}`)}
                </CatMenuItem>
              ))
            : dataTypes.map((type) => (
                <CatMenuItem key={type} value={type}>
                  {t(`categories.forms.form_builder.data_type.${type}`)}
                </CatMenuItem>
              ))}
        </CatSelect>
        <div className="divider-horizontal" />
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center gap-8">
            {values.isRequired ? (
              <ValidFieldIcon fontSize="large" />
            ) : (
              <InvalidFieldIcon fontSize="large" />
            )}
            <CatTypography variant="body1">
              {t('categories.forms.form_builder.add_edit_modal.required_field')}
            </CatTypography>
          </div>
          <div className="flex align-items-center gap-24">
            <CatSwitch checked={values.isRequired} name="isRequired" onChange={handleChange} />
            <CatTooltip
              arrow
              placement="bottom"
              title={t('categories.forms.form_builder.add_edit_modal.required_info')}
            >
              <div>
                <InfoIcon alwaysHovered color="lightGrey" contained />
              </div>
            </CatTooltip>
          </div>
        </div>
        {field === 'identification' && (
          <div className="flex align-items-center justify-content-between">
            <div className="flex align-items-center gap-8">
              <InfoIcon alwaysHovered fontSize="small" />
              <CatTypography variant="body1">
                {t('categories.forms.form_builder.add_edit_modal.unique_value')}
              </CatTypography>
            </div>
            <div className="flex align-items-center gap-24">
              <CatSwitch checked={values.isUnique} name="isUnique" onChange={handleChange} />
              <CatTooltip
                arrow
                placement="bottom"
                title={t('categories.forms.form_builder.add_edit_modal.unique_info')}
              >
                <div>
                  <InfoIcon alwaysHovered color="lightGrey" contained />
                </div>
              </CatTooltip>
            </div>
          </div>
        )}
      </CatDialogContent>
      <CatDialogAction>
        {isTouched ? (
          <CatDialogButton component={CancelButton} variant="close" />
        ) : (
          <CatDialogButton component={GoBackButton} variant="close" />
        )}
        {isEditField ? (
          <CatDialogButton
            component={ConfirmButton}
            disabled={!isTouched || confirmButtonDisableStatus}
            loading={handleFieldActionLoading}
            variant="action"
          />
        ) : (
          <CatDialogButton
            component={CreateButton}
            disabled={confirmButtonDisableStatus}
            loading={handleFieldActionLoading}
            variant="action"
          />
        )}
      </CatDialogAction>
    </CatDialog>
  );
};

export default withDialogWrapper(AddEditFieldModal);
