import { ASSET_DETAIL } from 'routes/constant-route';
import { Box, CatChip } from 'catamaran/core';
import { Divider, Theme, Toolbar, makeStyles } from 'catamaran/core/mui';
import { Route } from '../RoutingButtons';
import { isMacOs } from 'react-device-detect';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AssetSearchModal from './Search/AssetSearchModal';
import RoutingButtons from 'components/RoutingButtons';
import SearchIcon from 'catamaran/icons/Search';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: 'auto'
  },
  toolbar: {
    backgroundColor: `${theme.palette.lightGrey.main}`,
    borderBottom: `1px solid ${theme.palette.darkGrey[100]}`,
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      minHeight: '56px'
    }
  }
}));

type Props = {
  assetSearchDialogOpen?: boolean;
  toggleAssetSearchDialog?: (status?: boolean) => void;
  className?: string;
  routes?: Route[];
};

function TopBar(props: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const { assetSearchDialogOpen, className, routes, toggleAssetSearchDialog, ...rest } = props;

  const handleKeydown = useCallback(
    (e: any) => {
      if (e.code === 'KeyF' && e.altKey) {
        toggleAssetSearchDialog(true);
        e.preventDefault();
      }
    },
    [toggleAssetSearchDialog]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  const openSearchModal = () => {
    toggleAssetSearchDialog();
  };

  const onAssetSelect = async (assetId: string) => {
    history.push(ASSET_DETAIL.replace(':id', assetId));
    toggleAssetSearchDialog();
  };

  return (
    <>
      <Box {...rest} className={clsx(classes.root, className)}>
        <Toolbar className={classes.toolbar} disableGutters>
          <div className="flex">
            <div className="flex align-items-center">
              <CatChip
                color="blue"
                icon={<SearchIcon color="blue" contained={false} hoverable={false} />}
                label={
                  <div className="flex align-items-center">
                    {t('layout.content_layout.search.search')}
                    <CatChip
                      className="ml8 cursor-pointer"
                      color="darkGrey"
                      label={isMacOs ? 'opt + F' : 'Alt + F'}
                      size="small"
                    />
                  </div>
                }
                onClick={openSearchModal}
                sx={{
                  '& .MuiChip-labelMedium': {
                    paddingRight: '4px'
                  }
                }}
                variant="outlined"
              />
            </div>
            <div className="flex mx8 my8">
              <Divider flexItem orientation="vertical" />
            </div>
            {routes && <RoutingButtons routes={routes} />}
          </div>
        </Toolbar>
      </Box>
      <AssetSearchModal
        onAssetSelect={onAssetSelect}
        onClose={() => toggleAssetSearchDialog()}
        open={assetSearchDialogOpen}
      />
    </>
  );
}

export default TopBar;
