import {
  Box,
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatIconButton,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { selectAssetFormBranchId } from 'store/slices/asset/detail/selectors';
import { selectBranchById } from 'store/slices/branches';
import { useTypedSelector } from 'hooks';
import LocationIcon from 'catamaran/icons/Location';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import theme from 'catamaran/theme';

type Props = {
  className?: string;
  onEdit: () => void;
};

function NotAssigned(props: Props) {
  const { className, onEdit } = props;
  const branchId = useTypedSelector(selectAssetFormBranchId);
  const branch = useTypedSelector((state) => selectBranchById(state, branchId));
  const { t } = useTranslation();

  return (
    <CatDataCard
      className={className}
      color={(hovered: boolean) => (hovered ? 'blue' : 'darkGrey')}
      dashedBorder
      transparentBackground
    >
      {(hovered) => (
        <>
          <CatSidebar>
            <CatEmptyIcon />
            <CatCenterIcon component={LocationIcon} />
            <CatEmptyIcon />
          </CatSidebar>
          <CatMainContent onClick={onEdit}>
            {!hovered ? (
              <div className="grid grid-auto-flow-row gap-4 align-content-center h-full">
                <CatTypography className="opacity-8" variant="subtitle1">
                  <Trans i18nKey="assets.asset_edit.location_not_selected_title" t={t} />
                </CatTypography>
                <CatTypography className="opacity-6" variant="body2">
                  <Trans
                    i18nKey="assets.asset_edit.location_branch"
                    t={t}
                    values={{ branchName: branch?.name ?? '' }}
                  />
                </CatTypography>
              </div>
            ) : (
              <Box alignItems="center" color={theme.palette.blue.main} display="flex" height={1}>
                <CatIconButton>
                  <PlusIcon color="blue" />
                </CatIconButton>
                <Box width={8} />
                <CatTypography color="inherit" variant="subtitle1">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="assets.asset_edit.click_to_assign_location"
                    t={t}
                  />
                </CatTypography>
              </Box>
            )}
          </CatMainContent>
        </>
      )}
    </CatDataCard>
  );
}

export default NotAssigned;
