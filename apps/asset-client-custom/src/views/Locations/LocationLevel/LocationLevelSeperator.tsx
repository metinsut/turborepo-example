import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import BlankLocationLevel from './BlankLocationLevel';
import LocationLevelAddButton from './LocationLevelAddButton';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  blankGridItem: {
    margin: theme.spacing(0, 2)
  },
  root: {}
}));

type Props = {
  className?: string;
  onAddLevelClick?: (index: number) => void;
  onApprove?: () => void;
  onCancel?: () => void;
  parentLocationLevelId?: string;
  selectedButtonIndex?: number;
  seperatorIndex?: number;
};

function LocationLevelSeperator(props: Props) {
  const classes = useStyles();
  const {
    className,
    onAddLevelClick,
    onApprove,
    onCancel,
    parentLocationLevelId,
    selectedButtonIndex,
    seperatorIndex
  } = props;

  return (
    <div className={clsx(classes.root, className)}>
      {selectedButtonIndex === seperatorIndex ? (
        <Grid className={classes.blankGridItem} item key={`${seperatorIndex} blank level`}>
          <BlankLocationLevel
            onApprove={onApprove}
            onCancel={onCancel}
            parentLocationLevelId={parentLocationLevelId}
          />
        </Grid>
      ) : (
        <LocationLevelAddButton
          buttonIndex={seperatorIndex}
          disabled={selectedButtonIndex && selectedButtonIndex !== seperatorIndex}
          key="button"
          onButtonClick={onAddLevelClick}
        />
      )}
    </div>
  );
}

export default LocationLevelSeperator;
