import { CatIconButton, CatMenu, CatMenuDivider, CatMenuItem, CatTypography } from 'catamaran/core';
import { Theme, styled } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import ChevronR from 'catamaran/icons/ChevronR';
import EditIcon from 'catamaran/icons/Edit';
import EllipsisIcon from 'catamaran/icons/Ellipsis';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  expandable?: boolean;
  expanded?: boolean;
  selected?: boolean;
  code?: string;
  text?: string;
  onAdd?: () => void;
};

const getBackgroundColor = (theme: Theme, expanded: number, selected: boolean) => {
  if (expanded && !selected) {
    return theme.palette.darkGrey.main;
  }
  if (selected) {
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
      '& p': {
        width: 'calc(100% - 48px)'
      },
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
    border: '1px solid transparent',
    display: 'flex',
    height: '32px',
    justifyContent: 'space-between',
    opacity: expanded && !selected ? '0.6' : '1',
    padding: '8px',
    transition: 'background-color 0.30s ease-out, opacity 0.30s ease-out'
  },
  display: 'grid',
  gap: '1px',
  gridTemplateColumns: '2fr 7fr',
  marginBottom: '8px'
}));

function CategoryItem(props: Props) {
  const { expandable, expanded, selected, code, text } = props;
  const { t } = useTranslation();

  const popupState = usePopupState({ popupId: 'tabsCategoryItem', variant: 'popover' });

  return (
    <>
      <StyledWrapper expanded={expanded ? 1 : 0} selected={selected}>
        <div className="code-area category-item-part">
          <CatTypography variant="body2">{code}</CatTypography>
        </div>
        <div className="text-area category-item-part">
          <CatTypography variant="body2">{text}</CatTypography>
          <div className="flex">
            <CatIconButton {...bindTrigger(popupState)}>
              <EllipsisIcon className="opacity-8" color="darkGrey" containerClassName="slide-in" />
            </CatIconButton>
            <CatMenu {...bindMenu(popupState)}>
              <CatMenuItem>
                <EditIcon color="blue" fontSize="small" hoverable={false} />
                <CatTypography variant="body2">
                  <Trans i18nKey="categories.forms.form_builder.fields.edit_field" t={t} />
                </CatTypography>
              </CatMenuItem>
              <CatMenuDivider />
              <CatMenuItem>
                <TrashIcon color="red" fontSize="small" hoverable={false} />
                <CatTypography variant="body2">
                  <Trans i18nKey="categories.forms.form_builder.fields.delete_field" t={t} />
                </CatTypography>
              </CatMenuItem>
            </CatMenu>
            <CatIconButton className="ml8" disabled={expandable} onClick={undefined}>
              <ChevronR
                color={expanded ? 'lightBlue' : 'darkGrey'}
                contained={false}
                fontSize="small"
                hoverable={false}
              />
            </CatIconButton>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
}

export default CategoryItem;
