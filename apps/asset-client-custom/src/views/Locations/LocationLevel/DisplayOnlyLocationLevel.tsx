import { Box, Divider, Grid, Paper, colors } from 'catamaran/core/mui';
import { CatIconButton } from 'catamaran/core';
import { selectDisplayedLocationIdsByLocationLevelId } from 'store/slices/location/locations/selectors';
import { selectLocationLevelById } from 'store/slices/location/locationLevels/selectors';
import { selectSearchResults } from 'store/slices/location/locationFilter/selectors';
import { temporaryLocationId } from 'store/slices/location/locationFilter/data';
import { useStyles } from '../styles';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DefaultLocationLevelHeader from './Header/Default';
import LocationItem from '../LocationItem';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';

type Props = {
  className?: string;
  isSelectedToDelete?: boolean;
  locationLevelId: string;
  showSearchResult?: boolean;
};

function DisplayOnlyLocationLevel(props: Props) {
  const classes = useStyles();
  const { className, isSelectedToDelete, locationLevelId, showSearchResult = false } = props;

  const locationLevel = useTypedSelector((state) =>
    selectLocationLevelById(state, locationLevelId)
  );

  const locationIds = useTypedSelector((state) =>
    selectDisplayedLocationIdsByLocationLevelId(state, locationLevelId)
  );

  const searchResults = useTypedSelector(selectSearchResults);

  return (
    <Paper
      className={clsx(classes.root, className)}
      style={{ borderColor: isSelectedToDelete ? colors.red[300] : colors.grey[300] }}
    >
      <Grid alignContent="space-between" container style={{ height: '100%' }}>
        <Grid item xs={12}>
          <DefaultLocationLevelHeader
            editVisible={false}
            locationLevel={locationLevel}
            searchVisible={false}
          />
          {!showSearchResult &&
            locationIds.map((id) => (
              <LocationItem
                className={classes.locationItem}
                deletable={false}
                editable={false}
                expandable
                id={id}
                key={id}
              />
            ))}
          {showSearchResult &&
            searchResults.map((result, index) => {
              const locationId = result.displayedIds[locationLevelId];
              const isSearchResult = result.resultLocationLevelId === locationLevelId;
              return (
                <>
                  {locationId ? (
                    <LocationItem
                      checkable={false}
                      className={classes.locationItem}
                      deletable={false}
                      editable={false}
                      expandable
                      expandButtonDisabled
                      id={locationId ?? temporaryLocationId}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${locationId}-${index}`}
                      searchModeActive
                      searchResult={isSearchResult}
                    />
                  ) : (
                    <Box
                      className={classes.emptyLocationItem}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`$empty-${index}`}
                    />
                  )}
                  <Divider
                    className={classes.searchResultBottomDivider}
                    style={{
                      visibility: locationId && !isSearchResult ? 'visible' : 'hidden'
                    }}
                  />
                </>
              );
            })}
          {isSelectedToDelete && (
            <Grid alignContent="center" container justifyContent="center">
              <CatIconButton className={classes.displayOnlyIcon} disabled>
                <TrashIcon color="red" contained fontSize="large" />
              </CatIconButton>
            </Grid>
          )}
        </Grid>
        <Grid className={classes.bottom} item xs={12}>
          <Box className={classes.divider} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default DisplayOnlyLocationLevel;
