import {
  Box,
  CatCardIconButton,
  CatCenterIcon,
  CatDataCard,
  CatMainContent,
  CatSidebar
} from 'catamaran/core';
import { Skeleton } from 'catamaran/core/mui';
import EditIcon from 'catamaran/icons/Edit';
import LocationIcon from 'catamaran/icons/Location';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  className?: string;
};

function LocationSkeleton({ className }: Props) {
  return (
    <CatDataCard className={className} color="darkGrey" transparentBackground>
      <>
        <CatSidebar>
          <CatCardIconButton disabled>
            <EditIcon color="lightBlue" />
          </CatCardIconButton>
          <CatCenterIcon component={LocationIcon} />
          <CatCardIconButton disabled>
            <TrashIcon color="red" />
          </CatCardIconButton>
        </CatSidebar>
        <CatMainContent>
          <Box>
            <Skeleton height="24px" width="120px" />
            <Box mt={0.5}>
              <Skeleton height="16px" width="75px" />
            </Box>
            <Box mt={0.25}>
              <Skeleton height="16px" width="75px" />
            </Box>
            <Box mt={0.25}>
              <Skeleton height="16px" width="75px" />
            </Box>
          </Box>
        </CatMainContent>
      </>
    </CatDataCard>
  );
}

export default LocationSkeleton;
