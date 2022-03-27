import { CatIconButton, CatMenuItem } from 'catamaran/core';
import { Divider, FormControl, Grid, Paper, Select, Theme, makeStyles } from 'catamaran/core/mui';
import { selectBranchLocationCodeType } from 'store/slices/location/locations/selectors';
import { updateBranchLocationCodeType } from 'store/slices/location/locations/actions';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ExportIcon from 'catamaran/icons/Export';
import FilterList from 'catamaran/icons/FilterList';
import FilterModal from './LocationFilter/FilterModal';
import ImportIcon from 'catamaran/icons/Import';
import LocationFilterBar from './LocationFilter/LocationFilterBar';
import ManualCodeIcon from 'catamaran/icons/ManualCode';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    margin: theme.spacing(1, 1, 1, 0)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
  icon: {
    width: '100%'
  },
  iconButton: {
    marginRight: theme.spacing(1)
  },
  iconContainer: {
    marginLeft: theme.spacing(3),
    width: '10%'
  },
  root: {
    borderRadius: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
};

function LocationTopBar(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const branchLocationCode = useTypedSelector(selectBranchLocationCodeType);
  const handleCodeChange = (e: any) => {
    const isAutoCode = e.target.value === 'autoCode';
    dispatch(
      updateBranchLocationCodeType({
        ...branchLocationCode,
        isAutoCode
      })
    );
  };

  return (
    <Paper className={clsx(classes.root, className)}>
      <FilterModal onClose={() => setFilterOpen(false)} open={filterOpen} />
      <Grid container>
        <Grid item xs={3}>
          <FormControl className={classes.formControl} variant="outlined">
            <Select
              onChange={handleCodeChange}
              value={branchLocationCode.isAutoCode ? 'autoCode' : 'manual'}
            >
              <CatMenuItem value="manual">{t('locations.code_dropdown_manual')}</CatMenuItem>
              <CatMenuItem value="autoCode">{t('locations.code_dropdown_automatic')}</CatMenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid alignContent="center" container item xs>
          <ManualCodeIcon
            className={classes.icon}
            containerClassName={classes.iconContainer}
            fontSize="large"
          />
        </Grid>
        <CatIconButton className={classes.iconButton} onClick={() => {}}>
          <ImportIcon color="blue" contained fontSize="medium" />
        </CatIconButton>
        <CatIconButton className={classes.iconButton} onClick={() => {}}>
          <ExportIcon color="blue" contained fontSize="medium" />
        </CatIconButton>
        <Divider className={classes.divider} flexItem orientation="vertical" />
        <CatIconButton className={classes.iconButton} onClick={() => setFilterOpen(true)}>
          <FilterList color="blue" fontSize="medium" />
        </CatIconButton>
      </Grid>
      <LocationFilterBar />
    </Paper>
  );
}

export default LocationTopBar;
