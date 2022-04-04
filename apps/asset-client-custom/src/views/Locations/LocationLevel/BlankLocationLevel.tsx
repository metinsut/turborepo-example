import { Box, CircularProgress, Grid, Paper } from 'catamaran/core/mui';
import { CatIconButton } from 'catamaran/core';
import { LocationLevel } from 'store/slices/location/locationLevels/types';
import { createLocationLevel } from 'store/slices/location/locationLevels/actions';
import { useFormState } from 'hooks';
import { useStyles } from '../styles';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import React, { useCallback } from 'react';
import ValidatedTextField from 'components/ValidatedTextField';
import clsx from 'clsx';
import locationLevelValidator from 'helpers/validations/LocationLevelValidator';
import useLoading from 'hooks/useLoading';

type Props = {
  className?: string;
  parentLocationLevelId?: string;
  onApprove?: () => void;
  onCancel?: () => void;
};

function BlankLocationLevel(props: Props) {
  const classes = useStyles();
  const { className, onApprove, onCancel, parentLocationLevelId } = props;

  const [loading, dispatchWithLoading] = useLoading();

  const locationLevel: LocationLevel = {};
  const formHelper = useFormState(locationLevel, locationLevelValidator);

  const handleApprove = useCallback(async () => {
    const locationLevel = formHelper.formState.values;
    dispatchWithLoading(createLocationLevel(locationLevel, parentLocationLevelId));

    if (onApprove) {
      onApprove();
    }
  }, [dispatchWithLoading, formHelper.formState.values, onApprove, parentLocationLevelId]);

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid
        alignContent="space-between"
        className={classes.header}
        container
        style={{ height: '100%' }}
      >
        <Grid item xs={12}>
          <Grid className={classes.headerGrid} container>
            <CatIconButton className={classes.iconButton} loading={loading} onClick={onCancel}>
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
            <CatIconButton className={classes.iconButton} loading={loading} onClick={handleApprove}>
              <CheckIcon color="green" contained fontSize="medium" />
            </CatIconButton>
          </Grid>
          <Box className={classes.divider} />
          {loading && (
            <Grid alignItems="center" container direction="column" justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
        </Grid>
        <Grid className={classes.bottom} item xs={12}>
          <Box className={classes.divider} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BlankLocationLevel;
