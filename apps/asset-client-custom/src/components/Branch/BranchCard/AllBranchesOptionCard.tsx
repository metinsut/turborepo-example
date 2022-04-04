import { Box, CatSwitch, CatToggleCard, CatToggleCardChip } from 'catamaran/core';
import { Theme, Tooltip, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import BranchIcon from 'catamaran/icons/Branch';
import DynamicOnIcon from 'catamaran/icons/DynamicOn';
import InfoIcon from 'catamaran/icons/Info';
import React from 'react';
import StaticOnIcon from 'catamaran/icons/StaticOn';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiToggleButton-root': {
      padding: '8px',
      paddingLeft: '28px'
    }
  }
}));

type Props = {
  branchCount: number;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
};

function AllBranchesOptionCard(props: Props) {
  const classes = useStyles();
  const { branchCount, className, onClick, selected } = props;

  const { t } = useTranslation();

  return (
    <CatToggleCard
      className={clsx(classes.root, className)}
      onClick={onClick}
      selected
      style={{ height: 56, width: 410 }}
    >
      <Box alignItems="center" flex height="100%" width="100%">
        <Box flex flexDirection="column" flexGrow={1} height="100%" justifyContent="space-between">
          <Typography variant="body1">
            <Trans components={{ bold: <b /> }} i18nKey="users.branches.authorize_all" t={t} />{' '}
            {t(`users.branches.${selected ? 'dynamic' : 'static'}`)}
          </Typography>
          <Box alignItems="center" flex>
            <BranchIcon fontSize="small" />
            <CatToggleCardChip reverseColors size="small" text={branchCount} />
          </Box>
        </Box>
        <Tooltip arrow title={t('users.branches.authorize_all_tooltip')}>
          <div>
            <InfoIcon
              alwaysHovered
              fontSize="small"
              style={{
                backgroundColor: 'rgba(73, 73, 73, 0.1)'
              }}
            />
          </div>
        </Tooltip>
        <Box mx={1}>
          <CatSwitch checked={selected} />
        </Box>
        {selected ? <DynamicOnIcon fontSize="small" /> : <StaticOnIcon fontSize="small" />}
      </Box>
    </CatToggleCard>
  );
}

export default AllBranchesOptionCard;
