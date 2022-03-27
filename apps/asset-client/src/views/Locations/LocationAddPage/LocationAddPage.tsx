import {
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Theme,
  Typography,
  makeStyles
} from 'catamaran/core/mui';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { dequal } from 'dequal';
import {
  getBranchLocationCodeType,
  getLocationById,
  saveLocation,
  updateLocation
} from 'store/slices/location/locations/actions';
import { getLocationLevels } from 'store/slices/location/locationLevels/actions';
import {
  selectBranchLocationCodeType,
  selectDraftLocation
} from 'store/slices/location/locations/selectors';
import { selectLocationLevelById } from 'store/slices/location/locationLevels/selectors';
import { setDraftLocation } from 'store/slices/location/locations/slice';
import { useEffect, useMemo, useState } from 'react';
import { useFormState, useTypedDispatch, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import BottomBar from 'components/BottomBar';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import LocationCodeField from './LocationCodeField';
import LocationParentDisplay from './LocationParentsDisplay';
import LocationTitleField from './LocationTitleField';
import StyledValidatedTextField from 'components/StyledValidatedTextField';
import locationValidator from 'helpers/validations/LocationValidator';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  bottomBar: {
    marginTop: theme.spacing(5),
    width: '100%'
  },
  header: {
    marginBottom: theme.spacing(1)
  },
  paper: {
    borderRadius: theme.spacing(2),
    height: '240px',
    padding: theme.spacing(2, 3)
  }
}));

interface MatchParams {
  parentLocationId: string;
  branchId: string;
  locationLevelId: string;
  locationId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

function LocationAddPage(props: Props) {
  const classes = useStyles();
  const { match } = props;

  const { branchId, locationId, locationLevelId, parentLocationId } = match.params;

  const correctedParentLocationId =
    parentLocationId && parentLocationId !== 'null' ? parentLocationId : undefined;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const history = useHistory();
  const [nameValid, setNameValid] = useState(true);
  const [codeValid, setCodeValid] = useState(true);
  const [locationLoading, locationLoadingDispatch] = useLoading();

  const location = useTypedSelector((state) => selectDraftLocation(state));
  const formHelper = useFormState(location, locationValidator);

  const [saveLoading, saveLoadingDispatch] = useLoading();
  useEffect(() => {
    const fetchLocation = async () => {
      if (locationId && locationId !== location.id?.toString()) {
        const existingLocation = await locationLoadingDispatch(getLocationById(locationId));
        formHelper.reset(existingLocation);
      } else if (!locationId && branchId !== location.branchId?.toString()) {
        const newLocation = {
          branchId,
          locationLevelId,
          parentLocationId: correctedParentLocationId
        };

        dispatch(setDraftLocation(newLocation));
        formHelper.reset(newLocation);
      }
    };
    if (!saveLoading) {
      fetchLocation();
    }
  }, [
    branchId,
    dispatch,
    formHelper,
    location,
    locationId,
    locationLevelId,
    locationLoadingDispatch,
    correctedParentLocationId,
    saveLoading
  ]);

  const branchLocationCodeType = useTypedSelector(selectBranchLocationCodeType);
  const [autoCode, setAutoCode] = useState<boolean>();

  useEffect(() => {
    const getIsBranchAutoCode = async () => {
      const newCodeType = await dispatch(getBranchLocationCodeType(branchId));
      setAutoCode(newCodeType.isAutoCode);
    };

    if (branchLocationCodeType?.branchId === branchId) {
      setAutoCode(branchLocationCodeType.isAutoCode);
    } else {
      getIsBranchAutoCode();
    }
  }, [branchId, branchLocationCodeType, dispatch]);

  const locationLevel = useTypedSelector((state) =>
    selectLocationLevelById(state, locationLevelId)
  );

  useEffect(() => {
    if (!locationLevel) {
      dispatch(getLocationLevels(branchId));
    }
  }, [branchId, dispatch, locationLevel]);

  const handleConfirm = async () => {
    const newLocation = formHelper.formState.values;
    if (locationId) {
      await saveLoadingDispatch(updateLocation(newLocation));
    } else {
      await saveLoadingDispatch(saveLocation(newLocation));
    }
    history.push('/locations');
  };

  const hasFormChanged = useMemo(
    () => dequal(formHelper.formState.values, location),
    [formHelper.formState.values, location]
  );

  if (autoCode === null || !locationLevel || !location) {
    return null;
  }

  return (
    <ContentLayout pageHeader={t('locations.title')} pageTitle={t('locations.title')}>
      <Paper className={classes.paper}>
        {!locationLoading ? (
          <>
            <Grid className={classes.header} container>
              <Typography align="center" variant="h2">
                {!locationId
                  ? t('locations.location_add.title', { levelName: locationLevel.name })
                  : t('locations.location_add.title_edit')}
              </Typography>
            </Grid>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <LocationCodeField
                  branchId={branchId}
                  defaultValue={location.locationCode}
                  formHelper={formHelper}
                  isAutoCode={autoCode}
                  onValidityChanged={setCodeValid}
                />
              </Grid>
              <Grid item xs={4}>
                <LocationTitleField
                  branchId={branchId}
                  defaultValue={location.name}
                  formHelper={formHelper}
                  onValidityChanged={setNameValid}
                  parentLocationId={correctedParentLocationId}
                />
              </Grid>
              <Grid item xs={4}>
                <StyledValidatedTextField
                  disabled
                  formHelper={formHelper}
                  label={t('locations.location_add.id_field')}
                  margin="dense"
                  name="id"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <StyledValidatedTextField
                  formHelper={formHelper}
                  label={t('locations.location_add.area_field')}
                  margin="dense"
                  name="area"
                  size="medium"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8}>
                <StyledValidatedTextField
                  formHelper={formHelper}
                  label={t('locations.location_add.description_field')}
                  margin="dense"
                  name="description"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid alignContent="center" container item xs={6}>
                <LocationParentDisplay locationId={correctedParentLocationId} />
              </Grid>
              <Grid item xs={6}>
                <StyledValidatedTextField
                  disabled
                  formHelper={formHelper}
                  label={t('locations.location_add.location_group_field')}
                  margin="dense"
                  name="locationGroup"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid alignItems="center" container direction="column" justifyContent="center">
            <CircularProgress />
          </Grid>
        )}
      </Paper>
      <BottomBar
        className={classes.bottomBar}
        isConfirmDisabled={
          hasFormChanged ||
          !formHelper.formState.isValid ||
          !nameValid ||
          !codeValid ||
          locationLoading
        }
        onConfirm={handleConfirm}
        onGoBack={() => history.push('/locations')}
      />
    </ContentLayout>
  );
}

export default LocationAddPage;
