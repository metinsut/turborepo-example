import { Box, CatIconButton } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { Grid } from 'catamaran/core/mui';
import { LocationLevel } from 'store/slices/location/locationLevels/types';
import { useStyles } from 'views/Locations/styles';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import ValidatedTextField from 'components/ValidatedTextField';
import clsx from 'clsx';

type Props = {
  className?: string;
  formHelper?: FormHelper<LocationLevel>;
  onCancelClick?: () => void;
  onDeleteClick?: () => void;
  onEditConfirmClick?: () => void;
};

function EditLocationLevelHeader(props: Props) {
  const classes = useStyles();
  const { className, formHelper, onCancelClick, onEditConfirmClick, onDeleteClick } = props;

  return (
    <div className={clsx(classes.header, className)}>
      <Grid className={classes.headerGrid} container>
        <CatIconButton className={classes.iconButton} onClick={onCancelClick}>
          <CancelIcon color="red" contained fontSize="medium" />
        </CatIconButton>
        <Grid alignContent="center" container item justifyContent="center" xs>
          <ValidatedTextField
            formHelper={formHelper}
            margin="dense"
            name="name"
            size="small"
            variant="outlined"
          />
        </Grid>
        <CatIconButton className={classes.iconButton} onClick={onEditConfirmClick}>
          <CheckIcon color="green" contained fontSize="medium" />
        </CatIconButton>
      </Grid>
      <Grid alignContent="center" className={classes.subheader} container justifyContent="center">
        <CatIconButton className={classes.iconButton} onClick={onDeleteClick}>
          <TrashIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      </Grid>
      <Box className={classes.divider} />
    </div>
  );
}

export default EditLocationLevelHeader;
