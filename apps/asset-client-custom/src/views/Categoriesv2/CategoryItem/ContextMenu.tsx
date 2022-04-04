import {
  CatIconButton,
  CatMenu,
  CatMenuDivider,
  CatMenuItem,
  CatTooltip,
  CatTypography
} from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger } from 'material-ui-popup-state/core';
import { selectCategoryv2ById } from 'store/slices/categoriesv2/selectors';
import { selectIsUserAuthorized } from 'store/slices/session';
import { useDialogState, useTypedSelector } from 'hooks';
import { usePopupState } from 'material-ui-popup-state/hooks';
import BrandModelDialog from '../BrandModel/BrandModelDialog';
import DeleteMainCategoryModal from '../DeleteMainCategory/DeleteMainCategoryModal';
import DeleteSubCategoryModal from '../DeleteSubCategory/DeleteSubCategoryModal';
import EditIcon from 'catamaran/icons/Edit';
import EllipsisIcon from 'catamaran/icons/Ellipsis';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import MoveIcon from 'catamaran/icons/Move';
import PlusIcon from 'catamaran/icons/Plus';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  categoryId: string;
  expanded: boolean;
  hasChildCategory: boolean;
  onEditClick: () => void;
};

function ContextMenu({ categoryId, expanded, hasChildCategory, onEditClick }: Props) {
  const { t } = useTranslation();
  const { isOpen: mainCategoryDeleteDialogOpen, togglePopup: toggleMainCategoryDeletePopup } =
    useDialogState();
  const { isOpen: subCategoryDeleteDialogOpen, togglePopup: toggleSubCategoryDeletePopup } =
    useDialogState();
  const popupState = usePopupState({ popupId: 'categoryContextMenu', variant: 'popover' });
  const { isOpen: brandModelDialogOpen, togglePopup: toggleBrandModelDialogOpen } =
    useDialogState();

  const { parentCategoryId } = useTypedSelector((state) => selectCategoryv2ById(state, categoryId));
  const isAuthorized = useTypedSelector((state) =>
    selectIsUserAuthorized(state, 'assetConfiguration_MainCategoryOperations')
  );

  const isAuthorizedForMainCategory = !!parentCategoryId || isAuthorized;

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    bindTrigger(popupState).onClick(event);
  };

  const handleEditClick = () => {
    popupState.close();
    onEditClick();
  };

  const handleAddBrandModel = () => {
    popupState.close();
    toggleBrandModelDialogOpen(true);
  };

  const handleClose = () => {
    toggleBrandModelDialogOpen(false);
  };

  const handleDeleteCategory = async () => {
    popupState.close();
    if (!parentCategoryId) {
      toggleMainCategoryDeletePopup();
    } else {
      toggleSubCategoryDeletePopup();
    }
  };

  return (
    <>
      <CatIconButton {...bindTrigger(popupState)} onClick={handleButtonClick}>
        <EllipsisIcon
          className="opacity-8"
          color={expanded ? 'lightGrey' : 'darkGrey'}
          containerClassName="slide-in"
        />
      </CatIconButton>
      <CatMenu
        {...bindMenu(popupState)}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CatMenuItem
          className={hasChildCategory ? 'cursor-default' : ''}
          onClick={hasChildCategory ? undefined : handleAddBrandModel}
        >
          <PlusIcon
            className={hasChildCategory ? 'opacity-3' : ''}
            color="green"
            fontSize="small"
          />
          <CatTypography className={hasChildCategory ? 'opacity-3' : ''} variant="body2">
            <Trans
              i18nKey="asset_configurations.categories.context_menu.add_edit_brand_model"
              t={t}
            />
          </CatTypography>
          {hasChildCategory && (
            <CatTooltip arrow title={t('asset_configurations.categories.has_subcategory_tooltip')}>
              <div>
                <InfoCautionIcon
                  className="cursor-pointer opacity-9"
                  color="darkGrey"
                  contained
                  fontSize="small"
                />
              </div>
            </CatTooltip>
          )}
        </CatMenuItem>
        <CatMenuDivider />
        <CatMenuItem
          className={isAuthorizedForMainCategory ? '' : 'cursor-default'}
          onClick={isAuthorizedForMainCategory ? handleEditClick : undefined}
        >
          <EditIcon
            className={isAuthorizedForMainCategory ? '' : 'opacity-3'}
            color="blue"
            fontSize="small"
          />
          <CatTypography className={isAuthorizedForMainCategory ? '' : 'opacity-3'} variant="body2">
            <Trans i18nKey="asset_configurations.categories.context_menu.edit_category" t={t} />
          </CatTypography>
          {!isAuthorizedForMainCategory && (
            <CatTooltip arrow title={t('asset_configurations.categories.general_admin_can_do')}>
              <div>
                <InfoCautionIcon
                  className="cursor-pointer opacity-9"
                  color="darkGrey"
                  contained
                  fontSize="small"
                />
              </div>
            </CatTooltip>
          )}
        </CatMenuItem>
        <CatMenuItem disabled>
          <MoveIcon color="darkGrey" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="asset_configurations.categories.context_menu.move_category" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuDivider />
        <CatMenuItem
          className={isAuthorizedForMainCategory ? '' : 'cursor-default'}
          onClick={isAuthorizedForMainCategory ? handleDeleteCategory : undefined}
        >
          <TrashIcon
            className={isAuthorizedForMainCategory ? '' : 'opacity-3'}
            color="red"
            fontSize="small"
          />
          <CatTypography className={isAuthorizedForMainCategory ? '' : 'opacity-3'} variant="body2">
            <Trans i18nKey="asset_configurations.categories.context_menu.delete_category" t={t} />
          </CatTypography>
          {!isAuthorizedForMainCategory && (
            <CatTooltip arrow title={t('asset_configurations.categories.general_admin_can_do')}>
              <div>
                <InfoCautionIcon
                  className="cursor-pointer opacity-9"
                  color="darkGrey"
                  contained
                  fontSize="small"
                />
              </div>
            </CatTooltip>
          )}
        </CatMenuItem>
      </CatMenu>
      <DeleteMainCategoryModal
        categoryId={categoryId}
        open={mainCategoryDeleteDialogOpen}
        togglePopup={toggleMainCategoryDeletePopup}
      />
      <DeleteSubCategoryModal
        categoryId={categoryId}
        open={subCategoryDeleteDialogOpen}
        togglePopup={toggleSubCategoryDeletePopup}
      />
      <BrandModelDialog categoryId={categoryId} onClose={handleClose} open={brandModelDialogOpen} />
    </>
  );
}

export default ContextMenu;
