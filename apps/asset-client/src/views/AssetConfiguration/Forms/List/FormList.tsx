import { CatPaper, CatTypography } from 'catamaran/core';
import { getForms } from 'store/slices/assetConfiguration/forms/actions';
import { selectAllForms } from 'store/slices/assetConfiguration/forms/selector';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AssetsBranchButton from 'views/Assets/AssetsBranchButton';
import CategoryIcon from 'catamaran/icons/Category';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import FormItem from './FormItem';

function FormList() {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);

  const forms = useTypedSelector(selectAllForms);

  return (
    <ContentLayout
      branchSelector={<AssetsBranchButton disabled />}
      pageBreadcrumbs={[
        {
          text: t('categories.asset_configuration')
        },
        {
          text: t('categories.routes.forms')
        }
      ]}
      pageHeader={t('categories.forms.page_header')}
      pageTitle={t('categories.routes.forms')}
    >
      <CatPaper className="p24 h-auto">
        <div className="flex gap-24 align-items-center">
          <CategoryIcon fontSize="large" />
          <div className="grid gap-8">
            <CatTypography className="opacity-8" variant="h2">
              {t('categories.forms.title')}
            </CatTypography>
            <CatTypography className="opacity-6" variant="body1">
              {t('categories.forms.title_desc')}
            </CatTypography>
          </div>
        </div>
      </CatPaper>
      <div className="grid">
        {forms.map((form) => (
          <FormItem form={form} key={form.id} />
        ))}
      </div>
    </ContentLayout>
  );
}

export default FormList;
