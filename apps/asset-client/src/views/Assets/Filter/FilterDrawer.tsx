import {
  Box,
  CatDrawer,
  CatIconButton,
  CatKeyboardButton,
  CatMenuItem,
  CatSelect,
  CatTypography,
  useLocalizationHelpers
} from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { changeSelectedFilter, updateActiveFilter } from 'store/slices/asset/filter/slice';
import {
  checkFilterDropdown,
  deleteSavedFilter,
  getSavedFilters
} from 'store/slices/asset/filter/actions';
import { getAppSettings } from 'utils/settings';
import {
  selectAllSavedFilters,
  selectDraftFilter,
  selectSavedFiltersById,
  selectSelectedFilterId
} from 'store/slices/asset/filter/selectors';
import { useDialogState, useTypedDispatch, useTypedSelector } from 'hooks';
import ContractsFilter from './Contracts/ContractsFilter';
import DefinitionsFilter from './Definitions/DefinitionsFilter';
import DeleteFilterDialog from './DeleteFilterDialog';
import FilterDrawerHeader from './FilterDrawerHeader';
import FilterIcon from 'catamaran/icons/Filter';
import InformationFilter from './Information/InformationFilter';
import React, { useCallback, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import TrashIcon from 'catamaran/icons/Trash';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    height: '16px',
    marginLeft: '16px',
    marginRight: '16px'
  },
  menuItem: {
    '& .MuiSvgIcon-root': {
      display: 'none'
    },
    '& div': {
      display: 'flex'
    },
    '&:hover': {
      '& .MuiSvgIcon-root': {
        display: 'flex'
      },
      '& div': {
        display: 'none'
      }
    },
    display: 'flex',
    justifyContent: 'space-between'
  },
  select: {
    '& :focus': {
      backgroundColor: '#F3F5F6'
    },
    backgroundColor: '#F3F5F6',
    width: '75%'
  },
  selectFilterEmpty: {
    visibility: 'hidden'
  },
  stickyBottom: {
    alignItems: 'center',
    borderRadius: '0px 0px 16px 16px',
    boxShadow: '0px -2px 4px 0px rgba(73, 73, 73, 0.15)',
    height: '64px',
    opacity: 0.9,
    padding: '12px 19px 12px 16px',
    width: '100%'
  }
}));

type Props = {
  className?: string;
  open: boolean;
  setDrawerOpen: (open: boolean) => void;
  toggleSaveFilter: () => void;
  saveFilterOpen: boolean;
};

function FilterDrawer(props: Props) {
  const classes = useStyles();
  const { className, open, setDrawerOpen, toggleSaveFilter, saveFilterOpen } = props;

  const draftFilter = useTypedSelector(selectDraftFilter);
  const savedFilters = useTypedSelector(selectAllSavedFilters);
  const selectedFilterId = useTypedSelector(selectSelectedFilterId);
  const selectedFilter = useTypedSelector((state) =>
    selectSavedFiltersById(state, selectedFilterId)
  );

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const { formatDate } = useLocalizationHelpers();

  useEffect(() => {
    dispatch(getSavedFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkFilterDropdown());
  }, [dispatch, draftFilter]);

  const handleFilter = () => {
    dispatch(updateActiveFilter());
    setDrawerOpen(!open);
  };

  const { enableDevelopmentFeatures } = getAppSettings();

  const handleFilterChange = (event: any) => {
    dispatch(changeSelectedFilter(event.target.value));
  };

  const getRenderValue = (value: string) => {
    let renderTag: string | React.ReactNode = '';
    if (value) {
      renderTag = selectedFilter.title;
    } else {
      renderTag =
        savedFilters.length > 0 ? (
          t('assets.assetFilter.saved_filters')
        ) : (
          <Trans
            components={{ i: <i /> }}
            i18nKey="assets.assetFilter.no_saved_filter_stored"
            t={t}
          />
        );
    }
    return renderTag;
  };

  const [deleteFilterId, setDeleteFilterId] = useState<string>(undefined);
  const { isOpen: isDeleteOpen, togglePopup: toggleDeletePopup } = useDialogState();

  const handleDeleteClick = (filterId: string) => {
    toggleDeletePopup(true);
    setDeleteFilterId(filterId);
  };

  const handleDeleteClose = () => {
    toggleDeletePopup(false);
    setDeleteFilterId(undefined);
  };

  const handleDeleteConfirm = useCallback(async () => {
    if (deleteFilterId) {
      await dispatch(deleteSavedFilter(deleteFilterId));
      setDeleteFilterId(undefined);
    }
  }, [dispatch, deleteFilterId]);

  return (
    <>
      <CatDrawer className={className} onClose={handleFilter} open={open}>
        <Box
          center
          flex
          flexDirection="column"
          style={{ height: 'calc(100vh - var(--page-space))' }}
        >
          <FilterDrawerHeader saveFilterOpen={saveFilterOpen} toggleSaveFilter={toggleSaveFilter} />
          <Scrollbars hideTracksWhenNotNeeded style={{ height: '100%', width: '100%' }}>
            <div className="grid">
              <InformationFilter drawerOpen={open} />
              <div className="divider-horizontal mx24" />
              <ContractsFilter drawerOpen={open} />
              <div className="divider-horizontal mx24" />
              <DefinitionsFilter drawerOpen={open} />
            </div>
          </Scrollbars>
          <Box className={classes.stickyBottom} flex>
            <CatSelect
              className={classes.select}
              disabled={!enableDevelopmentFeatures || savedFilters.length === 0}
              displayEmpty
              fullWidth
              onChange={handleFilterChange}
              renderValue={(value) => getRenderValue(value as string)}
              value={selectedFilterId ?? ''}
            >
              {savedFilters?.map((savedFilter) => (
                <CatMenuItem
                  className={classes.menuItem}
                  key={savedFilter.id}
                  value={savedFilter.id}
                >
                  {savedFilter.title}
                  <span style={{ display: 'flex' }}>
                    <Box center className="mr8 opacity-8" flex flexDirection="column">
                      <CatTypography className="text-7" variant="caption">
                        {savedFilter.fieldCount + t('assets.assetFilter.filter_fields')}
                      </CatTypography>
                      <CatTypography variant="caption">
                        {formatDate(savedFilter.createdDate)}
                      </CatTypography>
                    </Box>
                    <CatIconButton
                      className="mr8"
                      onClick={() => handleDeleteClick(savedFilter.id)}
                    >
                      <TrashIcon color="red" />
                    </CatIconButton>
                  </span>
                </CatMenuItem>
              ))}
            </CatSelect>
            <div className="divider-vertical" />
            <CatKeyboardButton
              color="blue"
              endIcon={<FilterIcon />}
              keyboardKey="enter"
              size="medium"
            >
              {t('assets.assetFilter.filter')}
            </CatKeyboardButton>
          </Box>
        </Box>
      </CatDrawer>
      <DeleteFilterDialog
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        open={isDeleteOpen}
      />
    </>
  );
}

export default FilterDrawer;
