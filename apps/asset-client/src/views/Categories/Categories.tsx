import { CatButton } from 'catamaran/core';
import { getDevelopmentFeaturesEnabled } from 'utils/settings';
import { updateDialogOpen } from 'store/slices/imports/category/slice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useUrlForExpandedCategories } from './useUrlForExpandedCategories';
import BrandModelManagement from './BrandModelManagement';
import CategoryManagement from './CategoryManagement';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import ImportIcon from 'catamaran/icons/Import';
import Info from 'catamaran/icons/Info';
import PaperHeader from '../../components/PaperHeader';

function Categories() {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  useUrlForExpandedCategories();

  const developmentFeaturesEnabled = getDevelopmentFeaturesEnabled();

  const handleImport = useCallback(() => {
    if (developmentFeaturesEnabled) {
      dispatch(updateDialogOpen(true));
    }
  }, [developmentFeaturesEnabled, dispatch]);

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('categories.asset_configuration')
        },
        {
          text: t('categories.category_list_title')
        }
      ]}
      pageHeader={t('categories.category_list_title')}
      pageTitle={t('categories.categories')}
    >
      <PaperHeader justifyContent="space-between">
        <CatButton color="blue" disabled onClick={handleImport} startIcon={<ImportIcon />}>
          {t('categories.import_categories_button')}
        </CatButton>
        <Info color="darkGrey" />
      </PaperHeader>
      <CategoryManagement categoryManagementType="page" deletable justifyContent="flex-start" />
      <BrandModelManagement />
    </ContentLayout>
  );
}

export default Categories;
