import { CircularProgress } from 'catamaran/core/mui';
import { TASKLIST } from 'routes/constant-route';
import { clearDraft } from 'store/slices/breakdown/taskDetail/slice';
import { initializeTaskDetailPage } from 'store/slices/breakdown/taskDetail/action';
import { isObjectNullOrEmpty } from 'utils';
import { selectDraftTaskDetail } from 'store/slices/breakdown/taskDetail/selector';
import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLoading, usePageKeyboardActions, useTypedDispatch, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import AssetInformation from '../Common/AssetInformation/AssetInformation';
import AssignmentInformation from './AssignmentInformation/AssignmentInformation';
import BreakdownInformation from './BreakdownInformation/BreakdownInformation';
import CommitTaskPanel from './CommitTask/CommitTaskPanel';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import CostInformation from './Cost/CostInformation';
import DateTime from '../Common/DateTime/DateTime';
import PaperHeader from 'components/PaperHeader';
import RoutingButtons from 'components/RoutingButtons';
import StatusPanel from './Status/StatusPanel';
import StickyBottomBar from './StickyBottomBar';
import TypeOfBreakdown from './TypeOfBreakdown/TypeOfBreakdown';
import Updates from './Updates/Updates';
import clsx from 'clsx';
import styles from './Detail.module.scss';

interface MatchParams {
  taskId: string;
}

function TaskDetailPage() {
  const params: MatchParams = useParams();
  const { taskId } = params;

  const history = useHistory();

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [initializeLoading, initializeLoadingDispatch] = useLoading<void>({
    initialState: true
  });
  const draftTaskDetail = useTypedSelector(selectDraftTaskDetail);

  const handleInitializePage = useCallback(() => {
    if (taskId) {
      initializeLoadingDispatch(initializeTaskDetailPage(taskId));
    }
  }, [initializeLoadingDispatch, taskId]);

  useEffect(() => {
    handleInitializePage();
  }, [handleInitializePage]);

  useEffect(
    () => () => {
      dispatch(clearDraft());
    },
    [dispatch]
  );

  const handleGoBack = useCallback(async () => {
    history.push(TASKLIST);
  }, [history]);

  usePageKeyboardActions({
    onEscape: handleGoBack
  });

  const subRoutes = [
    {
      link: '.*',
      text: 'tasks.routes.asset_information'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.request_date_time_reminder'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.breakdown_information'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.date_time_reminder'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.assignment_information'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.type_of_breakdown'
    },
    {
      disabled: true,
      link: '#',
      text: 'tasks.routes.costs'
    }
  ];

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('tasks.routes.tasks')
        },
        {
          text: t('tasks.detail.breakdown_order')
        }
      ]}
      pageHeader={t('tasks.detail.page_title')}
      pageTitle={t('tasks.detail.page_title')}
    >
      {!initializeLoading && draftTaskDetail.assetInformation.id ? (
        <>
          <div className="grid flex-auto-flow-column ">
            <PaperHeader px={0.5}>
              <RoutingButtons routes={subRoutes} />
            </PaperHeader>
            <div className={clsx(styles.detail_page_wrapper, 'grid gap-8')}>
              {isObjectNullOrEmpty(draftTaskDetail.taskStatusInformation.responsiblePerson) ? (
                <CommitTaskPanel
                  onTaskCommitted={handleInitializePage}
                  taskId={draftTaskDetail.breakdownInformation.id}
                />
              ) : (
                <StatusPanel taskStatusInformation={draftTaskDetail.taskStatusInformation} />
              )}
              <AssetInformation assetInformation={draftTaskDetail.assetInformation} />
              <BreakdownInformation taskDetail={draftTaskDetail} />
              <AssignmentInformation />
              <TypeOfBreakdown />
              <CostInformation
                breakdownCosts={draftTaskDetail.breakdownInformation?.breakdownCosts}
                breakdownId={draftTaskDetail.breakdownInformation?.id}
                hasContract={!!draftTaskDetail.assetInformation.contract}
              />
              <DateTime requestDate={draftTaskDetail.breakdownInformation?.requestDate} />
              <Updates taskDetail={draftTaskDetail} />
            </div>
          </div>
          <StickyBottomBar />
        </>
      ) : (
        <div className="flex justify-content-center">
          <CircularProgress />
        </div>
      )}
    </ContentLayout>
  );
}

export default TaskDetailPage;
