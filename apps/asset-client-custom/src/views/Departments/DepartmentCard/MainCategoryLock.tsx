import { Box } from 'catamaran/core';
import { Theme, Tooltip, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import CategoryIcon from 'catamaran/icons/Category';
import LockIcon from 'catamaran/icons/Lock';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.lightGrey.main,
    borderRadius: theme.spacing(3),
    height: theme.spacing(2.5),
    width: 'fit-content'
  }
}));

type Props = {
  className?: string;
  showEditDisabledTooltip: boolean;
};

function MainCategoryLock(props: Props) {
  const classes = useStyles();
  const { className, showEditDisabledTooltip = false } = props;
  const { t } = useTranslation();

  return (
    <Tooltip
      arrow
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={showEditDisabledTooltip}
      placement="bottom"
      title={<Trans i18nKey="users.departments.edit.workType.main_category_locked" t={t} />}
    >
      <span>
        <Box
          alignItems="center"
          className={clsx(classes.root, className, 'noStyling')}
          flex
          justifyContent="space-between"
        >
          <Box pl="2px" pr="4px">
            <CategoryIcon color="darkGrey" fontSize="small" hoverable={false} />
          </Box>
          <Typography variant="caption">{t('categories.main.main_category_field')}</Typography>
          <Box pl="4px" pr="2px">
            <LockIcon color="red" fontSize="small" hoverable={false} />
          </Box>
        </Box>
      </span>
    </Tooltip>
  );
}

export default MainCategoryLock;
