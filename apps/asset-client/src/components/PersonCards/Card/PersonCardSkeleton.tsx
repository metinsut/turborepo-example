import {
  Box,
  CatCardIconButton,
  CatCenterIcon,
  CatCornerContent,
  CatDataCard,
  CatMainContent,
  CatSidebar
} from 'catamaran/core';
import { Skeleton } from 'catamaran/core/mui';
import EditIcon from 'catamaran/icons/Edit';
import PersonIcon from 'catamaran/icons/Person';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  className?: string;
};

function PersonCardSkeleton({ className }: Props) {
  return (
    <CatDataCard className={className} color="darkGrey" transparentBackground>
      <>
        <CatSidebar>
          <CatCardIconButton disabled>
            <EditIcon color="lightBlue" />
          </CatCardIconButton>
          <CatCenterIcon component={PersonIcon} />
          <CatCardIconButton disabled>
            <TrashIcon color="red" />
          </CatCardIconButton>
        </CatSidebar>
        <CatMainContent>
          <Box>
            <Skeleton height="24px" width="75px" />
            <Box mt={0.5}>
              <Skeleton height="24px" width="75px" />
            </Box>
          </Box>
          <CatCornerContent>
            <Box
              alignItems="flex-end"
              flex
              fontSize={9}
              height={1}
              justifyContent="flex-end"
              textAlign="right"
              whiteSpace="pre-wrap"
            >
              <Skeleton height="96px" variant="circular" width="96px" />
            </Box>
          </CatCornerContent>
        </CatMainContent>
      </>
    </CatDataCard>
  );
}

export default PersonCardSkeleton;
