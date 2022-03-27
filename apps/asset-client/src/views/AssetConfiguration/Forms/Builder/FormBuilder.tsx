import { CatChip, CatKeyboardButton, CatPaper, CatTypography } from 'catamaran/core';
import { GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import {
  remainingIdentificationFieldNumber,
  remainingInfoFieldNumber,
  selectDeviceInfoFields,
  selectIdentificationFields,
  selectPurchaseInfoFields
} from 'store/slices/assetConfiguration/forms/selector';
import { styled } from 'catamaran/core/mui';
import { useTypedSelector } from 'hooks';
import CategoryIcon from 'catamaran/icons/Category';
import CopyIcon from 'catamaran/icons/Copy';
import CostIcon from 'catamaran/icons/Cost';
import DownloadIcon from 'catamaran/icons/Download';
import EditableFormSection from './EditableFormSection';
import InfoIcon from 'catamaran/icons/Info';
import LocationIcon from 'catamaran/icons/Location';
import LockIcon from 'catamaran/icons/Lock';
import LockedCard from './LockedCard';
import MinusIcon from 'catamaran/icons/Minus';
import PersonIcon from 'catamaran/icons/Person';
import PhotoIcon from 'catamaran/icons/Photo';
import PlusIcon from 'catamaran/icons/Plus';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';
import SearchIcon from 'catamaran/icons/Search';

type Props = {
  formId: string;
};

const FieldsWrapper = styled('div')({
  display: 'grid',
  gridGap: '16px',
  gridTemplateColumns: '1fr 1fr 1fr',
  paddingBottom: '32px',
  paddingTop: '8px'
});

const FormBuilder = (props: Props) => {
  const { formId } = props;

  const { t } = useTranslation();

  const identificationFields = useTypedSelector(selectIdentificationFields);
  const deviceInfoFields = useTypedSelector(selectDeviceInfoFields);
  const purchaseInfoFields = useTypedSelector(selectPurchaseInfoFields);

  const remainingIdentificationFields = useTypedSelector(remainingIdentificationFieldNumber);
  const remainingInfoFields = useTypedSelector(remainingInfoFieldNumber);

  return (
    <>
      <div className="grid gap-16" style={{ paddingBottom: '80px' }}>
        <CatPaper className="grid p24 py16">
          <CatTypography variant="h2">
            {t('categories.forms.form_builder.edit_add_fields')}
          </CatTypography>
          <FieldsWrapper className="pt24">
            <ReadonlyTextField
              disabled
              endAdornment={<LockIcon className="opacity-8" />}
              text={t('categories.forms.form_builder.fields.brand')}
            />
            <ReadonlyTextField
              disabled
              endAdornment={<LockIcon className="opacity-8" />}
              text={t('categories.forms.form_builder.fields.model')}
            />
            <ReadonlyTextField
              disabled
              endAdornment={<LockIcon className="opacity-8" />}
              text={t('categories.forms.form_builder.fields.auto_generated_code')}
            />
            <LockedCard
              icon={CategoryIcon}
              text={t('categories.forms.form_builder.fields.category')}
            />
            <LockedCard
              icon={LocationIcon}
              text={t('categories.forms.form_builder.fields.location')}
            />
            <LockedCard
              icon={PersonIcon}
              text={t('categories.forms.form_builder.fields.custody')}
            />
          </FieldsWrapper>
          <CatChip
            className="justify-self-end"
            label={
              <Trans
                i18nKey="categories.forms.form_builder.fields.remaining_fields_to_add"
                t={t}
                values={{ number: remainingIdentificationFields }}
              />
            }
            style={{ maxWidth: 'fit-content' }}
          />
          <div className="flex align-items-center">
            <SearchIcon alwaysHovered className="mr4" fontSize="small" />
            <CatTypography className="opacity-8 mr4" variant="body1">
              {t('categories.forms.form_builder.fields.identification')}
            </CatTypography>
            <InfoIcon alwaysHovered color="lightGrey" fontSize="small" />
          </div>
          <EditableFormSection
            formFields={identificationFields}
            formId={formId}
            remainingFieldNumber={remainingIdentificationFields}
            sectionType="identification"
          />
          <div className="grid gap-8 justify-item-center">
            <MinusIcon containerClassName="opacity-6" fontSize="small" />
            <div
              className="mx8 opacity-4 border-darkgrey border-1 w-full"
              style={{ borderStyle: 'dashed none none none' }}
            />
            <PlusIcon containerClassName="opacity-6" fontSize="small" />
          </div>
          <div className="flex align-items-center">
            <PhotoIcon alwaysHovered className="mr4" fontSize="small" />
            <CatTypography className="opacity-8 mr4" variant="body1">
              {t('categories.forms.form_builder.fields.device_photo')}
            </CatTypography>
          </div>
          <FieldsWrapper>
            <LockedCard icon={PhotoIcon} text={t('categories.forms.form_builder.fields.photo')} />
          </FieldsWrapper>
          <CatChip
            className="justify-self-end"
            label={
              <Trans
                i18nKey="categories.forms.form_builder.fields.remaining_fields_to_add"
                t={t}
                values={{ number: remainingInfoFields }}
              />
            }
            style={{ maxWidth: 'fit-content' }}
          />
          <div className="flex align-items-center">
            <InfoIcon alwaysHovered className="mr4" fontSize="small" />
            <CatTypography className="opacity-8 mr4" variant="body1">
              {t('categories.forms.form_builder.fields.device_info')}
            </CatTypography>
          </div>
          <EditableFormSection
            formFields={deviceInfoFields}
            formId={formId}
            remainingFieldNumber={remainingInfoFields}
            sectionType="deviceInfo"
            staticFormFields={
              <div className="pr16">
                <ReadonlyTextField
                  className="mb16"
                  disabled
                  endAdornment={<LockIcon className="opacity-8" />}
                  text={t('categories.forms.form_builder.fields.date_of_device_production')}
                />
              </div>
            }
          />
          <div className="flex align-items-center">
            <CostIcon alwaysHovered className="mr4" fontSize="small" />
            <CatTypography className="opacity-8 mr4" variant="body1">
              {t('categories.forms.form_builder.fields.purchase_info')}
            </CatTypography>
          </div>
          <EditableFormSection
            formFields={purchaseInfoFields}
            formId={formId}
            remainingFieldNumber={remainingInfoFields}
            sectionType="purchaseInfo"
            staticFormFields={
              <>
                <div className="pr16">
                  <ReadonlyTextField
                    className="mb16"
                    disabled
                    endAdornment={<LockIcon className="opacity-8" />}
                    text={t('categories.forms.form_builder.fields.purchased_firm')}
                  />
                </div>
                <div className="pr16">
                  <ReadonlyTextField
                    className="mb16"
                    disabled
                    endAdornment={<LockIcon className="opacity-8" />}
                    text={t('categories.forms.form_builder.fields.purchase_cost')}
                  />
                </div>
                <div className="pr16">
                  <ReadonlyTextField
                    className="mb16"
                    disabled
                    endAdornment={<LockIcon className="opacity-8" />}
                    text={t('categories.forms.form_builder.fields.purchase_date')}
                  />
                </div>
              </>
            }
          />
          <div className="flex align-items-center">
            <CopyIcon alwaysHovered className="mr4" fontSize="small" />
            <CatTypography className="opacity-8 mr4" variant="body1">
              {t('categories.forms.form_builder.fields.notes')}
            </CatTypography>
          </div>
          <div className="pb32 pt8">
            <ReadonlyTextField
              disabled
              endAdornment={<LockIcon className="opacity-8" />}
              text={t('categories.forms.form_builder.fields.notes')}
            />
          </div>
          <div className="flex align-items-center">
            <DownloadIcon alwaysHovered className="mr4" fontSize="small" />
            <CatTypography className="opacity-8 mr4" variant="body1">
              {t('categories.forms.form_builder.fields.creation_info')}
            </CatTypography>
          </div>
          <FieldsWrapper>
            <ReadonlyTextField
              disabled
              endAdornment={<LockIcon className="opacity-8" />}
              text={t('categories.forms.form_builder.fields.created_by')}
            />
            <ReadonlyTextField
              disabled
              endAdornment={<LockIcon className="opacity-8" />}
              text={t('categories.forms.form_builder.fields.date_of_creation')}
            />
          </FieldsWrapper>
        </CatPaper>
        <CatPaper className="p24 py16">
          <CatTypography variant="h2">
            {t('categories.forms.form_builder.fields.contract_and_protection_definitions')}
          </CatTypography>
        </CatPaper>
        <CatPaper className="p24 py16">
          <CatTypography variant="h2">
            {t('categories.forms.form_builder.fields.protection')}
          </CatTypography>
        </CatPaper>
        <CatPaper className="sticky-bottombar">
          <CatKeyboardButton component={GoBackButton} keyboardKey="escape" />
        </CatPaper>
      </div>
    </>
  );
};

export default FormBuilder;
