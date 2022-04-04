import { Box, CatToggleCard, CatToggleCardCheckbox, CatToggleCardChip } from 'catamaran/core';
import { CheckboxState } from 'store/common';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { selectBranchById } from 'store/slices/branches';
import { useTypedSelector } from 'hooks/useTypedSelector';
import PersonIcon from 'catamaran/icons/Person';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiToggleButton-root': {
      padding: '8px'
    }
  }
}));

type Props = {
  branchId?: string;
  className?: string;
  onClick?: () => void;
  selectAll?: boolean;
  selected?: CheckboxState;
  userCount?: number;
};

function BranchCard(props: Props) {
  const classes = useStyles();
  const { branchId, className, onClick, selectAll, selected, userCount } = props;

  const { t } = useTranslation();
  const branch = useTypedSelector((state) => selectBranchById(state, branchId));

  if (!selectAll && !branch) {
    return null;
  }

  const content = selectAll ? (
    <Box flex ml={1}>
      <Typography variant="body1">
        {selected === true ? (
          <Trans components={{ bold: <b /> }} i18nKey="common.all_selected" t={t} />
        ) : (
          t('common.select_all')
        )}
      </Typography>
    </Box>
  ) : (
    <Box flex flexDirection="column" ml={1}>
      <Typography variant="body1">{branch.name}</Typography>
      <Box alignItems="center" flex>
        <PersonIcon fontSize="small" />
        <CatToggleCardChip reverseColors={selected === true} size="small" text={userCount} />
      </Box>
    </Box>
  );

  return (
    <CatToggleCard
      className={clsx(classes.root, className)}
      onClick={onClick}
      selected={selected === true}
      style={{ height: 56, width: 197 }}
    >
      <Box alignItems="center" flex height="100%" width="100%">
        <CatToggleCardCheckbox
          checked={selected === true}
          indeterminate={selected === 'indeterminate'}
        />
        {content}
      </Box>
    </CatToggleCard>
  );
}

export default BranchCard;
