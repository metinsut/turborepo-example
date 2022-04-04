import {
  Box,
  CatCardIconButton,
  CatCenterIcon,
  CatDataCard,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { Location } from 'store/slices/asset/locations/types';
import { Trans, useTranslation } from 'react-i18next';
import { selectBranchById } from 'store/slices/branches';
import { useTypedSelector } from 'hooks/useTypedSelector';
import EditIcon from 'catamaran/icons/Edit';
import LocationIcon from 'catamaran/icons/Location';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  className?: string;
  location: Location;
  locationFullPath: string[];
  onEdit: () => void;
  onDelete: Function;
};

function Assigned(props: Props) {
  const { className, location, locationFullPath, onEdit, onDelete } = props;

  const { t } = useTranslation();
  const branch = useTypedSelector((state) => selectBranchById(state, location.branchId));

  return (
    <CatDataCard className={className} color="blue">
      <>
        <CatSidebar>
          <CatCardIconButton onClick={onEdit}>
            <EditIcon color="lightBlue" />
          </CatCardIconButton>
          <CatCenterIcon component={LocationIcon} />
          <CatCardIconButton onClick={() => onDelete()}>
            <TrashIcon color="red" />
          </CatCardIconButton>
        </CatSidebar>
        <CatMainContent>
          <Box>
            <CatTypography variant="body1">{locationFullPath[0]}</CatTypography>
            <Box mt={0.5}>
              <CatTypography variant="body2">
                <Trans
                  i18nKey="assets.asset_edit.location_branch"
                  t={t}
                  values={{ branchName: branch?.name ?? '' }}
                />
              </CatTypography>
            </Box>
            <Box fontSize={9} ml="12px" mt={1} opacity={0.8} whiteSpace="pre-wrap">
              <CatTypography variant="caption">
                <ul>
                  {locationFullPath.slice(1).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CatTypography>
            </Box>
          </Box>
        </CatMainContent>
      </>
    </CatDataCard>
  );
}

export default Assigned;
