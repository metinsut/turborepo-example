import { CatKeyboardButton, CatKeyboardSection, CatPopover, CatTypography } from 'catamaran/core';
import { Categoryv2 as Category } from 'store/slices/categoriesv2/types';
import { PopupState, bindPopover } from 'material-ui-popup-state/hooks';
import { addBrandToCategory } from 'store/slices/brandsv2/actions';
import { selectAllBrands } from 'store/slices/brandsv2/selectors';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import CancelButton from 'catamaran/core/Button/CommonButtons/CancelButton';
import CancelIcon from 'catamaran/icons/Cancel';
import ConfirmButton from 'catamaran/core/Button/CommonButtons/ConfirmButton';
import CreatableAutocomplete from 'catamaran/core/Autocomplete/CreatableAutocomplete';
import brandValidator from 'helpers/validations/BrandValidator';

type Props = {
  className?: string;
  category: Category;
  onClose?: () => void;
  open: boolean;
  popupState: PopupState;
};

function AddBrandPopover(props: Props) {
  const { className, category, open, onClose, popupState } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [selectedBrandName, setSelectedBrandName] = useState<string>(null);

  const brands = useTypedSelector(selectAllBrands);
  const brandNames = useMemo(() => brands.map((i) => i.name), [brands]);

  const handlePopoverClose = () => {
    popupState.close();
    onClose?.();
  };

  const asyncAddBrand = async () => {
    await dispatch(addBrandToCategory(selectedBrandName, category.id));

    handlePopoverClose();
    setSelectedBrandName(null);
  };

  const handleEscape = async () => {
    handlePopoverClose();
    setSelectedBrandName(null);
  };

  const invalidText = useMemo(
    () => brandValidator({ name: selectedBrandName }),
    [selectedBrandName]
  );

  const handleChange = (value: string | string[]) => {
    setSelectedBrandName(value as string);
  };

  const isNewBrand = useMemo(() => {
    if (!selectedBrandName) {
      return false;
    }
    const selectedBrand = brands.find((i) => i.name === selectedBrandName);
    return !selectedBrand;
  }, [brands, selectedBrandName]);

  return (
    <CatPopover
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top'
      }}
      className={className}
      onClose={handlePopoverClose}
      open={open}
      transformOrigin={{
        horizontal: 'center',
        vertical: 'top'
      }}
      width="317px"
      {...bindPopover(popupState)}
    >
      <CatKeyboardSection className="p8" onEnter={asyncAddBrand} onEscape={handleEscape} open>
        <div className="grid gap-16">
          <CatTypography className="ml8" variant="body1">
            {t('asset_configurations.brands.add_a_brand')}
          </CatTypography>
          <CreatableAutocomplete
            addHintObjectName={t('asset_configurations.brands.add_hint')}
            autoFocus
            className="m4 w-inherit"
            clearIcon={<CancelIcon color="darkGrey" />}
            displayAddButtonWhenNoMatch
            getOptionValue={(option) => option}
            label={t('asset_configurations.brands.select_brand')}
            onChange={handleChange}
            onKeyDown={(e: any) => {
              e.stopPropagation();
            }}
            options={brandNames}
            selectedValues={selectedBrandName}
            showNewBadge={isNewBrand}
            TextFieldProps={{
              error: !!invalidText.name,
              helperText: <span>{invalidText.name}</span>
            }}
          />
          <div className="flex gap-16 justify-content-center">
            <CatKeyboardButton component={CancelButton} keyboardKey="escape" />
            <CatKeyboardButton
              component={ConfirmButton}
              disabled={!!invalidText.name}
              keyboardKey="enter"
            />
          </div>
        </div>
      </CatKeyboardSection>
    </CatPopover>
  );
}

export default withDialogWrapper(AddBrandPopover);
