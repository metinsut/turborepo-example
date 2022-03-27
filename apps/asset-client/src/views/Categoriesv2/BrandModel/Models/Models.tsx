import { CatTypography } from 'catamaran/core';
import { Fade } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { getDisplayedModels } from 'store/slices/modelsv2/actions';
import { isArrayNullOrEmpty } from 'utils';
import { selectBrandById, selectExpandedBrandId } from 'store/slices/brandsv2/selectors';
import { selectDisplayedModelIdsByCategoryAndBrandId } from 'store/slices/modelsv2/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AddModelPopover from './AddModelPopover';
import EditModelPopover from './EditModelPopover';
import LevelColumn from 'components/LevelColumn/LevelColumn';
import ModelItem from './ModelItem';
import NoItem from 'catamaran/icons/NoItem';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

type Props = {
  categoryId: string;
};

function Models(props: Props) {
  const { categoryId } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const [modelsLoading, modelLoadingDispatch] = useLoading();
  const popupState = usePopupState({ popupId: 'addModelPopover', variant: 'popover' });

  const expandedBrandId = useTypedSelector(selectExpandedBrandId);
  const brand = useTypedSelector((state) => selectBrandById(state, expandedBrandId));

  const modelIds = useTypedSelector((state) =>
    selectDisplayedModelIdsByCategoryAndBrandId(state, categoryId, expandedBrandId)
  );

  useEffect(() => {
    modelLoadingDispatch(getDisplayedModels(expandedBrandId, categoryId));
  }, [dispatch, modelLoadingDispatch, expandedBrandId, categoryId]);

  const isDisabled = !expandedBrandId;

  const addButtonRef = React.useRef();

  const [editModelId, setEditModelId] = useState<string>(undefined);
  const handleChangePhoto = (editId: string) => {
    setEditModelId(editId);
    popupState.open(addButtonRef.current);
  };

  const handleEditPopoverClose = () => {
    setEditModelId(undefined);
  };

  return (
    <>
      <LevelColumn
        addButtonProps={{ ...bindTrigger(popupState), ref: addButtonRef }}
        className={clsx({
          'opacity-4': isDisabled
        })}
        content={
          <TransitionGroup className="grid align-content-start gap-8">
            {modelIds.map((id) => (
              <Fade key={id}>
                <ModelItem
                  brandId={brand.id}
                  categoryId={categoryId}
                  key={id}
                  modelId={id}
                  onChangePhotoClick={handleChangePhoto}
                />
              </Fade>
            ))}
          </TransitionGroup>
        }
        emptyContent={
          brand
            ? modelIds.length < 1 && (
                <>
                  <NoItem color="darkGrey" contained />
                  <CatTypography className="text-center">
                    <Trans
                      i18nKey="asset_configurations.models.no_models_description"
                      t={t}
                      values={{ brandName: brand?.name }}
                    />
                  </CatTypography>
                </>
              )
            : null
        }
        isEmpty={isArrayNullOrEmpty(modelIds)}
        loading={modelsLoading}
        titleContent={
          !isDisabled ? (
            <div className="grid align-content-start gap-8">
              <CatTypography
                className="three-dot mt16"
                height="32px"
                noWrap
                title={brand?.name}
                variant="body1"
              >
                <Trans
                  i18nKey="asset_configurations.models.model_group_title"
                  t={t}
                  values={{ brandName: brand?.name }}
                />
              </CatTypography>
            </div>
          ) : (
            <div className="grid align-content-start gap-8">
              <CatTypography className="flex align-items-center mt16" height="32px" variant="body1">
                {t('asset_configurations.models.model')}
              </CatTypography>
            </div>
          )
        }
      />
      <AddModelPopover
        brandId={brand?.id}
        categoryId={categoryId}
        onClose={handleEditPopoverClose}
        open={!editModelId && popupState.isOpen}
        popupState={popupState}
      />
      <EditModelPopover
        modelId={editModelId}
        onClose={handleEditPopoverClose}
        open={!!editModelId && popupState.isOpen}
        popupState={popupState}
      />
    </>
  );
}

export default Models;
