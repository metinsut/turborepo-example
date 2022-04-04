import { CatTypography } from 'catamaran/core';
import { Categoryv2 } from 'store/slices/categoriesv2/types';
import { CircularProgress } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { maxMainCategoryNumber } from 'store/slices/categoriesv2/data';
import React from 'react';
import RemainingChip from 'components/RemainingChip';

type Props = {
  loading: boolean;
  parentCategory: Categoryv2;
  remainingMainCategoryCount: number;
  remainingVisible: boolean;
};

function Title({ loading, parentCategory, remainingMainCategoryCount, remainingVisible }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className="grid grid-auto-flow-column justify-content-between align-items-center"
      style={{ height: '40px' }}
    >
      {parentCategory ? (
        <>
          <CatTypography className="three-dot" noWrap title={parentCategory.name} variant="body1">
            <Trans
              i18nKey="asset_configurations.categories.sub_categories_title"
              t={t}
              values={{ categoryName: parentCategory.name }}
            />
          </CatTypography>
          {loading && <CircularProgress size={16} variant="indeterminate" />}
        </>
      ) : (
        <>
          <CatTypography variant="body1">
            {t('asset_configurations.categories.main_categories_title')}
          </CatTypography>
          <div className="flex gap-4">
            {loading ? (
              <CircularProgress size={16} variant="indeterminate" />
            ) : (
              remainingVisible && (
                <RemainingChip
                  maxCount={maxMainCategoryNumber}
                  remainingCount={remainingMainCategoryCount}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Title;
