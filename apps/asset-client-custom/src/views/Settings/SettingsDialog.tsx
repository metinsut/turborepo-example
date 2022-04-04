import { AppSettings, getAppSettings, getEnvironment, setAppSettings } from 'utils/settings';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  Theme,
  makeStyles
} from 'catamaran/core/mui';
import { CatButton, DialogLegacy } from 'catamaran/core';
import { silentRefresh } from 'store/slices/session';
import { useFormState, withDialogWrapper } from 'hooks';
import BottomBar from 'components/BottomBar';
import ImportIcon from 'catamaran/icons/Import';
import LoadingIcon from 'catamaran/icons/Loading';
import React, { useState } from 'react';
import ReplayIcon from 'catamaran/icons/Replay';
import TokenDialog from 'layouts/Dashboard/TokenDialog';
import axiosMockAdapter from 'utils/mock';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  bottomBar: {
    boxShadow: 'none',
    width: '100%'
  },
  root: {}
}));

type Props = {
  className?: string;
  open: boolean;
  onClose: () => void;
};

function SettingsDialog(props: Props) {
  const classes = useStyles();
  const { className, open, onClose } = props;

  const [tokenDialogOpen, setTokenDialogOpen] = useState(false);
  const [silentRefreshLoading, silentRefreshDispatch] = useLoading();
  const formHelper = useFormState<AppSettings>(() => getAppSettings());
  const { handleChange, formState } = formHelper;
  const developmentFeaturesEnabled = formState.values.enableDevelopmentFeatures;

  const handleCancel = async () => {
    onClose();
  };

  const handleConfirm = async () => {
    setAppSettings(formState.values);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const handleSilentRefresh = async () => {
    await silentRefreshDispatch(silentRefresh());
  };

  const goBackDisabled = formHelper.formState.isTouched;
  const cancelDisabled = !formHelper.formState.isTouched;
  const confirmDisabled = !formHelper.formState.isTouched;

  const isProduction = getEnvironment() === 'prod';

  return (
    <DialogLegacy
      aria-labelledby="settings-dialog-title"
      className={clsx(className, classes.root)}
      fullWidth
      maxWidth="md"
      open={open}
    >
      <DialogTitle id="settings-dialog-title">App Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>You can switch these development features.</DialogContentText>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={formState.values.useMockData}
                disabled={isProduction}
                name="useMockData"
                onChange={handleChange}
              />
            }
            label="Use Mock Data"
          />
          <FormControlLabel
            control={
              <Switch
                checked={developmentFeaturesEnabled}
                disabled={isProduction}
                name="enableDevelopmentFeatures"
                onChange={handleChange}
              />
            }
            label="Enable Development Features"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <BottomBar
          className={classes.bottomBar}
          isCancelDisabled={cancelDisabled}
          isConfirmDisabled={confirmDisabled}
          isGoBackDisabled={goBackDisabled}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          onGoBack={onClose}
          textElement={
            <Box mb={2.5}>
              <CatButton
                color="blue"
                endIcon={<ImportIcon />}
                onClick={() => setTokenDialogOpen(true)}
                style={{ marginRight: 10 }}
              >
                Show Token
              </CatButton>
              <CatButton
                color="orange"
                disabled={silentRefreshLoading}
                endIcon={
                  silentRefreshLoading ? <LoadingIcon style={{ padding: '1px' }} /> : <ReplayIcon />
                }
                onClick={handleSilentRefresh}
              >
                Silent Refresh
              </CatButton>
              {developmentFeaturesEnabled && (
                <CatButton
                  color="green"
                  endIcon={<ImportIcon />}
                  // eslint-disable-next-line no-console
                  onClick={() => console.log(axiosMockAdapter.history)}
                  style={{ marginRight: 10 }}
                >
                  Mock history
                </CatButton>
              )}
            </Box>
          }
        />
      </DialogActions>
      <TokenDialog setTokenDialogOpen={setTokenDialogOpen} tokenDialogOpen={tokenDialogOpen} />
    </DialogLegacy>
  );
}

export default withDialogWrapper(SettingsDialog);
