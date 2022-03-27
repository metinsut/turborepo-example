import { CatPanel, CatPanelContent, CatPanelHeader, CatTypography } from 'catamaran/core';
import { CircularProgress, Grid } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { clearOpenBreakdown } from 'store/slices/breakdown/open/slice';
import { initializePage, initializeReopenPage } from 'store/slices/breakdown/open/action';
import {
  selectAssetInfo,
  selectDraft,
  selectIsUserAuthorizedForAsset
} from 'store/slices/breakdown/open/selector';
import { useCallback, useEffect, useMemo } from 'react';
import {
  useDialogState,
  useFormState,
  usePageKeyboardActions,
  useTypedDispatch,
  useTypedSelector
} from 'hooks';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import AssetInformation from './AssetInformation/AssetInformation';
import CancelDialog from './CancelDialog';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import Location from './Location/Location';
import RevertIcon from 'catamaran/icons/Revert';
import SaveAction from './SaveAction';
import WhatIsWrongPanel from './WhatIsWrong/WhatIsWrongPanel';
import WhoIsHandleIt from './WhoIsHandleIt/WhoIsHandleIt';
import clsx from 'clsx';
import makeOpenBreakdownValidator from 'helpers/validations/Breakdown/OpenBreakdownValidator';
import styles from './Breakdowns.module.scss';
import useLoading from 'hooks/useLoading';

function OpenBreakdownPage() {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const history = useHistory();
  const query = useQuery();
  const assetId = query.get('assetId');
  const taskId = query.get('taskId');
  const assetInfo = useTypedSelector(selectAssetInfo);
  const isUserAuthorized = useTypedSelector(selectIsUserAuthorizedForAsset);
  const openBreakdown = useTypedSelector(selectDraft);

  const breakdownValidator = useMemo(
    () => makeOpenBreakdownValidator(isUserAuthorized),
    [isUserAuthorized]
  );

  const formHelper = useFormState(openBreakdown, breakdownValidator);

  const [initializeLoading, initializeLoadingDispatch] = useLoading<void>({
    initialState: true
  });

  useEffect(() => {
    if (assetId) {
      initializeLoadingDispatch(initializePage(assetId));
    } else {
      initializeLoadingDispatch(initializeReopenPage(taskId));
    }
  }, [assetId, initializeLoadingDispatch, taskId]);

  useEffect(() => {
    if (!assetInfo && !initializeLoading && isUserAuthorized) {
      history.push('/');
    }
  }, [assetInfo, initializeLoading, history, isUserAuthorized]);

  const { setFormState } = formHelper;
  useEffect(() => {
    if (!initializeLoading) {
      setFormState((prev) => ({
        ...prev,
        definition: openBreakdown.definition
      }));
    }
  }, [assetInfo, initializeLoading, openBreakdown.definition, setFormState]);

  useEffect(
    () => () => {
      dispatch(clearOpenBreakdown());
    },
    [dispatch]
  );

  const { isOpen: cancelDialogOpen, togglePopup: toggleCancelDialogOpen } = useDialogState();

  const handleCancelClick = useCallback(() => {
    toggleCancelDialogOpen(true);
  }, [toggleCancelDialogOpen]);

  usePageKeyboardActions({
    onEscape: handleCancelClick
  });

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('tasks.routes.tasks')
        },
        {
          text: t('tasks.breakdowns.open_breakdown.breakdown_order')
        }
      ]}
      pageHeader={t('tasks.breakdowns.open_breakdown.page_title')}
      pageTitle={t('tasks.breakdowns.open_breakdown.page_title')}
    >
      {!initializeLoading && assetInfo ? (
        <>
          {taskId && (
            <CatPanel className="flex mb8 align-items-center">
              <CatPanelHeader
                iconComponent={RevertIcon}
                title={<Trans i18nKey="tasks.breakdowns.open_breakdown.reopen_warning" t={t} />}
              />
              <CatPanelContent>
                <div className="flex align-items-center">
                  <InfoCautionIcon
                    className="m8 ml16 opacity-8"
                    color="darkGrey"
                    contained={false}
                    fontSize="small"
                    hoverable={false}
                  />
                  <CatTypography variant="body2">
                    {t('tasks.breakdowns.open_breakdown.reopen_info')}
                  </CatTypography>
                </div>
              </CatPanelContent>
            </CatPanel>
          )}
          <div className={clsx(styles.breakdown_page_wrapper, 'grid gap-8')}>
            <WhatIsWrongPanel
              branchId={assetInfo.branchId}
              formHelper={formHelper}
              isUserAuthorized={isUserAuthorized}
            />
            <Location branchId={assetInfo.branchId} locationId={openBreakdown.locationId} />
            <AssetInformation assetInfo={assetInfo} />
            {isUserAuthorized && <WhoIsHandleIt assetId={assetId} />}
          </div>
          <SaveAction formHelper={formHelper} isUserAuthorized={isUserAuthorized} />
          <CancelDialog onClose={() => toggleCancelDialogOpen(false)} open={cancelDialogOpen} />
        </>
      ) : (
        <Grid alignItems="center" container direction="column" justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </ContentLayout>
  );
}

export default OpenBreakdownPage;
