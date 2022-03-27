import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import {
  clearCheckedLocationIds,
  clearExpandedLocationIds
} from 'store/slices/asset/locations/slice';
import { selectExpandedLocationIds } from 'store/slices/asset/locations/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import LocationGroup, { LocationGroupProps } from './LocationGroup/LocationGroup';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: theme.spacing(2)
  },
  gridItem: {
    marginRight: theme.spacing(1)
  },
  root: {
    '& >div': {
      paddingLeft: 1,
      paddingRight: 1
    }
  }
}));

type Props = LocationGroupProps & {
  className?: string;
  branchId: string;
  justifyContent: 'flex-start' | 'center';
};

function LocationManagement(props: Props) {
  const classes = useStyles();
  const { className, branchId, justifyContent, ...rest } = props;

  const expandedLocationIds = useTypedSelector(selectExpandedLocationIds);
  const dispatch = useTypedDispatch();

  const scrollContainerRef = React.useRef(null);

  const scrollToRight = React.useCallback(() => {
    (scrollContainerRef.current as any).scrollToRight();
  }, []);

  React.useEffect(
    () => () => {
      dispatch(clearExpandedLocationIds());
      dispatch(clearCheckedLocationIds());
    },
    [dispatch]
  );

  React.useEffect(() => {
    // Scroll right by default
    scrollToRight();
  }, [scrollToRight]);

  return (
    <Scrollbars
      autoHeight
      autoHeightMax={Number.MAX_VALUE}
      autoHide
      className={clsx(classes.root, className)}
      hideTracksWhenNotNeeded
      ref={scrollContainerRef}
    >
      <Grid
        className={classes.container}
        container
        justifyContent={expandedLocationIds.length > 3 ? 'flex-start' : justifyContent}
        wrap="nowrap"
      >
        {expandedLocationIds.map((parentLocationId, index) => (
          <Grid className={classes.gridItem} key={parentLocationId}>
            <LocationGroup
              branchId={branchId}
              level={index}
              onExpand={scrollToRight}
              parentLocationId={parentLocationId}
              {...rest}
            />
          </Grid>
        ))}
      </Grid>
    </Scrollbars>
  );
}

export default LocationManagement;
