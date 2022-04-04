import { CircularProgress } from 'catamaran/core/mui';
import { FORMS } from 'routes/constant-route';
import { Trans, useTranslation } from 'react-i18next';
import { initializeFormBuilderDetailPage } from 'store/slices/assetConfiguration/forms/actions';
import { selectMainCategoryName } from 'store/slices/assetConfiguration/forms/selector';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoading, usePageKeyboardActions, useTypedSelector } from 'hooks';
import { useQuery } from 'hooks/useQuery';
import AssetsBranchButton from 'views/Assets/AssetsBranchButton';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import FormBuilder from './FormBuilder';

function FormBuilderWrapper() {
  const query = useQuery();
  const formId = query.get('formId');

  const { t } = useTranslation();
  const history = useHistory();
  const [getFormFieldsLoading, getFormFieldsDispatch] = useLoading({ initialState: true });
  const formMainCategory = useTypedSelector(selectMainCategoryName);

  const handleGoBack = useCallback(() => {
    history.push(FORMS);
  }, [history]);

  usePageKeyboardActions({
    onEscape: handleGoBack
  });

  useEffect(() => {
    if (formId) {
      getFormFieldsDispatch(initializeFormBuilderDetailPage(formId));
    } else {
      handleGoBack();
    }
  }, [formId, getFormFieldsDispatch, handleGoBack]);

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
      pageHeader={
        getFormFieldsLoading ? (
          t('categories.forms.form_builder.retrieving')
        ) : (
          <Trans
            i18nKey="categories.forms.form_builder.page_header"
            t={t}
            values={{ mainCategoryName: formMainCategory }}
          />
        )
      }
      pageTitle={t('categories.routes.forms')}
    >
      {getFormFieldsLoading ? (
        <div className="flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <FormBuilder formId={formId} />
      )}
    </ContentLayout>
  );
}

export default FormBuilderWrapper;
