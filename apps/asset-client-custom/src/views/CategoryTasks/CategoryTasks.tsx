import { Box, CatIconButton } from 'catamaran/core';
import { CircularProgress, Typography } from 'catamaran/core/mui';
import { ColumnTitle } from './components';
import { Trans, useTranslation } from 'react-i18next';
import {
  changeDateFilter,
  getCategoryTasks,
  removeInProgressTaskIds,
  selectDateFilter,
  selectDisplayedTaskIds,
  selectShowComplete,
  toggleShowComplete
} from 'store/slices/categoryTasks';
import { deleteInMemoryBrands } from 'store/slices/brands/actions';
import { deleteInMemoryCategories } from 'store/slices/categories/actions';
import { deleteInMemoryModels } from 'store/slices/models';
import { useEffect } from 'react';
import { useGetAllBrands } from 'views/Brands/Brands';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AssetsBranchButton from 'views/Assets/AssetsBranchButton';
import CategoryTaskFilterMenu from './CategoryTaskFilterMenu';
import CategoryTaskItem from './CategoryTaskItem';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import Info from 'catamaran/icons/Info';
import LighthouseOkIcon from 'catamaran/icons/LighthouseOk';
import PaperHeader from 'components/PaperHeader';
import useLoading from 'hooks/useLoading';

function CategoryTasks() {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [tasksLoading, tasksLoadingDispatch] = useLoading();

  const showComplete = useTypedSelector(selectShowComplete);
  const dateFilter = useTypedSelector(selectDateFilter);

  useGetAllBrands();

  useEffect(() => {
    tasksLoadingDispatch(getCategoryTasks(showComplete, dateFilter));
  }, [tasksLoadingDispatch, showComplete, dateFilter]);

  useEffect(
    () => () => {
      dispatch(deleteInMemoryCategories());
      dispatch(deleteInMemoryModels());
      dispatch(deleteInMemoryBrands());
      dispatch(removeInProgressTaskIds());
    },
    [dispatch]
  );

  const taskIds = useTypedSelector(selectDisplayedTaskIds);

  const handleChangeSelect = (event: any) => {
    dispatch(changeDateFilter(event.target.value));
  };

  const gridTemplate = '84px auto 200px 200px 84px';

  return (
    <ContentLayout
      branchSelector={<AssetsBranchButton disabled />}
      pageBreadcrumbs={[
        {
          text: t('categories.asset_configuration')
        },
        {
          text: t('categories.routes.category_tasks')
        }
      ]}
      pageHeader={t('categories.tasks.tasks_list_header')}
      pageTitle={t('categories.routes.category_tasks')}
    >
      <Box display="flex" flexDirection="column">
        <PaperHeader
          display="grid"
          fontWeight="700"
          px={0}
          style={{
            gridTemplateColumns: gridTemplate,
            height: 48
          }}
        >
          <ColumnTitle ml={2}>{t('categories.tasks.image_field')}</ColumnTitle>
          <ColumnTitle>{t('categories.tasks.category_field')}</ColumnTitle>
          <ColumnTitle width="200px">{t('categories.tasks.brand_field')}</ColumnTitle>
          <ColumnTitle width="200px">{t('categories.tasks.model_field')}</ColumnTitle>
          <Box display="flex" justifySelf="center">
            <Box alignSelf="center" mx={1}>
              <CategoryTaskFilterMenu
                intervalDateType={dateFilter}
                onIntervalDateTypeChange={handleChangeSelect}
                onShowCompletedChange={() => dispatch(toggleShowComplete())}
                showCompleted={showComplete}
              />
            </Box>
            <ColumnTitle
              alignItems="center"
              display="flex"
              height="16px"
              justifyContent="center"
              mr={2}
            >
              {/* todo: adding functionality to this button */}
              <CatIconButton>
                <Info color="blue" fontSize="medium" />
              </CatIconButton>
            </ColumnTitle>
          </Box>
        </PaperHeader>
        {taskIds.map((taskId) => (
          <CategoryTaskItem gridTemplate={gridTemplate} key={taskId} taskId={taskId} />
        ))}
        {tasksLoading && (
          <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
        {!tasksLoading && taskIds.length === 0 && (
          <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
            <LighthouseOkIcon style={{ fontSize: '72px' }} />
            <Box color="success.main" fontSize={24} fontWeight={700} mb={1.5} mt={2}>
              {t('categories.tasks.all_tasks_completed')}
            </Box>
            <Typography variant="body1">
              <Trans i18nKey="categories.tasks.no_tasks_remaining" t={t} />
            </Typography>
          </Box>
        )}
      </Box>
    </ContentLayout>
  );
}

export default CategoryTasks;
