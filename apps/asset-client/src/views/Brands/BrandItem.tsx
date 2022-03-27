import { Brand } from 'store/slices/brands/types';
import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatIconButton,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { useCallback } from 'react';
import { useDialogState } from 'hooks';
import { useFormState } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import CountBadge from 'catamaran/icons/CountBadge';
import NewBadge from 'catamaran/icons/NewBadge';
import SearchDropdownHelper from 'components/CatamaranTextField/SearchDropdownHelper';
import Searchable from 'components/CatamaranTextField/Searchable';
import TrashIcon from 'catamaran/icons/Trash';
import brandValidator from 'helpers/validations/BrandValidator';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  expanded: {
    '& p': {
      color: theme.palette.common.white
    },
    background: theme.palette.blueGradient.main
  },
  margin: {
    margin: theme.spacing(0.5, 0)
  },
  root: {},
  searchDropdownText: {
    padding: theme.spacing(1)
  },
  small: {
    '& .MuiInput-underline': {
      '&:after': {
        margin: theme.spacing(0, 0.8),
        marginBottom: '3px'
      },
      '&:before': {
        margin: theme.spacing(0, 0.8),
        marginBottom: '3px'
      }
    },
    '& .MuiInputAdornment-root': {},
    borderRadius: theme.spacing(8),
    height: theme.spacing(4)
  }
}));

type Props = {
  size?: 'small' | ('medium' & string);
  brand?: Brand;
  className?: string;
  defaultFocused?: boolean;
  defaultReadonly?: boolean;
  deletable?: boolean;
  disabled?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  editable?: boolean;
  label?: string;
  onAddNew?: (brand: Brand) => Promise<Brand>;
  onConfirm?: (brand: Brand) => Promise<Brand>;
  onClose?: () => void;
  onExpand?: () => void;
  onRemove?: () => void;
  searchableBrands?: Brand[];
  showCountBadge?: boolean;
  showSearchHelperText?: boolean;
};

function BrandItem(props: Props) {
  const classes = useStyles();
  const {
    size = 'medium',
    brand = { name: '' },
    className,
    defaultFocused,
    defaultReadonly = true,
    deletable,
    disabled,
    editable,
    expandable,
    label,
    onAddNew,
    onConfirm,
    onClose,
    onRemove,
    onExpand,
    expanded,
    searchableBrands,
    showCountBadge,
    showSearchHelperText
  } = props;

  const { t } = useTranslation();

  const formHelper = useFormState(brand, brandValidator);

  const { isOpen, togglePopup } = useDialogState();
  const handleRemove = useCallback(async () => {
    togglePopup(false);

    if (onRemove) {
      await onRemove();
    }
  }, [onRemove, togglePopup]);

  const handleClose = () => {
    togglePopup(false);
  };
  return (
    <div className={clsx(classes.root, className)}>
      <Searchable
        autoFocus
        className={clsx(classes.root, className)}
        formHelper={formHelper}
        mode="editAndConfirm"
        name="name"
        noItemElement={
          <CatTypography className={classes.searchDropdownText} variant="body1">
            {t('brands.no_brand_found')}
          </CatTypography>
        }
        onAddNew={onAddNew}
        onClose={onClose}
        onConfirm={onConfirm}
        primaryKey="id"
        renderInput={(props) => (
          <CatamaranTextField
            adornments={[
              {
                child: brand.inMemory && <NewBadge key={1} />,
                hover: 'onlyOnNotHover',
                position: 'end',
                priority: 'high',
                show: 'readonly'
              },
              {
                child: showCountBadge && <CountBadge count={brand.modelCount} key={2} />,
                hover: 'always',
                position: 'end',
                priority: 'high',
                show: 'readonly'
              },
              {
                child: expandable && (
                  <CatIconButton key={3} onClick={onExpand}>
                    <ArrowRightIcon
                      color={expanded ? 'lightBlue' : 'darkGrey'}
                      contained
                      fontSize="small"
                    />
                  </CatIconButton>
                ),
                hover: 'always',
                position: 'end',
                priority: 'low',
                show: 'readonly'
              }
            ]}
            autoComplete="new-password"
            autoFocus={defaultFocused}
            className={clsx({
              [classes.small]: size === 'small',
              [classes.margin]: true,
              [classes.expanded]: expanded
            })}
            deletable={deletable}
            disabled={disabled}
            editable={editable}
            isRequired
            label={label}
            lightIconColors={expanded}
            onDelete={() => togglePopup(true)}
            validatable
            {...props}
          />
        )}
        searchHelperText={
          <SearchDropdownHelper messageKey="assets.asset_edit.brand_dropdown_hint" />
        }
        searchOptions={searchableBrands}
        showSearchHelperText={showSearchHelperText}
        startWithEditMode={!defaultReadonly}
      />
      <CatDialog onAction={handleRemove} onClose={handleClose} open={isOpen}>
        <CatDialogTitle iconComponent={TrashIcon} title={t('common.warning')} />
        <CatDialogContent>
          <CatTypography variant="body1">{t('brands.delete_warning')}</CatTypography>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton component={DeleteButton} variant="action" />
        </CatDialogAction>
      </CatDialog>
    </div>
  );
}

export default BrandItem;
