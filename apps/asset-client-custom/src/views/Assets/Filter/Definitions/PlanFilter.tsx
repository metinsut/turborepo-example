import { Box, CatAutocompleteAsync, CatCheckbox, CatTypography } from 'catamaran/core';
import { DateFilterType } from 'components/DateFilter/types';
import { DefinitionPlanTypes } from 'store/slices/asset/filter/types';
import { Divider } from 'catamaran/core/mui';
import {
  doesNotHavePlanCheckbox,
  doesNotNeedPlanCheckbox,
  searchDefinitionsTitle
} from 'store/slices/asset/filter/actions';
import {
  selectDraftFilterDefinitionsDoesNotNeedPlan,
  selectDraftFilterDefinitionsEndDate,
  selectDraftFilterDefinitionsNoPlan,
  selectDraftFilterDefinitionsTitle
} from 'store/slices/asset/filter/selectors';
import {
  setFilterDefinitionsEndDate,
  setFilterDefinitionsTitle
} from 'store/slices/asset/filter/slice';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CalibrationIcon from 'catamaran/icons/Calibration';
import DateFilter from 'components/DateFilter/DateFilter';
import clsx from 'clsx';

type Props = {
  className?: string;
  planType: DefinitionPlanTypes;
};

type FilterDefinitionsType = {
  planType: DefinitionPlanTypes;
  title: string[];
};

function PlanFilter(props: Props) {
  const { className, planType } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const planTypeTitle = t(`assets.protection.${planType}_field`);

  const selectedTitles = useTypedSelector((state) =>
    selectDraftFilterDefinitionsTitle(state, planType)
  );
  const noNeedCheckbox = useTypedSelector((state) =>
    selectDraftFilterDefinitionsDoesNotNeedPlan(state, planType)
  );
  const noPlanCheckbox = useTypedSelector((state) =>
    selectDraftFilterDefinitionsNoPlan(state, planType)
  );

  const handleChangeTitle = (title: string[] | string) => {
    dispatch(
      setFilterDefinitionsTitle({
        planType,
        title
      } as FilterDefinitionsType)
    );
  };

  const fetchTitles = useCallback(
    (searchText: string) => dispatch(searchDefinitionsTitle(searchText, planType)),
    [dispatch, planType]
  );

  const definitionsEndDate = useTypedSelector((state) =>
    selectDraftFilterDefinitionsEndDate(state, planType)
  );

  const handleContractEndDateChange = (endDate: DateFilterType) => {
    dispatch(setFilterDefinitionsEndDate({ endDate, planType }));
  };

  const handleDoesNotHaveCheckboxClick = () => {
    dispatch(doesNotHavePlanCheckbox(planType));
  };

  const handleDoesNotNeedCheckboxClick = () => {
    dispatch(doesNotNeedPlanCheckbox(planType));
  };

  return (
    <Box center className={clsx(className, 'w-full')} flex flexDirection="column">
      <Box
        alignSelf="flex-start"
        center
        className={clsx({
          [className]: true,
          mb16: true,
          mt16: planType !== 'maintenance',
          'opacity-8': true
        })}
        flex
      >
        <CalibrationIcon hoverable={false} />
        <CatTypography variant="subtitle1">{planTypeTitle}</CatTypography>
      </Box>
      <CatAutocompleteAsync
        className="mb12"
        disabled={noPlanCheckbox || noNeedCheckbox}
        fetchResults={fetchTitles}
        getOptionValue={(option) => option}
        label={t('contracts.title_field')}
        multiple
        onChange={handleChangeTitle}
        selectedValues={selectedTitles}
      />
      <DateFilter
        dateFilter={definitionsEndDate}
        disabled={noPlanCheckbox || noNeedCheckbox}
        onChange={handleContractEndDateChange}
        title={planTypeTitle + t('assets.assetFilter.plan_ending_date')}
      />
      <Box center className="w-full mt16" flex flexDirection="column">
        <Box center className="w-full mx24" flex>
          <Divider className="flex-1 mr8" />
          <CatTypography>{t('assets.assetFilter.or')}</CatTypography>
          <Divider className="flex-1 ml8" />
        </Box>
        <Box alignItems="center" className="w-full mt8" flex justifyContent="flex-start">
          <CatCheckbox
            checked={noPlanCheckbox}
            onChange={handleDoesNotHaveCheckboxClick}
            paddingSize="large"
          />
          <CatTypography noWrap variant="body2">
            {t('assets.assetFilter.definitions_does_not_have_plan', { planType: planTypeTitle })}
          </CatTypography>
        </Box>
        <Box alignItems="center" className="w-full mt8" flex justifyContent="flex-start">
          <CatCheckbox
            checked={noNeedCheckbox}
            onChange={handleDoesNotNeedCheckboxClick}
            paddingSize="large"
          />
          <CatTypography noWrap variant="body2">
            {t('assets.assetFilter.definitions_does_not_need_plan', { planType: planTypeTitle })}
          </CatTypography>
        </Box>
      </Box>
      <Divider className="w-full" />
    </Box>
  );
}

export default PlanFilter;
