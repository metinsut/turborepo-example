import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import {
  selectDisplayedChildLocationLevelId,
  selectDisplayedParentLocationLevelId
} from 'store/slices/location/locationLevels/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DisplayOnlyLocationLevel from './DisplayOnlyLocationLevel';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
  selectedLocationLevelId: string;
};

function DisplayOnlyLocationManagement(props: Props) {
  const classes = useStyles();
  const { className, selectedLocationLevelId } = props;

  const parentLocationLevelId = useTypedSelector((state) =>
    selectDisplayedParentLocationLevelId(state, selectedLocationLevelId)
  );
  const childLocationLevelId = useTypedSelector((state) =>
    selectDisplayedChildLocationLevelId(state, selectedLocationLevelId)
  );

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container justifyContent="space-around" wrap="nowrap">
        {parentLocationLevelId && (
          <DisplayOnlyLocationLevel locationLevelId={parentLocationLevelId} />
        )}
        <DisplayOnlyLocationLevel isSelectedToDelete locationLevelId={selectedLocationLevelId} />
        {childLocationLevelId && (
          <DisplayOnlyLocationLevel locationLevelId={childLocationLevelId} />
        )}
      </Grid>
    </div>
  );
}

export default DisplayOnlyLocationManagement;
