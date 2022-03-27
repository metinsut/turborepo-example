import { CATEGORYTASKS } from 'routes/constant-route';
import { CatIconButton, CatTooltip, CatTypography } from 'catamaran/core';
import { Theme, styled } from 'catamaran/core/mui';
import { expandCategory } from 'store/slices/categoriesv2/actions';
import { maxCategoryDepth } from 'store/slices/categoriesv2/data';
import {
  selectCategoryIsExpanded,
  selectCategoryIsLastExpanded,
  selectCategoryv2ById
} from 'store/slices/categoriesv2/selectors';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ChevronRIcon from 'catamaran/icons/ChevronR';
import ContextMenu from './ContextMenu';
import React, { useCallback } from 'react';
import WaitingIcon from 'catamaran/icons/Waiting';

type Props = {
  categoryId: string;
  level: number;
  onEdit: (id: string) => void;
  onExpand?: () => void;
};

const getBackgroundColor = (theme: Theme, expanded: number, lastExpanded: boolean) => {
  if (expanded && !lastExpanded) {
    return theme.palette.darkGrey.main;
  }
  if (lastExpanded) {
    return theme.palette.blue.main;
  }
  return theme.palette.lightGrey.main;
};

const StyledWrapper = styled('div')<{
  expanded?: number;
  selected?: boolean;
}>(({ theme, expanded, selected }) => ({
  '& .category-item-part': {
    '& .slide-in': {
      opacity: 0,
      transition: 'all 0.4s ease-out',
      width: '0px'
    },
    '& p': {
      color: expanded ? theme.palette.common.white : theme.palette.darkGrey.main,
      transition: 'color 0.30s ease-out'
    },
    '&.code-area': {
      borderRadius: '16px 0 0 16px',
      justifyContent: 'center'
    },
    '&.text-area': {
      borderRadius: '0 16px 16px 0'
    },
    '&:hover': {
      '& .slide-in': {
        opacity: 1,
        width: '24px'
      }
    },
    alignItems: 'center',
    backgroundColor: getBackgroundColor(theme, expanded, selected),
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'space-between',
    opacity: expanded && !selected ? '0.6' : '1',
    paddingLeft: '8px',
    paddingRight: '8px',
    transition: 'background-color 0.30s ease-out, opacity 0.30s ease-out'
  },
  cursor: 'pointer',
  display: 'grid',
  gap: '1px',
  gridTemplateColumns: '80px 1fr'
}));

function CategoryItem({ categoryId, level, onEdit, onExpand }: Props, ref: React.Ref<any>) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const history = useHistory();

  const category = useTypedSelector((state) => selectCategoryv2ById(state, categoryId));
  const expanded = useTypedSelector((state) => selectCategoryIsExpanded(state, categoryId));
  const lastExpanded = useTypedSelector((state) => selectCategoryIsLastExpanded(state, categoryId));

  const maxDepthReached = level >= maxCategoryDepth;
  const expandable = !maxDepthReached && !category?.hasBrandModel;

  const handleBodyClick = useCallback(() => {
    if (expandable) {
      const newStatus = !expanded;
      dispatch(expandCategory(category, newStatus));
      onExpand?.();
    }
  }, [category, dispatch, expandable, expanded, onExpand]);

  const handleEditClick = () => {
    onEdit(categoryId);
  };

  const handleWaitingClick = () => {
    history.push(CATEGORYTASKS);
  };

  if (!category) {
    return null;
  }

  const expandButton = (
    <CatIconButton
      className="mr8-minus"
      disabled={!expandable}
      style={{ height: '32px', width: '32px' }}
    >
      <ChevronRIcon
        color={expanded ? 'lightBlue' : 'darkGrey'}
        contained={false}
        fontSize="small"
        hoverable={false}
      />
    </CatIconButton>
  );

  return (
    <>
      <StyledWrapper
        expanded={expanded ? 1 : 0}
        onClick={handleBodyClick}
        ref={ref}
        selected={lastExpanded}
      >
        <div className="code-area category-item-part">
          <CatTypography className="three-dot" variant="body2">
            {category.code}
          </CatTypography>
        </div>
        <div className="text-area category-item-part">
          <div className="grid grid-auto-flow-column gap-8 align-items-center">
            {category.hasUnapprovedBrandModel && (
              <CatTooltip arrow title={t('asset_configurations.categories.has_unapproved_tooltip')}>
                <CatIconButton onClick={handleWaitingClick}>
                  <WaitingIcon color="orange" fontSize="small" />
                </CatIconButton>
              </CatTooltip>
            )}
            <CatTypography className="three-dot" variant="body2">
              {category.name}
            </CatTypography>
          </div>
          <div className="flex align-items-center">
            <ContextMenu
              categoryId={categoryId}
              expanded={expanded}
              hasChildCategory={category?.hasChildCategory}
              onEditClick={handleEditClick}
            />
            {expandable ? (
              expandButton
            ) : (
              <CatTooltip
                arrow
                title={t(
                  maxDepthReached
                    ? 'asset_configurations.categories.max_level_reached_tooltip'
                    : 'asset_configurations.categories.has_brand_model_tooltip'
                )}
              >
                <span>{expandButton}</span>
              </CatTooltip>
            )}
          </div>
        </div>
      </StyledWrapper>
    </>
  );
}

export default React.forwardRef(CategoryItem);
