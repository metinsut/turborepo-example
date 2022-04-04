import { CatIconButton, CatMenu, CatMenuItem, CatTypography } from 'catamaran/core';
import { Theme, styled } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { selectBrandById } from 'store/slices/brandsv2/selectors';
import { useDialogState, useTypedSelector } from 'hooks';
import BrandDeleteDialog from './BrandDeleteDialog';
import ChevronRIcon from 'catamaran/icons/ChevronR';
import EllipsisIcon from 'catamaran/icons/Ellipsis';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  brandId: string;
  categoryId: string;
  expanded?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
};

const getBackgroundColor = (theme: Theme, expanded: number) => {
  if (expanded) {
    return theme.palette.blue.main;
  }
  return theme.palette.lightGrey.main;
};

const StyledWrapper = styled('div')<{
  expanded?: number;
}>(({ theme, expanded }) => ({
  '& .slide-in': {
    opacity: 0,
    transition: 'all 0.4s ease-out',
    width: '0px'
  },
  '& p': {
    color: expanded ? theme.palette.common.white : theme.palette.darkGrey.main,
    transition: 'color 0.30s ease-out'
  },
  '&:hover': {
    '& .slide-in': {
      opacity: 1,
      width: '24px'
    }
  },
  alignItems: 'center',
  backgroundColor: getBackgroundColor(theme, expanded),
  borderRadius: '16px',
  display: 'grid',
  gridAutoFlow: 'column',
  height: '32px',
  justifyContent: 'space-between',
  paddingLeft: '8px',
  paddingRight: '8px',
  transition: 'background-color 0.30s ease-out, opacity 0.30s ease-out'
}));

function BrandItem(props: Props, ref: React.Ref<any>) {
  const { brandId, categoryId, expanded, onCollapse, onExpand } = props;
  const { t } = useTranslation();

  const popupState = usePopupState({ popupId: 'brandItemContextMenu', variant: 'popover' });
  const { isOpen, togglePopup } = useDialogState();

  const brand = useTypedSelector((state) => selectBrandById(state, brandId));

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    bindTrigger(popupState).onClick(event);
  };

  const expandButton = (
    <CatIconButton className="mr8-minus" style={{ height: '32px', width: '32px' }}>
      <ChevronRIcon
        color={expanded ? 'lightBlue' : 'darkGrey'}
        contained={false}
        fontSize="small"
        hoverable={false}
      />
    </CatIconButton>
  );

  const handleDelete = () => {
    popupState.close();
    togglePopup(true);
  };

  return (
    <>
      <StyledWrapper
        className="cursor-pointer"
        expanded={expanded ? 1 : 0}
        onClick={!expanded ? onExpand : onCollapse}
        ref={ref}
      >
        <CatTypography className="three-dot" variant="body2">
          {brand?.name}
        </CatTypography>
        <div className="flex align-items-center">
          <CatIconButton {...bindTrigger(popupState)} onClick={handleMenuButtonClick}>
            <EllipsisIcon className="opacity-8" color="darkGrey" containerClassName="slide-in" />
          </CatIconButton>
          {expandButton}
        </div>
      </StyledWrapper>
      <CatMenu {...bindMenu(popupState)}>
        <CatMenuItem onClick={handleDelete}>
          <TrashIcon color="red" fontSize="small" hoverable={false} />
          <CatTypography variant="body2">
            <Trans i18nKey="asset_configurations.brands.delete_brand" t={t} />
          </CatTypography>
        </CatMenuItem>
      </CatMenu>
      <BrandDeleteDialog
        brandId={brand?.id}
        categoryId={categoryId}
        onClose={() => togglePopup(false)}
        open={isOpen}
      />
    </>
  );
}

export default React.forwardRef(BrandItem);
