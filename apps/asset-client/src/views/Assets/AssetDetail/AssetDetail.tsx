import { ASSETLIST } from 'routes/constant-route';
import { Asset } from 'store/slices/asset/detail/types';
import { CircularProgress, Grid } from 'catamaran/core/mui';
import { clearAssetForm } from 'store/slices/asset/detail/slice';
import { clearSelectedCategory } from 'store/slices/categories/slice';
import {
  initializeAssetAddWithFormFields,
  initializeAssetDetailPage
} from 'store/slices/asset/detail/actions';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { selectBrandById } from 'store/slices/brands/selectors';
import { selectMainCategoryById } from 'store/slices/session';
import { selectModelById } from 'store/slices/models';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormState } from 'hooks/useFormState';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ActionButton from './ActionButton';
import AssetStatusCard from './AssetStatusCard';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import ContractProtectionDefinitionCard from './ContractProtectionDefinition/ContractProtectionDefinitionCard';
import InformationCard from './InformationCard/InformationCard';
import PaperHeader from 'components/PaperHeader';
import RoutingButtons from 'components/RoutingButtons';
import assetValidator from 'helpers/validations/AssetValidator';
import useLoading from 'hooks/useLoading';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

function AssetDetail(props: Props) {
  const { match } = props;
  const { id } = match.params;
  const mode = id ? 'edit' : 'add';

  const { t } = useTranslation();
  const asset = useTypedSelector(selectAsset);
  const mainCategory = useTypedSelector((state) =>
    selectMainCategoryById(state, asset.mainCategoryId)
  );
  const brand = useTypedSelector((state) => selectBrandById(state, asset.brandId));
  const model = useTypedSelector((state) => selectModelById(state, asset.modelId));
  const [informationCardSeeMoreOpen, setInformationCardSeeMoreOpen] = useState(false);

  const history = useHistory();
  const dispatch = useTypedDispatch();
  const [assetDetailsLoading, assetDetailsLoadingDispatch] = useLoading<Asset>({
    initialState: mode === 'edit'
  });

  const formHelper = useFormState(asset, assetValidator);
  const [informationCardEditing, setInformationCardEditing] = useState<boolean>(mode === 'add');

  useEffect(() => {
    const fetchAsset = async () => {
      if (mode === 'edit' && id !== asset.id) {
        const savedAsset = await assetDetailsLoadingDispatch(initializeAssetDetailPage(id));
        formHelper.reset(savedAsset);
      }
    };

    fetchAsset();
  }, [id, assetDetailsLoadingDispatch, formHelper, asset.id, mode]);

  useEffect(() => {
    const fetchAssetFormFields = async () => {
      if (mode === 'add' && !asset.formFieldsInitialized) {
        const initializedAsset = await assetDetailsLoadingDispatch(
          initializeAssetAddWithFormFields()
        );
        formHelper.reset(initializedAsset);
      }
    };

    fetchAssetFormFields();
  }, [asset.formFieldsInitialized, assetDetailsLoadingDispatch, formHelper, mode]);

  useEffect(
    () => () => {
      dispatch(clearAssetForm());
      dispatch(clearSelectedCategory());
    },
    [dispatch]
  );

  const handleClose = useCallback(async () => {
    history.push(ASSETLIST);
  }, [history]);

  useEffect(() => {
    if (!(asset.branchId && asset.mainCategoryId) && mode === 'add') {
      handleClose();
    }
  }, [asset.branchId, asset.mainCategoryId, handleClose, mode]);

  const handleInformationCardEditingChange = (isEditing: boolean) => {
    if (!isEditing) {
      setIsDirty(!isDirty);
    }
    setInformationCardEditing(isEditing);
  };

  const subRoutes = [
    // todo: makes these texts bound with links and use translation
    {
      link: '.*',
      text: 'assets.routes.information'
    },
    {
      disabled: true,
      link: '#',
      text: 'assets.routes.definitions'
    },
    {
      disabled: true,
      link: '#',
      text: 'assets.routes.protection'
    },
    {
      disabled: true,
      link: '#',
      text: 'assets.routes.performance'
    },
    {
      disabled: true,
      link: '#',
      text: 'assets.routes.costs'
    },
    {
      disabled: true,
      link: '#',
      text: 'assets.routes.files'
    },
    {
      disabled: true,
      link: '#',
      text: 'assets.routes.updates'
    }
  ];

  const dataWaiting = !asset || !brand || !model || !mainCategory;

  const pageHeader = useMemo(() => {
    if (mode === 'add') {
      return t('assets.asset_edit.asset_add_title');
    }
    if (dataWaiting) {
      return t('common.fetching');
    }

    return t('assets.asset_edit.asset_edit_page_header', {
      brandName: brand.name,
      categoryName: mainCategory.name,
      modelName: model.name
    });
  }, [brand?.name, dataWaiting, mainCategory?.name, mode, model?.name, t]);

  const pageBreadcrumb = useMemo(() => {
    if (mode === 'add') {
      return t('assets.asset_edit.asset_add_title');
    }
    if (dataWaiting) {
      return t('common.fetching');
    }

    return '';
  }, [dataWaiting, mode, t]);

  const [isDirty, setIsDirty] = useState(false);

  return (
    <ContentLayout
      branchSelector={<div />}
      loading={dataWaiting}
      pageBreadcrumbs={[
        {
          text: t('assets.routes.asset_list')
        },
        {
          text: pageBreadcrumb
        }
      ]}
      pageHeader={pageHeader}
      pageTitle={pageHeader}
      rightContent={
        <AssetStatusCard assetStatus={asset?.assetStatus} loading={assetDetailsLoading} />
      }
    >
      {assetDetailsLoading ? (
        <Grid alignItems="center" container direction="column" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container direction="column" justifyContent="space-between">
          <PaperHeader hidden={informationCardEditing} justifyContent="space-between" px={0.5}>
            <RoutingButtons routes={subRoutes} />

            <ActionButton assetId={asset.id} />
          </PaperHeader>
          <InformationCard
            asset={asset}
            formHelper={formHelper}
            isEditing={informationCardEditing}
            key={`${isDirty}`}
            mode={mode}
            onSectionEditingChange={handleInformationCardEditingChange}
            onSeeMoreToggle={() => setInformationCardSeeMoreOpen(!informationCardSeeMoreOpen)}
            seeMoreOpen={informationCardSeeMoreOpen}
          />
          {mode === 'edit' && !informationCardEditing && (
            <ContractProtectionDefinitionCard asset={asset} className="w-full" />
          )}
        </Grid>
      )}
    </ContentLayout>
  );
}

export default AssetDetail;
