import { CatButton, CatTypography } from 'catamaran/core';
import { GoalLimitType, MetricType } from 'store/slices/contracts/types';
import { removeMetricGoal, updateMetricGoalCategories } from 'store/slices/contracts/slice';
import {
  selectContractMainCategoryId,
  selectOtherGoalCategoryIds
} from 'store/slices/contracts/selectors';
import { useState } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CategoryCheckerDialog, { CloseAction } from 'views/Categories/CategoryCheckerDialog';
import CategoryIcon from 'catamaran/icons/Category';
import EditIcon from 'catamaran/icons/Edit';

type Props = {
  categoryName?: string;
  checkedCategoryIds: string[];
  disabled?: boolean;
  index?: number;
  metricType?: MetricType;
  limitType?: GoalLimitType;
};

function GoalCategoryPicker(props: Props) {
  const {
    categoryName = '',
    checkedCategoryIds,
    disabled = false,
    index,
    metricType,
    limitType
  } = props;

  const [dialogOpen, setDialogOpen] = useState(checkedCategoryIds.length === 0 && !disabled);

  const mainCategoryId = useTypedSelector(selectContractMainCategoryId);
  const dispatch = useTypedDispatch();

  const handleClose = (closeAction: CloseAction) => {
    setDialogOpen(false);
    if (closeAction !== 'confirm' && checkedCategoryIds.length === 0) {
      dispatch(
        removeMetricGoal({
          index,
          limitType,
          metricType
        })
      );
    }
  };

  const handleOpen = () => setDialogOpen(true);

  const disabledCategories = useTypedSelector((state) =>
    !disabled ? selectOtherGoalCategoryIds(state, index) : null
  );

  const handleSelectedCategoryChange = async (selectedCategories: string[]) => {
    await dispatch(
      updateMetricGoalCategories({
        categories: selectedCategories,
        index,
        limitType,
        metricType
      })
    );
  };

  return (
    <>
      <CategoryCheckerDialog
        checkedCategoryIds={checkedCategoryIds}
        defaultExpandMainCategoryId={mainCategoryId}
        disabledCategoryIds={disabledCategories}
        disableOtherMainCategories
        mainCategoryIds={[mainCategoryId]}
        onClose={handleClose}
        onConfirm={handleSelectedCategoryChange}
        open={dialogOpen}
      />
      <CatButton
        disabled={disabled}
        endIcon={<EditIcon color="darkGrey" contained fontSize="small" hoverable={false} />}
        onClick={handleOpen}
        startIcon={<CategoryIcon fontSize="small" />}
        style={{
          backgroundColor: 'white',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          height: '32px',
          justifyContent: 'flex-start',
          textAlign: 'left',
          width: '100%'
        }}
        transformText={false}
      >
        <CatTypography variant="caption">{categoryName}</CatTypography>
      </CatButton>
    </>
  );
}

export default GoalCategoryPicker;
