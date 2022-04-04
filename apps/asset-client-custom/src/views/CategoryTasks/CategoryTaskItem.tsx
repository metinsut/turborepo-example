import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatIconButton,
  CatTypography,
  useLocalizationHelpers
} from 'catamaran/core';
import { Brand } from 'store/slices/brands/types';
import { ColumnTitle } from './components';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { Divider, Paper, styled } from 'catamaran/core/mui';
import { Model, addModel, getModelsForBrand, selectSearchModels } from 'store/slices/models';
import { Trans, useTranslation } from 'react-i18next';
import { addBrand } from 'store/slices/brands/actions';
import {
  approveCategoryTask,
  checkAssetCountOfCategoryTask,
  rejectCategoryTask,
  selectCategoryTaskById,
  selectTaskIsEnabled,
  updateTask
} from 'store/slices/categoryTasks';
import { changePhoto, deletePhoto, imageSelectorReducer, initialState } from './taskImageReducer';
import { selectAllBrands } from 'store/slices/brands/selectors';
import { useCallback, useReducer, useState } from 'react';
import { useDialogState, useTypedDispatch, useTypedSelector } from 'hooks';
import BrandItem from 'views/Brands/BrandItem';
import CategorySelectorItem from './CategorySelectorItem';
import CheckIcon from 'catamaran/icons/Check';
import ImageSelectorButton from 'components/ImageSelector/ImageSelectorButton';
import ModelItem from 'views/Models/ModelItem';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const DateInfo = styled('div')(({ theme }) => ({
  color: theme.palette.darkGrey.main,
  fontSize: '9px',
  gridColumn: '-1 / -3',
  opacity: '0.7',
  paddingRight: theme.spacing(2),
  textAlign: 'right'
}));

const CreatedByInfo = styled('div')(({ theme }) => ({
  color: theme.palette.darkGrey.main,
  display: 'flex',
  fontSize: '11px',
  gridColumn: '1 / 3',
  opacity: '0.7',
  paddingLeft: theme.spacing(1),
  span: {
    fontSize: '9px'
  },
  textAlign: 'left'
}));

const StyledCategorySelectorItem = styled(CategorySelectorItem)(() => ({
  '.MuiGrid-item > div': {
    paddingBottom: '1.2px',
    paddingTop: '1.2px'
  },
  '.MuiTypography-body1': {
    fontSize: '9px'
  },
  height: '40px',
  padding: '6px',
  width: '100%'
}));

const StyledBrandItem = styled(BrandItem)(() => ({
  '.MuiInputBase-root': {
    height: '40px'
  }
}));

const StyledModelItem = styled(ModelItem)(() => ({
  '.MuiInputBase-root': {
    height: '40px'
  }
}));

type Props = {
  taskId?: string;
  gridTemplate: string;
};

