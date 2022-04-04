import {
  Box,
  CatDialogContent,
  CatDialogTitle,
  CatMenuItem,
  CatSelect,
  CatTypography
} from 'catamaran/core';
import { selectAllMainCategories } from 'store/slices/session';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks';
import CategoryIcon from 'catamaran/icons/Category';

type Props = {
  handleChange: (event: any) => void;
  mainCategoryId: string;
};

function MainCategoryDialog(props: Props) {
  const { handleChange, mainCategoryId } = props;

  const { t } = useTranslation();

  const categories = useTypedSelector(selectAllMainCategories);

  return (
    <>
      <CatDialogTitle
        iconComponent={CategoryIcon}
        title={t('assets.asset_edit.main_category_select_title')}
      />
      <CatDialogContent>
        <Box flex flexDirection="column">
          <CatTypography variant="body1">
            {t('assets.asset_edit.main_category_select_desc_1')}
          </CatTypography>
          <Box height={24} />
          <CatTypography variant="body1">
            {t('assets.asset_edit.main_category_select_desc_2')}
          </CatTypography>
          <Box height={24} />
          <CatSelect displayEmpty fullWidth onChange={handleChange} value={mainCategoryId ?? ''}>
            <CatMenuItem disabled key="" value="">
              {t('common.dropdown_generic_hint')}
            </CatMenuItem>
            {categories.map((c) => (
              <CatMenuItem key={c.id} value={c.id}>
                {c.name}
              </CatMenuItem>
            ))}
          </CatSelect>
        </Box>
      </CatDialogContent>
    </>
  );
}

export default MainCategoryDialog;
