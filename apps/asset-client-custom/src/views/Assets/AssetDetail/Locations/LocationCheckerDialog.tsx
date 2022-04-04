import { CatTypography, DialogLegacy } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import {
  checkMultipleLocations,
  getGroupedCheckedLocationIds
} from 'store/slices/asset/locations/actions';
import {
  clearCheckedLocationIds,
  setExpandedLocationIds
} from 'store/slices/asset/locations/slice';
import { dequal } from 'dequal';
import { selectAllCheckedLocationIds } from 'store/slices/asset/locations/selectors';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import BottomBar from 'components/BottomBar';
import LocationManagement from './LocationManagement';
import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      alignItems: 'center',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }
  },
  root: {
    justifyContent: 'center'
  }
}));

export type CloseAction = 'goBack' | 'cancel' | 'confirm';

type Props = {
  branchId?: string;
  className?: string;
  checkedLocationIds?: string[];
  defaultExpandMainLocationId?: string;
  open: boolean;
  onConfirm?: (locations: string[]) => Promise<void>;
  onClose: (action?: CloseAction) => void;
};

function LocationCheckerDialog(props: Props) {
  const classes = useStyles();
  const {
    branchId,
    className,
    checkedLocationIds = [],
    defaultExpandMainLocationId,
    open,
    onConfirm,
    onClose
  } = props;

  const dispatch = useTypedDispatch();
  const checkedLocationIdsFromStore = useTypedSelector(selectAllCheckedLocationIds);
  const groupedLocationIds = useMemo(() => {
    const ids = dispatch(getGroupedCheckedLocationIds(checkedLocationIdsFromStore));
    return ids;
  }, [dispatch, checkedLocationIdsFromStore]);

  useEffect(() => {
    if (defaultExpandMainLocationId) {
      dispatch(setExpandedLocationIds([null, defaultExpandMainLocationId]));
    }
  }, [defaultExpandMainLocationId, dispatch]);

  const categoryChanged = !dequal(checkedLocationIds, groupedLocationIds);

  useEffect(() => {
    dispatch(checkMultipleLocations(checkedLocationIds));
  }, [checkedLocationIds, dispatch]);

  const handleConfirm = async () => {
    await onConfirm(groupedLocationIds);

    onClose('confirm');
  };

  const handleCancel = async () => {
    dispatch(clearCheckedLocationIds());
    dispatch(checkMultipleLocations(checkedLocationIds));
    onClose('cancel');
  };

  const handleGoBack = () => {
    onClose('goBack');
  };

  return (
    <div className={clsx(classes.root, className)}>
      <DialogLegacy className={classes.dialog} fullWidth maxWidth="lg" open={open}>
        <LocationManagement
          allowModifyBrandModel={false}
          alwaysShowCheckbox
          branchId={branchId}
          checkable
          deletable={false}
          draggable={false}
          editable={false}
          justifyContent="center"
          locationManagementType="checker"
          selectable={false}
        />
        <BottomBar
          isCancelDisabled={!categoryChanged}
          isConfirmDisabled={!categoryChanged}
          isGoBackDisabled={categoryChanged}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          onGoBack={handleGoBack}
          textElement={<CatTypography variant="body2">Select one or more categories</CatTypography>}
        />
      </DialogLegacy>
    </div>
  );
}

export default withDialogWrapper(LocationCheckerDialog);
