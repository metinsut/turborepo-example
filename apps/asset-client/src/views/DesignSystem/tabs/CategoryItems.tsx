import { Box, CatKeyboardButton, CatKeyboardSection, CatPopover } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { Typography } from 'catamaran/core/mui';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { selectAllBrands } from 'store/slices/brands/selectors';
import { showSnackbarMessage } from 'store/slices/application';
import { useGetAllBrands } from 'views/Brands/Brands';
import { useMemo, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';
import CatButton, { CancelButton, ConfirmButton } from 'catamaran/core/Button';
import CategoryItem from './CategoryItem';
import CreatableAutocomplete from 'catamaran/core/Autocomplete/CreatableAutocomplete';
import LevelColumn from 'components/LevelColumn/LevelColumn';
import NoItem from 'catamaran/icons/NoItem';

function CategoryItems() {
  const { t } = useTranslation();
  const list = ['Ali', 'Veli', 'Deniz', 'Brand'];
  const [selectedBrandName, setSelectedBrandName] = useState<string | string[]>(null);
  useGetAllBrands();
  const brands = useTypedSelector(selectAllBrands);
  const dispatch = useTypedDispatch();
  const brandNames = useMemo(() => brands.map((i) => i.name), [brands]);

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const handleChange = (value: string | string[]) => {
    setSelectedBrandName(value);
  };

  const handleEscape = async () => {
    popupState.close();
    setSelectedBrandName(null);
  };

  const asyncAddBrand = async () => {
    const selectedBrand = brands.find((i) => i.name === selectedBrandName);
    await sleep(1500); // For demo purposes.
    if (selectedBrand) {
      dispatch(showSnackbarMessage('Existing brand selected and saved', 'success'));
    } else {
      dispatch(showSnackbarMessage('New brand added', 'success'));
    }

    popupState.close();
    setSelectedBrandName(null);
  };

  const popupState = usePopupState({ popupId: 'brandPopover', variant: 'popover' });
  const valid = !!selectedBrandName;

  return (
    <LevelColumn
      className="my8"
      content={
        list.length > 0 && (
          <Box>
            <CatButton
              {...bindTrigger(popupState)}
              className="mb8"
              color="blue"
              style={{ width: '100%' }}
            >
              Add Brand
            </CatButton>
            {list.map((item) => (
              <CategoryItem key={item} text={item} />
            ))}
            <CatPopover width="317px" {...bindPopover(popupState)}>
              <CatKeyboardSection
                className="p8"
                onEnter={asyncAddBrand}
                onEscape={handleEscape}
                open
              >
                <div className="grid gap-16">
                  <Typography className="ml8" variant="body1">
                    Add A Brand
                  </Typography>
                  <CreatableAutocomplete
                    addHintObjectName={t('brands.add_hint')}
                    autoFocus
                    blurOnSelect
                    className="mr4"
                    clearIcon={<CancelIcon color="darkGrey" />}
                    displayAddButtonWhenNoMatch
                    freeSolo
                    getOptionValue={(option) => option}
                    label="Select Brand"
                    onChange={handleChange}
                    onKeyDown={(e: any) => {
                      e.stopPropagation();
                    }}
                    options={brandNames}
                    selectedValues={selectedBrandName}
                  />
                  <div className="grid grid-auto-flow-column gap-16">
                    <CatKeyboardButton component={CancelButton} keyboardKey="escape" />
                    <CatKeyboardButton
                      component={ConfirmButton}
                      disabled={!valid}
                      keyboardKey="enter"
                    />
                  </div>
                </div>
              </CatKeyboardSection>
            </CatPopover>
          </Box>
        )
      }
      emptyContent={
        <>
          <NoItem color="darkGrey" contained />
          <Box>
            <Trans
              components={{ bold: <b /> }}
              i18nKey="brands.no_brands_description"
              t={t}
              values={{ categoryName: 'iser' }}
            />
          </Box>
        </>
      }
      isEmpty={false}
      loading={false}
      titleContent={
        <Typography
          align="center"
          component="div"
          style={{
            maxWidth: '100%',
            overflow: 'hidden'
          }}
          variant="body1"
        >
          <Trans
            components={{ bold: 'iser' }}
            i18nKey="brands.brand_group_title"
            t={t}
            values={{ categoryName: 'iser' }}
          />
        </Typography>
      }
    />
  );
}

export default CategoryItems;
