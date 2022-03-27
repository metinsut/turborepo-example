import { Box, CatChip, CatTypography } from 'catamaran/core';
import { Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import SelectCounter from 'components/SelectCounter';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  bottomBar: {
    backgroundColor: 'white',
    borderRadius: '0 0 16px 16px',
    boxShadow: '0px -2px 2px 0px rgba(73, 73, 73, 0.1)',
    minHeight: '24px',
    opacity: 0.9,
    width: '100%'
  },
  root: {},
  totalCount: {
    opacity: 0.6
  }
}));

type Props = {
  className?: string;
  isAllSelected: boolean;
  total: number;
  checkedIdList: string[];
};

function AssetListBottomBar(props: Props) {
  const classes = useStyles();
  const { className, isAllSelected, total, checkedIdList } = props;
  const { t } = useTranslation();

  return (
    <Box center className={clsx(classes.bottomBar, className)} flex flexDirection="row">
      <Box center className={classes.totalCount} flex>
        <CatChip label={total.toString()} size="small" variant="outlined" />
        <Typography style={{ marginLeft: '8px' }} variant="body2">
          Total Items
        </Typography>
      </Box>
      {checkedIdList.length > 0 && (
        <>
          <span className="divider-vertical mx16" />
          <SelectCounter count={isAllSelected ? total : checkedIdList.length} size="small" />
          <CatTypography className="ml8" variant="body2">
            {t('common.selected')}
          </CatTypography>
        </>
      )}
    </Box>
  );
}

export default AssetListBottomBar;
