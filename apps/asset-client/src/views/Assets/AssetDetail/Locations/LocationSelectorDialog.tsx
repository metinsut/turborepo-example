import { DialogLegacy } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import {
  expandAllLocationTreeByLeafLocation,
  setSelectedLocation
} from 'store/slices/asset/locations/actions';
import { selectSelectedLocationId } from 'store/slices/asset/locations/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, withDialogWrapper } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BottomBar from 'components/BottomBar';
import LocationManagement from './LocationManagement';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: theme.spacing(2)
  },
  dialog: {
    '& .MuiDialog-paper': {
      alignItems: 'center',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }
  },
  gridItem: {
    marginRight: theme.spacing(1)
  },
  modalContent: {
    height: '100%',
    padding: theme.spacing(1, 0)
  },
  root: {
    justifyContent: 'center'
  }
}));

type Props = {
  branchId?: string;
  className?: string;
  currentLocationId?: string;
  open: boolean;
  onCancel?: () => Promise<void>;
  onClose: () => void;
  onConfirm: (locationId: string) => Promise<void>;
};

function LocationSelectorDialog(props: Props) {
  const classes = useStyles();
  const { branchId, className, currentLocationId, open, onCancel, onClose, onConfirm } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedLocationId = useTypedSelector(selectSelectedLocationId);

  React.useEffect(() => {
    dispatch(setSelectedLocation(currentLocationId));
  }, [currentLocationId, dispatch]);

  React.useEffect(() => {
    if (currentLocationId) {
      dispatch(expandAllLocationTreeByLeafLocation(currentLocationId));
    }
  }, [currentLocationId, dispatch]);

  const handleConfirm = async () => {
    await onConfirm?.(selectedLocationId);
    onClose?.();
  };

  const handleClose = () => {
    if (selectedLocationId !== currentLocationId) {
      dispatch(setSelectedLocation(currentLocationId));
    }

    onClose?.();
  };

  const handleCancel = async () => {
    await onCancel?.();
    onClose();
  };

  const locationChanged = currentLocationId !== selectedLocationId;

  return (
    <div className={clsx(classes.root, className)}>
      <DialogLegacy
        className={classes.dialog}
        fullWidth
        maxWidth="lg"
        onClose={onClose}
        open={open}
      >
        <LocationManagement
          branchId={branchId}
          checkable={false}
          deletable={false}
          draggable={false}
          editable={false}
          justifyContent="center"
          locationManagementType="selector"
          selectable
        />
        <BottomBar
          isCancelDisabled={!locationChanged}
          isConfirmDisabled={!locationChanged || !selectedLocationId}
          isGoBackDisabled={locationChanged}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          onGoBack={handleClose}
          textElement={
            <Typography variant="body2">{t('assets.locations.select_description')}</Typography>
          }
        />
      </DialogLegacy>
    </div>
  );
}

export default withDialogWrapper(LocationSelectorDialog);
