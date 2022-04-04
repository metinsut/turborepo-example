import { AppThunk } from 'RootTypes';
import { Goal, GoalForm, GoalLimitType, Metric } from './type';
import { METRICSCONFIGURATION_LIST } from 'routes/constant-route';
import { MetricStatus, WorkType } from 'store/slices/common/types';
import { apiCaller } from 'store/common';
import { availableStatusesUpdated, goalAdded, goalFormCreated, metricLoaded } from './slice';
import { defaultGoalForm, limitTypes } from './data';
import { history } from 'utils/history';
import { isArrayNullOrEmpty } from 'utils';
import { selectDraftMetric } from './selectors';
import { showUpdateSuccessSnackbar } from 'store/slices/application';
import axios from 'utils/axiosUtils';

const initializeMetricDetailPage =
  (metricTypeId: string): AppThunk =>
  async (dispatch) => {
    try {
      await dispatch(getMetricDetail(metricTypeId));
      const goalFormPromise = dispatch(getGoalForm());

      await Promise.all([goalFormPromise]);
    } catch (error) {
      history.push(METRICSCONFIGURATION_LIST);
    }
  };

const getMetricDetail =
  (metricTypeId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<Metric>(`registration/assetmetrics/${metricTypeId}`);
    const metric = await dispatch(apiCaller(requestBuilder));
    dispatch(metricLoaded(metric));
  };

const getGoalForm = (): AppThunk => async (dispatch, getState) => {
  const currentState = getState();
  const metric = selectDraftMetric(currentState);
  const goalForm = createGoalFormForMetric(metric);

  dispatch(goalFormCreated(goalForm));
};

const createGoalFormForMetric = (metric: Metric): GoalForm => {
  const goalForm: GoalForm = {
    ...defaultGoalForm
  };

  if (metric.goals && metric.goals.length > 0) {
    const orderedGoals: Goal[] = [
      ...metric.goals.filter((goal) => isArrayNullOrEmpty(goal.categoryIds)),
      ...metric.goals.filter((goal) => !isArrayNullOrEmpty(goal.categoryIds))
    ];

    goalForm.type = orderedGoals[0].limitType;
    limitTypes.forEach((type) => {
      const goalsOfType = orderedGoals.filter((goal) => goal.limitType === type);
      if (goalsOfType.length !== 0) {
        goalForm[type] = goalsOfType;
      }
    });
  }

  return goalForm;
};

const updateMetric = (): AppThunk => async (dispatch, getState) => {
  const currentState = getState();
  const metric = selectDraftMetric(currentState);

  const goalsToSave: Goal[] = metric.goalForm[metric.goalForm.type].map((goal, index) => ({
    ...goal,
    categoryGroupNo: index
  }));

  const metricToSave: Metric = {
    ...metric,
    goals: goalsToSave
  };

  delete metricToSave.goalForm;

  const requestBuilder = () =>
    axios.put<Metric>(`registration/assetmetrics/${metric.id}`, metricToSave);

  await dispatch(apiCaller(requestBuilder));

  dispatch(showUpdateSuccessSnackbar());
};

const addMetricGoal =
  (limitType: GoalLimitType): AppThunk =>
  async (dispatch) => {
    const defaultGoals = defaultGoalForm[limitType];
    dispatch(
      goalAdded({
        goal: { ...defaultGoals[0] },
        limitType
      })
    );
  };

const getStatuses =
  (workType: WorkType, mainCategoryId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<MetricStatus[]>(
        `registration/taskstatuses/filter?workType=${workType}&mainCategoryId=${mainCategoryId}`
      );
    const taskStatuses = await dispatch(apiCaller(requestBuilder));
    dispatch(availableStatusesUpdated({ statuses: taskStatuses, workType }));
  };

export { initializeMetricDetailPage, addMetricGoal, getStatuses, updateMetric };
