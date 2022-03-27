import { Box } from 'catamaran/core';
import { Grid, Skeleton, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Person, getPersonsByIds } from 'store/slices/persons';
import { getNotifyPersonIds, saveNotifyPersonIds } from 'store/slices/plans/actions';
import { selectInitialNotifyPersonIds, selectNotifyPersonIds } from 'store/slices/plans/selectors';
import { updateNotifyPersonIds } from 'store/slices/plans/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import EditMode from './Edit/EditMode';
import NotificationIcon from 'catamaran/icons/Notification';
import React, { useCallback, useEffect, useMemo } from 'react';
import ReadonlyMode from './Readonly/ReadonlyMode';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  disabled: {
    opacity: 0.3,
    pointerEvents: 'none'
  },
  root: {
    padding: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
  planId?: string;
  disabled: boolean;
  isActive: boolean;
  onActivate: (active: boolean) => void;
};

function NotifiedPersons(props: Props) {
  const classes = useStyles();
  const { className, disabled, planId, isActive, onActivate } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [notifyPersonIdsLoading, notifyPersonIdsLoadingDispatch] = useLoading<string[]>();
  const [readonlyNotifyPersonsLoading, readonlyNotifyPersonsLoadingDispatch] =
    useLoading<Person[]>();

  const readonlyNotifyPersonIds = useTypedSelector(selectInitialNotifyPersonIds);
  const editNotifyPersonIds = useTypedSelector(selectNotifyPersonIds);

  const mode = useMemo(() => {
    const isNullOrEmpty =
      !readonlyNotifyPersonIds ||
      readonlyNotifyPersonIds.length === 0 ||
      readonlyNotifyPersonIds.some((i) => i === undefined);

    return isNullOrEmpty ? 'add' : 'edit';
  }, [readonlyNotifyPersonIds]);

  useEffect(() => {
    if (planId) {
      notifyPersonIdsLoadingDispatch(getNotifyPersonIds(planId));
    }
  }, [notifyPersonIdsLoadingDispatch, planId]);

  useEffect(() => {
    const fetchNotifyPersons = async () => {
      if (readonlyNotifyPersonIds) {
        await readonlyNotifyPersonsLoadingDispatch(getPersonsByIds(readonlyNotifyPersonIds));
      }
    };
    fetchNotifyPersons();
  }, [readonlyNotifyPersonIds, readonlyNotifyPersonsLoadingDispatch]);

  const handleEdit = () => onActivate(true);
  const handleGoBack = () => onActivate(false);

  const handleCancel = useCallback(() => {
    dispatch(updateNotifyPersonIds(readonlyNotifyPersonIds));
  }, [dispatch, readonlyNotifyPersonIds]);

  const handleSave = useCallback(
    async (personIds: string[]) => {
      const finalPersonIds = await dispatch(saveNotifyPersonIds(planId, personIds));
      return finalPersonIds;
    },
    [dispatch, planId]
  );

  let componentContent = null;
  if (notifyPersonIdsLoading || readonlyNotifyPersonsLoading) {
    componentContent = (
      <Box>
        <Box borderRadius="3px" mb={2}>
          <Skeleton height="20px" variant="rectangular" width="450px" />
        </Box>
        <Box borderRadius="8px">
          <Skeleton height="20px" variant="rectangular" width="120px" />
        </Box>
      </Box>
    );
  } else if (isActive) {
    componentContent = (
      <EditMode
        editNotifyPersonIds={editNotifyPersonIds}
        initialNotifyPersonIds={readonlyNotifyPersonIds}
        mode={mode}
        onCancel={handleCancel}
        onGoBack={handleGoBack}
        onSave={handleSave}
      />
    );
  } else {
    componentContent = (
      <ReadonlyMode
        mode={mode}
        notifyPersonIds={readonlyNotifyPersonIds}
        onEditClick={handleEdit}
      />
    );
  }

  return (
    <Grid
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [classes.disabled]: disabled
      })}
      container
      direction="row"
    >
      <Grid alignItems="center" container direction="row">
        <NotificationIcon
          color="darkGrey"
          contained={false}
          hoverable={false}
          style={{ marginLeft: '8px', opacity: '80%' }}
        />
        <Grid item>
          <Box ml={2}>
            <Typography className="opacity-8" variant="subtitle1">
              {t('plans.edit.notify_person_header')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box ml={5} width="100%">
        {componentContent}
      </Box>
    </Grid>
  );
}

export default NotifiedPersons;
