import { Box, CatToggleCard, CatToggleCardCheckbox } from 'catamaran/core';
import { Theme, Tooltip, Typography, makeStyles } from 'catamaran/core/mui';
import { selectMainCategoryById } from 'store/slices/session';
import { useTypedSelector } from 'hooks/useTypedSelector';
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
  categoryId?: string;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
};

function CategoryCard(props: Props) {
  const classes = useStyles();
  const { categoryId, className, onClick, selected } = props;

  const category = useTypedSelector((state) => selectMainCategoryById(state, categoryId));

  if (!category) {
    return null;
  }

  return (
    <CatToggleCard
      className={clsx(classes.root, className)}
      onClick={onClick}
      selected={selected}
      style={{ height: 56, width: 197 }}
    >
      <Box alignItems="center" flex height="100%" width="100%">
        <CatToggleCardCheckbox checked={selected} />
        <Box alignItems="space-between" flex flexDirection="column" maxWidth="160px" ml={1}>
          <Tooltip enterDelay={1000} enterNextDelay={1000} title={category.name}>
            <Typography
              noWrap
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              variant="body1"
            >
              {category.name}
            </Typography>
          </Tooltip>
          {category.code && (
            <>
              <Box height="8px" />
              <Typography variant="caption">{category.code}</Typography>
            </>
          )}
        </Box>
      </Box>
    </CatToggleCard>
  );
}

export default CategoryCard;
