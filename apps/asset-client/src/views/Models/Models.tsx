import { Box, CatPaperSelector } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import {
  addEmptyModel,
  getModelsForBrand,
  getModelsForBrandAndCategory,
  removeModelFromCategoryAndBrand,
  selectDisplayedModelIdsByCategoryAndBrandId,
  selectModelsHasTemporaryChild
} from 'store/slices/models';
import { selectBrandById } from 'store/slices/brands/selectors';
import { temporaryModelId } from 'store/common';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ModelItemStoreWrapper from './ModelItemStoreWrapper';
import NoItem from 'catamaran/icons/NoItem';
import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  notSelectedColor: {
    opacity: 0.4
  },
  title: {
    fontWeight: 'bold'
  }
}));

type Props = {
  className?: string;
  brandId: string;
  categoryId: string;
};

function Models(props: Props) {
  const classes = useStyles();
  const { className, brandId, categoryId } = props;
  const dispatch = useTypedDispatch();
  const [modelsLoading, modelLoadingDispatch] = useLoading();
  const { t } = useTranslation();

  const brand = useTypedSelector((state) => selectBrandById(state, brandId));

  const modelIds = useTypedSelector((state) =>
    selectDisplayedModelIdsByCategoryAndBrandId(state, categoryId, brandId)
  );

  const hasTemporaryModel = useTypedSelector((state) =>
    selectModelsHasTemporaryChild(state, categoryId, brandId)
  );

  useEffect(() => {
    modelLoadingDispatch(getModelsForBrandAndCategory(brandId, categoryId));
    return () => {
      dispatch(removeModelFromCategoryAndBrand(categoryId, brandId, temporaryModelId));
    };
  }, [dispatch, modelLoadingDispatch, brandId, categoryId]);

  const isDisabled = !brandId;

  const rootClass = clsx({
    [className]: true,
    [classes.notSelectedColor]: isDisabled
  });

  const handleAddNew = useCallback(() => {
    dispatch(addEmptyModel(categoryId, brandId));

    dispatch(getModelsForBrand(brandId));
  }, [dispatch, brandId, categoryId]);

  return (
    <CatPaperSelector
      buttonText={
        <Trans components={{ bold: <b /> }} i18nKey="models.add_new_model_button" t={t} />
      }
      className={rootClass}
      content={
        modelIds.length > 0 && (
          <Box>
            {modelIds.map((id) => (
              <ModelItemStoreWrapper
                brandId={brandId}
                categoryId={categoryId}
                key={id}
                modelId={id}
              />
            ))}
          </Box>
        )
      }
      emptyContent={
        <>
          <NoItem color="darkGrey" contained />
          <Box>
            <Trans
              components={{ bold: <b /> }}
              i18nKey="models.no_models_description"
              t={t}
              values={{ brandName: brand?.name }}
            />
          </Box>
        </>
      }
      handleAddClick={handleAddNew}
      hasTemporary={hasTemporaryModel}
      isAddDisabled={isDisabled}
      loading={modelsLoading}
      title={
        !isDisabled ? (
          <>
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
                components={{ bold: <p className={classes.title} /> }}
                i18nKey="models.model_group_title"
                t={t}
                values={{ brandName: brand?.name }}
              />
            </Typography>
          </>
        ) : (
          <Typography component="p" variant="body1">
            Model
          </Typography>
        )
      }
    />
  );
}

export default Models;
