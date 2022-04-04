import { Badge, Checkbox, FormControlLabel, Grid, Typography } from 'catamaran/core/mui';
import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatIconButton,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { LocationLevel } from 'store/slices/location/locationLevels/types';
import { checkAllLocationsUnderParentLocation } from 'store/slices/location/locations/actions';
import { useStyles } from 'views/Locations/styles';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import CheckboxCheckedIcon from 'catamaran/icons/CheckboxChecked';
import CheckboxIcon from 'catamaran/icons/Checkbox';
import EditIcon from 'catamaran/icons/Edit';
import React from 'react';
import SearchIcon from 'catamaran/icons/Search';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';

type Props = {
  className?: string;
  checkedIds?: string[];
  dialogOpen?: boolean;
  editVisible?: boolean;
  locationIds?: string[];
  locationLevel: LocationLevel;
  onEditClick?: () => void;
  onRemoveButtonClicked?: () => void;
  onRemoveConfirmed?: () => void;
  onSearchClick?: () => void;
  searchVisible?: boolean;
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  parentLocationId?: string;
};

function DefaultLocationLevelHeader(props: Props) {
  const classes = useStyles();
  const {
    className,
    checkedIds,
    dialogOpen,
    editVisible = true,
    locationIds,
    locationLevel,
    onEditClick,
    onRemoveButtonClicked,
    onRemoveConfirmed,
    onSearchClick,
    parentLocationId,
    searchVisible = true,
    setDialogOpen
  } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const showSelectAll = checkedIds && checkedIds.length > 0;
  const handleCheckAll = () => {
    dispatch(checkAllLocationsUnderParentLocation(parentLocationId));
  };

  const handleRemoveConfirmed = async () => onRemoveConfirmed();

  return (
    <div className={clsx(classes.header, className)}>
      <CatDialog
        onAction={handleRemoveConfirmed}
        onClose={() => setDialogOpen(false)}
        open={dialogOpen ?? false}
      >
        <CatDialogTitle iconComponent={TrashIcon} title={t('common.warning')} />
        <CatDialogContent>
          <CatTypography variant="body1">{t('locations.delete_warning')}</CatTypography>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton component={DeleteButton} variant="action" />
        </CatDialogAction>
      </CatDialog>
      <Grid className={classes.headerGrid} container>
        {editVisible && (
          <CatIconButton className={classes.iconButton} onClick={onSearchClick}>
            <SearchIcon color="lightGrey" contained fontSize="medium" />
          </CatIconButton>
        )}
        <Grid alignContent="center" container item justifyContent="center" xs>
          <Typography align="center" variant="body1">
            {locationLevel.name}
          </Typography>
        </Grid>
        {searchVisible && (
          <CatIconButton className={classes.iconButton} onClick={onEditClick}>
            <EditIcon color="blue" contained fontSize="medium" />
          </CatIconButton>
        )}
      </Grid>
      <Grid container justifyContent="center">
        {showSelectAll && (
          <Badge badgeContent={checkedIds.length} className={classes.deleteButton} color="primary">
            <CatIconButton onClick={onRemoveButtonClicked}>
              <TrashIcon color="darkRed" contained />
            </CatIconButton>
          </Badge>
        )}
      </Grid>
      <Box className={classes.divider} />
      {showSelectAll && (
        <FormControlLabel
          className={classes.checkboxLabel}
          control={
            <Checkbox
              checked={locationIds.length === checkedIds.length}
              checkedIcon={<CheckboxCheckedIcon fontSize="inherit" />}
              className={classes.checkbox}
              color="primary"
              icon={<CheckboxIcon fontSize="inherit" />}
              onChange={handleCheckAll}
            />
          }
          label={<Typography variant="caption">{t('common.select_all')}</Typography>}
          labelPlacement="end"
        />
      )}
    </div>
  );
}

export default DefaultLocationLevelHeader;
