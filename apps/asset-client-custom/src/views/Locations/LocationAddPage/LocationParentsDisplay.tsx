import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { getLocationFullPath } from 'store/slices/location/locations/actions';
import { useTypedDispatch } from 'hooks';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  pathNode: {
    backgroundColor: 'rgba(49, 49, 49, 0.6)',
    borderRadius: theme.spacing(2),
    margin: theme.spacing(1),
    padding: theme.spacing(0.5, 1)
  },
  root: {
    backgroundColor: '#F3F5F6',
    borderRadius: theme.spacing(0.5),
    height: '34px',
    marginTop: theme.spacing(0.5),
    width: '100%'
  },
  text: {
    color: theme.palette.common.white
  }
}));

type Props = {
  className?: string;
  locationId: string;
};

function LocationParentsDisplay(props: Props) {
  const classes = useStyles();
  const { className, locationId } = props;
  const dispatch = useTypedDispatch();
  const [fullPath, setFullPath] = useState<string[]>();

  useEffect(() => {
    let isMounted = true;
    const getFullPath = async () => {
      const path = await dispatch(getLocationFullPath(locationId));
      if (isMounted) {
        setFullPath(path);
      }
    };

    if (locationId) {
      getFullPath();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, locationId]);

  return (
    <Grid alignItems="center" className={clsx(classes.root, className)} container direction="row">
      {fullPath &&
        fullPath.map((path, index) => [
          <Grid className={classes.pathNode} item key={path}>
            <Typography className={classes.text} variant="caption">
              {path}
            </Typography>
          </Grid>,
          fullPath.length > index + 1 && <ArrowRightIcon key={`${path}rightArrow`} />
        ])}
    </Grid>
  );
}

export default LocationParentsDisplay;
