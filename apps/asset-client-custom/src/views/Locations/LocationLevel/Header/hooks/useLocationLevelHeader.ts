import { removeLocation, removeLocations } from 'store/slices/location/locations/actions';
import { useCallback, useState } from 'react';
import { useTypedDispatch } from 'hooks';

export const useLocationLevelHeader = (parentLocationId: string) => {
  const dispatch = useTypedDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeId, setRemoveId] = useState<string>(null);

  const handleRemoveSingle = useCallback(
    (id: string) => () => {
      setRemoveId(id);
      setDialogOpen(true);
    },
    []
  );

  const onRemoveButtonClicked = useCallback(() => {
    setRemoveId(null);
    setDialogOpen(true);
  }, [setDialogOpen]);

  const onRemoveConfirmed = useCallback(() => {
    setDialogOpen(false);
    if (removeId) {
      dispatch(removeLocation(removeId));
      setRemoveId(null);
    } else {
      dispatch(removeLocations(parentLocationId));
    }
  }, [dispatch, parentLocationId, removeId]);

  return {
    dialogOpen,
    handleRemoveSingle,
    onRemoveButtonClicked,
    onRemoveConfirmed,
    setDialogOpen
  };
};
