import { Box, CatButton, CatToggleCardChip } from 'catamaran/core';
import { SectionType } from '../helpers';
import { Skeleton, Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import {
  selectInitialUserAssetRole,
  selectUserAssetRole
} from 'store/slices/users/details/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DisplayHeader from 'components/Sections/DisplayHeader';
import EditIcon from 'catamaran/icons/Edit';
import PersonIcon from 'catamaran/icons/Person';
import React, { useMemo } from 'react';
import RoleLevelIndicator from './RoleCard/RoleLevelIndicator';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  activeSection?: SectionType;
  editVisible?: boolean;
  loading?: boolean;
  onEditClick?: () => void;
};

function DisplayMode(props: Props) {
  const classes = useStyles();
  const { className, activeSection, editVisible = true, loading, onEditClick } = props;

  const { t } = useTranslation();
  const initialAssetRole = useTypedSelector(selectInitialUserAssetRole);
  const assetRole = useTypedSelector(selectUserAssetRole);

  const displayedAssetRole = useMemo(() => {
    if (activeSection === 'department') {
      return assetRole;
    }

    return initialAssetRole;
  }, [activeSection, assetRole, initialAssetRole]);

  const roleResource = t(`users.roles.${displayedAssetRole?.name}`);

  return (
    <Box className={clsx(classes.root, className)}>
      <DisplayHeader
        headerIcon={<PersonIcon contained={false} hoverable={false} opacity={0.8} />}
        headerText={
          <Trans components={{ bold: <b /> }} i18nKey="users.modal.asset_roles.title" t={t} />
        }
      />
      <Box ml={4}>
        <Box alignItems="center" flex my={2}>
          {loading ? (
            <Skeleton height="24px" width="75px" />
          ) : (
            <CatToggleCardChip filled reverseColors={false} text={roleResource} />
          )}
          <Box mx={1}>
            <PersonIcon contained={false} hoverable={false} opacity={0.6} />
          </Box>
          <RoleLevelIndicator roleType={displayedAssetRole} />
        </Box>
        {editVisible && (
          <CatButton
            color="blue"
            disabled={loading}
            endIcon={<EditIcon />}
            onClick={onEditClick}
            size="small"
          >
            {t('common.edit')}
          </CatButton>
        )}
      </Box>
    </Box>
  );
}

export default DisplayMode;