function CategoryTaskItem(props: Props) {
  const { taskId, gridTemplate } = props;

  const { isOpen: deleteDialogOpen, togglePopup: toggleDeleteDialog } = useDialogState();
  const [taskApproveLoading, taskApproveDispatch] = useLoading();
  const [taskRejectLoading, taskRejectDispatch] = useLoading();
  const [searchableModelsLoading, searchableModelLoadingDispatch] = useLoading();

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const { formatDate, formatTime } = useLocalizationHelpers();

  const task = useTypedSelector((state) => selectCategoryTaskById(state, taskId));

  const [isImageFetchRequired, setIsImageFetchRequired] = useState(true);
  const [imageState, imageDispatch] = useReducer(imageSelectorReducer, initialState);

  const [categoryChanged, setCategoryChanged] = useState<boolean>(false);
  const approveDisabled = (task.status === 'Inconsistent' && !categoryChanged) || !task.model.id;

  const handleApprove = useCallback(async () => {
    taskApproveDispatch(approveCategoryTask(task, imageState));
  }, [taskApproveDispatch, task, imageState]);

  const handleReject = useCallback(async () => {
    taskRejectDispatch(rejectCategoryTask(task));
  }, [taskRejectDispatch, task]);

  const handleRejectButtonClick = useCallback(async () => {
    const assetCount = await taskRejectDispatch(checkAssetCountOfCategoryTask(task.id));
    if (assetCount > 0) {
      toggleDeleteDialog(true);
    } else {
      handleReject();
    }
  }, [toggleDeleteDialog, handleReject, task.id, taskRejectDispatch]);

  const handleBrandConfirm = useCallback(
    async (brand: Brand): Promise<Brand> => {
      dispatch(
        updateTask({
          ...task,
          brand,
          brandId: brand.id,
          model: {
            id: '',
            name: ''
          },
          modelId: ''
        })
      );
      return brand;
    },
    [dispatch, task]
  );

  const handleAddBrand = useCallback(
    async (brand: Brand): Promise<Brand> => {
      const finalBrand = await dispatch(addBrand(brand, undefined, { inMemory: true }));
      await handleBrandConfirm(finalBrand);

      return finalBrand;
    },
    [dispatch, handleBrandConfirm]
  );

  const handleModelConfirm = useCallback(
    async (model: Model): Promise<Model> => {
      const isNewModel = model.id === task.model.id && model.name !== task.model.name;
      let finalModel = model;

      if (isNewModel) {
        finalModel = await dispatch(
          addModel(finalModel, undefined, task.brand.id, { inMemory: true })
        );
      }

      dispatch(
        updateTask({
          ...task,
          model: finalModel,
          modelId: finalModel.id
        })
      );
      return finalModel;
    },
    [dispatch, task]
  );

  const handleAddModel = useCallback(
    async (model: Model): Promise<Model> => {
      const finalModel = await dispatch(
        addModel(model, undefined, task.brand.id, { inMemory: true })
      );
      await handleModelConfirm(finalModel);

      return finalModel;
    },
    [dispatch, handleModelConfirm, task.brand.id]
  );

  const handleCategoryConfirm = async () => {
    setCategoryChanged(true);
  };

  const handleModelEdit = useCallback(() => {
    if (task.brand.id) {
      searchableModelLoadingDispatch(getModelsForBrand(task.brand.id));
    }
  }, [searchableModelLoadingDispatch, task.brand.id]);

  const handleImageConfirm = useCallback((file) => {
    imageDispatch(changePhoto(file));
  }, []);

  const handleImageDelete = async () => {
    imageDispatch(deletePhoto(task.model?.photoPath));
  };

  const enabled = useTypedSelector((state) => selectTaskIsEnabled(state, task.id));

  const searchableBrands = useTypedSelector(selectAllBrands);
  const searchableModels = useTypedSelector(selectSearchModels);

  const photoPath = task.model ? task.model.photoPath : '';

  return (
    <Box
      alignItems="center"
      borderRadius="16px"
      boxShadow={2}
      className={clsx({
        'opacity-5 pointer-events-none': !enabled
      })}
      component={Paper}
      display="grid"
      mb={2}
      style={{
        gridTemplateColumns: gridTemplate,
        gridTemplateRows: '80px 1px 40px'
      }}
    >
      <div>
        <ImageSelectorButton
          fetchRequired={isImageFetchRequired}
          imageFile={imageState.file}
          itemName={task.model?.name ?? ''}
          onConfirm={handleImageConfirm}
          onDelete={handleImageDelete}
          photoPath={photoPath}
          setFetchRequired={setIsImageFetchRequired}
          source="file"
          useBigIcon
          useHoverOnSelf
        />
      </div>
      <div className="overflow-hidden">
        <CatDialog
          onAction={handleReject}
          onClose={() => toggleDeleteDialog(false)}
          open={deleteDialogOpen}
        >
          <CatDialogTitle
            iconComponent={TrashIcon}
            title={t('categories.tasks.delete_warning_title', {
              numberOfAssets: task.numberOfAssets ?? null
            })}
          />
          <CatDialogContent>
            <CatTypography variant="body1">
              <Trans
                i18nKey="categories.tasks.delete_warning_text"
                t={t}
                values={{ numberOfAssets: task.numberOfAssets ?? null }}
              />
            </CatTypography>
          </CatDialogContent>
          <CatDialogAction>
            <CatDialogButton component={GoBackButton} variant="close" />
            <CatDialogButton component={DeleteButton} variant="action" />
          </CatDialogAction>
        </CatDialog>
        <StyledCategorySelectorItem
          className={approveDisabled ? 'border-main-red border-solid border-1' : ''}
          hasError={approveDisabled}
          onCategorySelect={handleCategoryConfirm}
          task={task}
        />
      </div>
      <Box px={1} width="200px">
        <StyledBrandItem
          brand={task.brand}
          deletable={false}
          editable
          key={task.brand.id}
          onAddNew={handleAddBrand}
          onConfirm={handleBrandConfirm}
          searchableBrands={searchableBrands}
        />
      </Box>
      <Box px={1} width="200px">
        <StyledModelItem
          deletable={false}
          editable
          key={task.model?.id ?? ''}
          model={task.model}
          onAddNew={handleAddModel}
          onConfirm={handleModelConfirm}
          onEdit={handleModelEdit}
          searchableModels={searchableModels}
          searchableModelsLoading={searchableModelsLoading}
        />
      </Box>

      <Box display="flex" justifySelf="center">
        <ColumnTitle
          alignItems="center"
          alignSelf="center"
          display="flex"
          height="16px"
          justifyContent="center"
          mx={1}
        >
          <CatIconButton
            className="ml4"
            loading={taskRejectLoading}
            onClick={handleRejectButtonClick}
          >
            <TrashIcon color="red" contained fontSize="medium" />
          </CatIconButton>
        </ColumnTitle>
        <Box alignSelf="center" mr={2}>
          <CatIconButton
            className="ml4"
            disabled={approveDisabled}
            loading={taskApproveLoading}
            onClick={handleApprove}
          >
            <CheckIcon color="green" contained fontSize="medium" />
          </CatIconButton>
        </Box>
      </Box>
      <Box
        style={{
          gridColumn: '1 / -1',
          justifySelf: 'center'
        }}
        width={1}
      >
        <Box m="0 8px 0 16px">
          <Divider />
        </Box>
      </Box>
      <CreatedByInfo>
        {/* todo: add createdBy picture here */}
        <Box bgcolor="primary.main" borderRadius="50%" height="24px" mr={1} width="24px" />
        <Box display="flex" flexDirection="column" justifyContent="center">
          {task.createdByUser}
        </Box>
      </CreatedByInfo>
      <DateInfo>
        {formatDate(task.createdDate)} <br /> {formatTime(task.createdDate)}
      </DateInfo>
    </Box>
  );
}

export default CategoryTaskItem;
