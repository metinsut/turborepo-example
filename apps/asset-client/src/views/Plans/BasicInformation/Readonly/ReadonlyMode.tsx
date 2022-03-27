import { Box, CatButton, useLocalizationHelpers } from 'catamaran/core';
import { Plan } from 'store/slices/plans/types';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { daysOfWeek } from 'store/common';
import { selectContractById } from 'store/slices/contracts/selectors';
import { selectMainCategoryById } from 'store/slices/session';
import { selectMultipleBranchesByIds } from 'store/slices/branches';
import { useDaysOfWeek } from 'hooks/useDaysOfWeek';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ContractIcon from 'views/Contracts/ContractIcon';
import EditIcon from 'catamaran/icons/Edit';
import ExpandIcon from 'catamaran/icons/Expand';
import LinkIcon from 'catamaran/icons/Link';
import PlanTypeIcon from 'views/Plans/PlanTypeIcon';
import TitleIcon from 'catamaran/icons/Title';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  plan?: Plan;
  onEditClick?: () => void;
};

function ReadonlyMode(props: Props) {
  const classes = useStyles();
  const { plan, onEditClick } = props;

  const { t } = useTranslation();
  const { formatMonth } = useLocalizationHelpers();

  const branches = useTypedSelector((state) => selectMultipleBranchesByIds(state, plan.branchIds));
  const mainCategory = useTypedSelector((state) =>
    selectMainCategoryById(state, plan.mainCategoryId)
  );

  const associatedContract = useTypedSelector((state) =>
    selectContractById(state, plan.contractId)
  );

  const branchString = useMemo(() => {
    switch (branches.length) {
      case 0:
        return '';
      case 1:
        return branches[0]?.name ?? '';
      default:
        return t('plans.edit.branch_selected_desc', { count: branches.length });
    }
  }, [branches, t]);

  const mainCategoryString =
    mainCategory?.name ?? t('plans.edit.no_main_category_selected_desc', { count: 0 });
  const planTypeString = plan ? t(`plans.types.${plan.type}`) : '';

  const availableDays = useDaysOfWeek(false);

  const dayIndexes = useMemo(() => {
    if (plan && plan.days && plan.days.length > 0) {
      return plan.days.map((day) => daysOfWeek.findIndex((d) => d === day));
    }
    return [];
  }, [plan]);

  const periodString = useMemo(() => {
    if (!plan.period) {
      return '';
    }

    switch (plan.period) {
      case 'weekly':
        return t('plans.edit.weekly_period', {
          days: dayIndexes.map((dayIndex) => ` ${availableDays[dayIndex]} `),
          frequency:
            plan.frequency === 1
              ? t('plans.edit.weekly_frequency_single')
              : t('plans.edit.weekly_frequency_multiple', { count: plan.frequency })
        });
      case 'daily':
        return plan.frequency === 1
          ? t('plans.edit.daily_frequency_single')
          : t('plans.edit.daily_frequency_multiple', { count: plan.frequency });
      default:
        return t(`plans.edit.period_types.${plan.period}`);
    }
  }, [plan.period, plan.frequency, t, dayIndexes, availableDays]);

  return (
    <>
      <Box alignItems="center" display="flex" mb={2}>
        <Typography className="opacity-6" variant="body1">
          {t('plans.edit.branch_field')}
        </Typography>
        <Box ml={1}>
          <Typography className="opacity-6" variant="subtitle1">
            {branchString}
          </Typography>
        </Box>
        <Box className="opacity-1" px={2}>
          |
        </Box>
        <Typography className="opacity-6" variant="body1">
          {t('plans.edit.main_category_field')}
        </Typography>
        <Box ml={1}>
          <Typography className="opacity-6" variant="subtitle1">
            {mainCategoryString}
          </Typography>
        </Box>
      </Box>
      <Box alignItems="center" flex mb={2} ml={-5}>
        <TitleIcon
          color="darkGrey"
          contained={false}
          hoverable={false}
          style={{ opacity: '80%' }}
        />
        <Box ml={2}>
          <Typography className="opacity-8" variant="subtitle1">
            {t('plans.edit.basic_information_header')}
          </Typography>
        </Box>
      </Box>
      <Box alignItems="center" display="flex" mb={2}>
        <Typography className="opacity-8" variant="body1">
          {t('plans.edit.title_field')}
        </Typography>
        <Box ml={1}>
          <Typography className="break-word opacity-6" variant="subtitle1">
            {plan.title}
          </Typography>
        </Box>
        <Box className="opacity-1" px={2}>
          |
        </Box>
        <Typography className="opacity-8" variant="body1">
          {t('plans.edit.type_field')}
        </Typography>
        <Box ml={1}>
          <Typography className="opacity-6" variant="subtitle1">
            {planTypeString}
          </Typography>
        </Box>
        <Box ml={1}>
          <PlanTypeIcon contained={false} hoverable={false} planType={plan.type} />
        </Box>
        {plan.contractId && (
          <>
            <Box className="opacity-1" px={2}>
              |
            </Box>
            <Box alignItems="flex-start" flex flexDirection="column" ml={1}>
              <Box alignItems="center" flex>
                <ExpandIcon color="darkGrey" fontSize="small" hoverable={false} />
                <Typography className="ml4 font-bold opacity-6" variant="body2">
                  {t('plans.edit.associated_contract')}
                </Typography>
              </Box>
              <Box alignItems="center" flex>
                <LinkIcon
                  className="opacity-6"
                  color="darkGrey"
                  contained={false}
                  fontSize="small"
                  hoverable={false}
                />
                <Typography className="break-word ml4" variant="body2">
                  {associatedContract.title}
                </Typography>
              </Box>
              <Box alignItems="center" flex>
                <ContractIcon
                  className="opacity-6"
                  contained={false}
                  contractType={associatedContract.type}
                  fontSize="small"
                  hoverable={false}
                />
                <Typography className="break-word ml4 opacity-6" variant="body2">
                  {t(`contracts.types.${associatedContract.type}`)}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Box alignItems="center" display="flex" mb={2}>
        <Typography className="opacity-8" variant="body1">
          {t('plans.edit.first_plan_field', { type: t(`plans.types.${plan.type}`) })}
        </Typography>
        <Box ml={1}>
          <Typography className="opacity-6" variant="subtitle1">
            {formatMonth(plan.startDate)}
          </Typography>
        </Box>
      </Box>
      <Box alignItems="center" display="flex" mb={2}>
        <Typography className="opacity-8" variant="body1">
          {t('plans.edit.period_field')}
        </Typography>
        <Box ml={1}>
          <Typography className="opacity-6" variant="subtitle1">
            {periodString}
          </Typography>
        </Box>
      </Box>
      <CatButton color="blue" endIcon={<EditIcon />} onClick={onEditClick} size="small">
        {t('common.edit')}
      </CatButton>
    </>
  );
}

export default ReadonlyMode;
