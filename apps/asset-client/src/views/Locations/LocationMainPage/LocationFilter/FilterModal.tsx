import {
  Box,
  Card,
  Divider,
  Drawer,
  Grid,
  Theme,
  Typography,
  makeStyles
} from 'catamaran/core/mui';
import { CatButton, CatIconButton } from 'catamaran/core';
import { clearFilter, setActiveFilter } from 'store/slices/location/locationFilter/slice';
import { emptyFilter } from 'store/slices/location/locationFilter/data';
import { selectActiveFilter } from 'store/slices/location/locationFilter/selectors';
import { useFormState, useTypedDispatch, withDialogWrapper } from 'hooks';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import FilterList from 'catamaran/icons/FilterList';
import FilterTextWithCheckbox from './FilterTextWithCheckbox';
import LocationAreaFilter from './LoactionAreaFilter';
import LocationFilterList from './LocationFilterList';
import LocationLevelList from './LocationLevelList';
import React, { useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import StyledValidatedTextField from 'components/StyledValidatedTextField';
import _ from 'lodash';
import clsx from 'clsx';
import locationFilterValidator from 'helpers/validations/LocationFilterValidator';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: 'rgba(73, 73, 73, 0.2)',
    height: '1px',
    margin: theme.spacing(1)
  },
  drawer: {
    borderRadius: theme.spacing(2),
    height: '88vh',
    marginRight: theme.spacing(3),
    top: '10%',
    width: '35vw'
  },
  header: {
    height: '100%',
    padding: theme.spacing(2),
    width: '100%'
  },
  lineContainer: {
    alignItems: 'center',
    padding: theme.spacing(3, 3, 3, 2)
  },
  root: {
    display: 'grid',
    justify: 'center'
  },
  title: {
    color: '#494949',
    marginLeft: theme.spacing(1),
    opacity: '0.6'
  },
  triple: {
    padding: theme.spacing(0, 1)
  }
}));

type Props = {
  className?: string;
  onClose: () => void;
  open: boolean;
};

function FilterModal(props: Props) {
  const classes = useStyles();
  const { className, onClose, open } = props;
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const activeLocationFilter = useTypedSelector(selectActiveFilter);
  const formHelper = useFormState(activeLocationFilter, locationFilterValidator);

  const filterButtonDisabled = useMemo(
    () =>
      _.isEqualWith(formHelper.formState.values, activeLocationFilter, (firstVal, secVal) =>
        !firstVal && !secVal ? true : undefined
      ),
    [activeLocationFilter, formHelper.formState.values]
  );

  const handleFilterConfirm = () => {
    const filter = formHelper.formState.values;
    dispatch(setActiveFilter(filter));
    onClose();
  };

  const handleFilterClear = () => {
    dispatch(clearFilter());
    formHelper.reset(emptyFilter);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.drawer }}
      className={clsx(classes.root, className)}
      onClose={onClose}
      open={open}
    >
      <Grid container>
        <Card className={classes.header}>
          <Grid container>
            <FilterList fontSize="medium" />
            <Typography className={classes.title} variant="h2">
              {t('locations.locationFilter.title')}
            </Typography>
            <Grid item xs />
            <CatIconButton onClick={handleFilterClear}>
              <FilterCancelIcon color="red" fontSize="medium" />
            </CatIconButton>
          </Grid>
        </Card>
      </Grid>
      <Scrollbars style={{ height: '100%', width: '100%' }}>
        <FilterTextWithCheckbox
          checkboxLabel="locations.locationFilter.no_location_title"
          checkboxName="hasNoLocationName"
          formHelper={formHelper}
          textFieldLabel={t('locations.locationFilter.location_title_field')}
          textFieldName="locationName"
        />
        <Box className={classes.divider} />
        <FilterTextWithCheckbox
          checkboxLabel="locations.locationFilter.no_location_code"
          checkboxName="hasNoLocationCode"
          formHelper={formHelper}
          textFieldLabel={t('locations.locationFilter.location_code_field')}
          textFieldName="locationCode"
        />
        <Box className={classes.divider} />
        <FilterTextWithCheckbox
          checkboxLabel="locations.locationFilter.no_tag_id"
          checkboxName="hasNoTagIdentity"
          formHelper={formHelper}
          textFieldLabel={t('locations.locationFilter.tag_id_field')}
          textFieldName="tagIdentity"
        />
        <Box className={classes.divider} />
        <LocationLevelList formHelper={formHelper} />
        <Box className={classes.divider} />
        <LocationAreaFilter formHelper={formHelper} />
        <Box className={classes.divider} />
        <Grid className={classes.lineContainer} container>
          <Grid item xs>
            <StyledValidatedTextField
              disabled
              formHelper={formHelper}
              label={t('locations.locationFilter.location_group')}
              margin="dense"
              name="locationGroup"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Scrollbars>
      <Grid container>
        <Card className={classes.header}>
          <Grid alignItems="center" container>
            <Grid item xs>
              <LocationFilterList formHelper={formHelper} />
            </Grid>
            <Divider flexItem orientation="vertical" style={{ margin: '0px 16px' }} />
            <CatButton
              color="blue"
              disabled={filterButtonDisabled}
              endIcon={<FilterList />}
              onClick={handleFilterConfirm}
            >
              {t('locations.locationFilter.title')}
            </CatButton>
          </Grid>
        </Card>
      </Grid>
    </Drawer>
  );
}

export default withDialogWrapper(FilterModal);
