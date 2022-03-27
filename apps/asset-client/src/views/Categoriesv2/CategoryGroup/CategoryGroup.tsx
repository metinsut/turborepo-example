import { CatTypography } from 'catamaran/core';
import { Fade } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { getCategoriesv2 } from 'store/slices/categoriesv2/actions';
import { isArrayNullOrEmpty } from 'utils';
import { maxMainCategoryNumber } from 'store/slices/categoriesv2/data';
import {
  selectCategoryv2ById,
  selectChildrenCategoryIdsByParentId
} from 'store/slices/categoriesv2/selectors';
import { selectIsUserAuthorized } from 'store/slices/session';
import { useLoading, useTypedSelector } from 'hooks';
import CategoryItem from '../CategoryItem/CategoryItem';
import CategoryPopover from './CategoryPopover';
import LevelColumn from 'components/LevelColumn/LevelColumn';
import NoItem from 'catamaran/icons/NoItem';
import React, { useEffect, useState } from 'react';
import Title from './Title';

type Props = {
  className?: string;
  level: number;
  parentCategoryId: string;
  onExpand?: () => void;
};

function CategoryGroup({ className, level, parentCategoryId, onExpand }: Props, ref: any) {
  const { t } = useTranslation();
  const [categoriesLoading, categoriesLoadingDispatch] = useLoading();

  const parentCategory = useTypedSelector((state) => selectCategoryv2ById(state, parentCategoryId));
  const childrenCategoryIds = useTypedSelector((state) =>
    selectChildrenCategoryIdsByParentId(state, parentCategoryId)
  );

  useEffect(() => {
    categoriesLoadingDispatch(getCategoriesv2(parentCategoryId));
  }, [categoriesLoadingDispatch, parentCategoryId]);

  const popupState = usePopupState({ popupId: 'categoryGroupPopover', variant: 'popover' });

  const addButtonRef = React.useRef();

  const [editCategoryId, setEditCategoryId] = useState<string>(undefined);
  const handleEditClick = (editId: string) => {
    setEditCategoryId(editId);
    popupState.open(addButtonRef.current);
  };

  const handleCategoryPopoverClose = () => {
    setEditCategoryId(undefined);
  };

  const isAuthorized = useTypedSelector((state) =>
    selectIsUserAuthorized(state, 'assetConfiguration_MainCategoryOperations')
  );

  const isAuthorizedForMainCategory = !!parentCategory || isAuthorized;
  const remainingMainCategoryCount = maxMainCategoryNumber - childrenCategoryIds.length;

  const tooltipText = isAuthorizedForMainCategory
    ? undefined
    : t('asset_configurations.categories.general_admin_can_do');
  return (
    <>
      <LevelColumn
        addButtonProps={{
          disabled: !isAuthorizedForMainCategory || remainingMainCategoryCount === 0,
          ref: addButtonRef,
          tooltipText,
          ...bindTrigger(popupState)
        }}
        className={className}
        content={
          <TransitionGroup className="grid align-content-start gap-8">
            {childrenCategoryIds.map((id) => (
              <Fade key={id}>
                <CategoryItem
                  categoryId={id}
                  key={id}
                  level={level}
                  onEdit={handleEditClick}
                  onExpand={onExpand}
                />
              </Fade>
            ))}
          </TransitionGroup>
        }
        emptyContent={
          parentCategory && (
            <>
              <NoItem color="darkGrey" contained />
              <CatTypography className="text-center">
                <Trans
                  i18nKey="asset_configurations.categories.no_categories_description"
                  t={t}
                  values={{ categoryName: parentCategory.name }}
                />
              </CatTypography>
            </>
          )
        }
        isEmpty={isArrayNullOrEmpty(childrenCategoryIds)}
        loading={categoriesLoading}
        ref={ref}
        titleContent={
          <Title
            loading={categoriesLoading}
            parentCategory={parentCategory}
            remainingMainCategoryCount={remainingMainCategoryCount}
            remainingVisible={isAuthorized}
          />
        }
      />
      <CategoryPopover
        categoryId={editCategoryId}
        onClose={handleCategoryPopoverClose}
        open={popupState.isOpen}
        parentCategoryId={parentCategoryId}
        popupState={popupState}
      />
    </>
  );
}

export default React.forwardRef(CategoryGroup);
