import {
  Box,
  CatCardIconButton,
  CatCenterIcon,
  CatDataCard,
  CatMainContent,
  CatSidebar,
  CatTooltip,
  CatTypography
} from 'catamaran/core';
import { Category } from 'store/slices/categories/types';
import { useTranslation } from 'react-i18next';
import CantEditIcon from 'catamaran/icons/CantEdit';
import CategoryIcon from 'catamaran/icons/Category';
import EditIcon from 'catamaran/icons/Edit';
import InfoIcon from 'catamaran/icons/Info';
import React from 'react';

type Props = {
  autoAssigned: boolean;
  className?: string;
  category: Category;
  onEdit: () => void;
};

function Assigned(props: Props) {
  const { autoAssigned, className, category, onEdit } = props;
  const { t } = useTranslation();

  const getAncestors = (cat: Category): Category[] => {
    if (!cat) {
      return [];
    }

    const fromParents = getAncestors(cat.parentCategory);
    return [...fromParents, cat];
  };

  const ancestors = category && getAncestors(category?.parentCategory);
  const catList = ancestors && ancestors.map((cat) => cat.name);

  const handleEdit = () => {
    if (!autoAssigned) {
      onEdit?.();
    }
  };

  return (
    <CatDataCard className={className} color="blue">
      <CatSidebar>
        <CatCardIconButton onClick={handleEdit}>
          {autoAssigned ? (
            <CatTooltip arrow title={t('assets.asset_edit.category_cant_edit_hint')}>
              <div>
                <CantEditIcon color="lightBlue" />
              </div>
            </CatTooltip>
          ) : (
            <EditIcon color="lightBlue" />
          )}
        </CatCardIconButton>
        <CatCenterIcon component={CategoryIcon} />
        <CatCardIconButton>
          <InfoIcon color="lightBlue" />
        </CatCardIconButton>
      </CatSidebar>
      <CatMainContent>
        <Box>
          <CatTypography variant="body1">{category?.name}</CatTypography>
          <Box fontSize={9} ml="12px" mt={1} opacity={0.8} whiteSpace="pre-wrap">
            <CatTypography variant="caption">
              <ul>{catList && catList.map((item) => <li key={item}>{item}</li>)}</ul>
            </CatTypography>
          </Box>
        </Box>
      </CatMainContent>
    </CatDataCard>
  );
}

export default Assigned;
