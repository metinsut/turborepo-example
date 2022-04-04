import { CancelButton, CloseButton, ConfirmButton, RevertButton } from 'catamaran/core/Button';
import { CatKeyboardButton, CatKeyboardSection, CatPopover, CatTypography } from 'catamaran/core';
import { Categoryv2 } from 'store/slices/categoriesv2/types';
import { PopupState, bindPopover } from 'material-ui-popup-state/core';
import { Trans, useTranslation } from 'react-i18next';
import { selectCategoryv2ById } from 'store/slices/categoriesv2/selectors';
import { upsertCategory } from 'store/slices/categoriesv2/actions';
import { useFormState, useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import categoryValidator from 'helpers/validations/Categoryv2Validator';

type Props = {
  categoryId?: string;
  onClose: () => void;
  open: boolean;
  parentCategoryId: string;
  popupState: PopupState;
};

function CategoryPopover({ categoryId, open, onClose, parentCategoryId, popupState }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const category = useTypedSelector((state) => selectCategoryv2ById(state, categoryId));
  const isEdit = !!categoryId;

  const calculateInitialCategory = () => {
    let calculatedCategory: Categoryv2;
    if (isEdit) {
      calculatedCategory = {
        ...category
      };
    } else {
      calculatedCategory = {
        parentCategoryId
      };
    }
    return calculatedCategory;
  };

  const formHelper = useFormState(calculateInitialCategory, categoryValidator, {
    autoCapitalizeProps: {
      code: true
    }
  });

  const handlePopoverClose = () => {
    popupState.close();
    onClose();
  };

  const handleEnter = async () => {
    const category = { ...formHelper.formState.values };
    await dispatch(upsertCategory(category));
    handlePopoverClose();
  };

  const handleEscape = async () => {
    handlePopoverClose();
  };

  const isChanged = formHelper.formState.isTouched;
  return (
    <CatPopover
      {...bindPopover(popupState)}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      onClose={handlePopoverClose}
      open={open}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'top'
      }}
      width="317px"
    >
      <CatKeyboardSection onEnter={handleEnter} onEscape={handleEscape} open={popupState.isOpen}>
        <div className="grid p16 gap-16">
          <CatTypography variant="body1">
            <Trans
              i18nKey={
                isEdit
                  ? 'asset_configurations.categories.edit_category'
                  : 'asset_configurations.categories.add_new_category'
              }
              t={t}
            />
          </CatTypography>
          <div className="grid gap-8">
            <CatamaranTextField
              autoFocus
              formHelper={formHelper}
              label={t('asset_configurations.categories.code_label')}
              mode="editOnly"
              name="code"
            />
            <CatamaranTextField
              formHelper={formHelper}
              isRequired
              label={t('asset_configurations.categories.name_label')}
              mode="editOnly"
              name="name"
            />
          </div>
          <div className="flex gap-16 align-items-center justify-content-center">
            {isEdit ? (
              <CatKeyboardButton
                component={isChanged ? RevertButton : CloseButton}
                keyboardKey="escape"
              />
            ) : (
              <CatKeyboardButton component={CancelButton} keyboardKey="escape" />
            )}
            <div className="divider-vertical" />
            <CatKeyboardButton
              component={ConfirmButton}
              disabled={!formHelper.formState.isValid || !isChanged}
              keyboardKey="enter"
            />
          </div>
        </div>
      </CatKeyboardSection>
    </CatPopover>
  );
}

export default withDialogWrapper(CategoryPopover);
