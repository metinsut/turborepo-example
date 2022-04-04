import { AssetRole } from 'store/slices/users/details/types';
import { Box, CatToggleCard } from 'catamaran/core';
import { Theme, Tooltip, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import InfoIcon from 'catamaran/icons/Info';
import React from 'react';
import RoleIcon from 'views/Users/UserCommon/RoleIcon';
import RoleLevelIndicator from './RoleLevelIndicator';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  disabled?: boolean;
  hoverText?: string;
  onClick?: () => void;
  roleType: AssetRole;
  selected?: boolean;
};

function RoleCard(props: Props) {
  const classes = useStyles();
  const { className, disabled = false, hoverText = undefined, onClick, roleType, selected } = props;

  const { t } = useTranslation();
  const title = t(`users.roles.${roleType.name}`);

  return (
    <CatToggleCard
      className={clsx(classes.root, className)}
      disabled={disabled}
      onClick={onClick}
      selected={selected}
      style={{ height: 272, width: 196 }}
    >
      <Box flex flexDirection="column" height="100%" width="100%">
        <Box alignItems="center" flex justifyContent="space-between" mb={1}>
          <Box alignItems="center" flex>
            <RoleIcon assetRoleType={roleType} contained={false} hoverable={false} />
            <Box width="4px" />
            <Typography variant="h2">{title}</Typography>
          </Box>
          {hoverText && (
            <Box>
              <Tooltip arrow title={hoverText}>
                <div>
                  <InfoIcon alwaysHovered color="darkGrey" fontSize="small" />
                </div>
              </Tooltip>
            </Box>
          )}
        </Box>
        <Typography variant="body1">
          <Trans
            components={{ bold: <b /> }}
            i18nKey={`users.roleDescriptions.${roleType.name}`}
            t={t}
          />
        </Typography>
        <Box flex flexGrow={1} />
        <RoleLevelIndicator lightColors={selected} roleType={roleType} />
      </Box>
    </CatToggleCard>
  );
}

export default RoleCard;
