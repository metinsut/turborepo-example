import { Asset } from 'store/slices/asset/detail/types';
import { getLocationDetailFullPath } from 'store/slices/asset/locations/actions';
import { getLocationFullPath } from 'store/slices/location/locations/actions';
import { removeAssetLocation, setAssetLocationId } from 'store/slices/asset/detail/slice';
import { selectLocationById } from 'store/slices/asset/locations/selectors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMountedState } from 'react-use';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import Assigned from './Assigned';
import LocationDeleteDialog from './LocationDeleteDialog';
import LocationSelectorDialog from 'views/Assets/AssetDetail/Locations/LocationSelectorDialog';
import LocationSkeleton from './LocationSkeleton';
import NotAssigned from './NotAssigned';
import useLoading from 'hooks/useLoading';

type Props = {
  asset: Asset;
  className?: string;
  onEditClick?: () => void;
};

function LocationItem(props: Props) {
  const { asset, className, onEditClick } = props;
  const dispatch = useTypedDispatch();
  const [locationPath, setLocationPath] = useState<string[]>([]);
  const location = useTypedSelector((state) => selectLocationById(state, asset.locationId));
  const isMounted = useMountedState();

  const [locationLoading, locationLoadingDispatch] = useLoading();
  const [locationPathLoading, locationPathLoadingDispatch] = useLoading<string[]>();
  const commonLoading = locationLoading || locationPathLoading;

  const assigned = !!asset.locationId;

  useEffect(() => {
    fetchLocationPath();

    async function fetchLocationPath() {
      if (asset?.locationId) {
        const path = await locationPathLoadingDispatch(getLocationFullPath(asset.locationId));

        if (isMounted()) {
          setLocationPath(path.reverse());
        }
      }
    }
  }, [asset.locationId, locationPathLoadingDispatch, isMounted]);

  useEffect(() => {
    fetchLocationDetail();

    async function fetchLocationDetail() {
      if (asset?.locationId) {
        try {
          await locationLoadingDispatch(getLocationDetailFullPath(asset.locationId));
        } catch (error) {
          await dispatch(removeAssetLocation());
        }
      }
    }
  }, [asset.locationId, dispatch, locationLoadingDispatch]);

  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const handleLocationConfirm = async (selectedLocationId: string) => {
    await dispatch(setAssetLocationId(selectedLocationId));
  };

  const handleEdit = useCallback(() => {
    setLocationDialogOpen(true);
    onEditClick?.();
  }, [onEditClick]);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleLocationDeleteClick = useCallback(() => {
    setDeleteOpen(true);
  }, []);

  const handleDelete = useCallback(async () => {
    await dispatch(removeAssetLocation());
    setDeleteOpen(false);
    onEditClick?.();
  }, [dispatch, onEditClick]);

  const cardContent = useMemo(() => {
    let content = <></>;

    if (commonLoading || (assigned && !location)) {
      content = <LocationSkeleton className={className} />;
    } else if (assigned) {
      content = (
        <Assigned
          className={className}
          location={location}
          locationFullPath={locationPath}
          onDelete={handleLocationDeleteClick}
          onEdit={handleEdit}
        />
      );
    } else {
      content = <NotAssigned className={className} onEdit={handleEdit} />;
    }

    return content;
  }, [
    assigned,
    className,
    commonLoading,
    handleEdit,
    handleLocationDeleteClick,
    location,
    locationPath
  ]);

  return (
    <>
      <LocationSelectorDialog
        branchId={asset.branchId}
        currentLocationId={asset.locationId}
        onClose={() => setLocationDialogOpen(false)}
        onConfirm={handleLocationConfirm}
        open={locationDialogOpen}
      />
      <LocationDeleteDialog
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
        open={deleteOpen}
      />
      {cardContent}
    </>
  );
}

export default LocationItem;
