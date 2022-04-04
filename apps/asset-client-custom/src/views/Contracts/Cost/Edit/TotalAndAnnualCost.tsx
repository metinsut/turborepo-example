import { Box, CatTypography } from 'catamaran/core';
import { Cost } from 'store/slices/contracts/types';
import { Divider, Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { ceil } from 'lodash';
import { selectContractBasicInformation } from 'store/slices/contracts/selectors';
import { updateCostAmount } from 'store/slices/contracts/slice';
import { useDebounce } from 'react-use';
import { useFormState, useTypedDispatch, useTypedSelector } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import CostIcon from 'catamaran/icons/Cost';
import React from 'react';
import contractCostItemValidator from 'helpers/validations/ContractCostItemValidator';
import moment from 'moment';
import theme from 'catamaran/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  cost: Cost;
};

function TotalAndAnnualCost(props: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { cost } = props;
  const dispatch = useTypedDispatch();

  const { startDate, endDate } = useTypedSelector(selectContractBasicInformation);

  const costDetail = cost.details[0];
  const formHelper = useFormState(costDetail, contractCostItemValidator);
  useDebounce(
    () => {
      const { amount } = formHelper.formState.values;
      dispatch(
        updateCostAmount({
          amount,
          index: 0,
          type: cost.type
        })
      );
    },
    500,
    [dispatch, formHelper.formState.values]
  );

  const monthDifference = moment(endDate).diff(startDate, 'months', true);

  let calculatedCost: number = 0;
  let calculatedFieldResource = '';
  const costAmount = costDetail.amount;

  if (cost.type === 'annual') {
    calculatedCost = costAmount * (monthDifference / 12);
    calculatedFieldResource = 'contracts.edit.calculated_total_cost';
  } else {
    calculatedCost = (costAmount * 12) / monthDifference;
    calculatedFieldResource = 'contracts.edit.calculated_annual_cost';
  }

  return (
    <Box display="flex" flexDirection="row">
      <Box mr={2} width={262}>
        <CatamaranTextField
          formHelper={formHelper}
          isNumericString
          label={`${t(`contracts.cost_types.${cost.type}`)} ($)`}
          mode="editOnly"
          name="amount"
          validatable
        />
      </Box>
      {(costAmount === 0 || !!costAmount) && (
        <Box
          bg={theme.palette.lightGrey.main}
          borderRadius="8px"
          display="flex"
          flexDirection="row"
          height="41px"
          minWidth={254}
          pr={1}
        >
          <Box p={1}>
            <CostIcon contained={false} hoverable={false} style={{ opacity: '80%' }} />
          </Box>
          <Box display="flex" flexDirection="column" py={0.5}>
            <CatTypography style={{ opacity: '40%' }} variant="body2">
              <Trans components={{ bold: <b /> }} i18nKey={calculatedFieldResource} t={t} />
            </CatTypography>
            <Box alignItems="center" display="flex" flexDirection="row">
              <CatTypography style={{ opacity: '80%' }} variant="body1">
                $<b>{calculatedCost.toFixed(2)}</b>
              </CatTypography>
              <Box height={8} mx={1}>
                <Divider orientation="vertical" />
              </Box>
              <CatTypography style={{ opacity: '60%' }} variant="caption">
                <Trans
                  components={{ bold: <b /> }}
                  i18nKey="contracts.edit.cost_duration_with_title"
                  t={t}
                  values={{ duration: ceil(monthDifference) }}
                />
              </CatTypography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TotalAndAnnualCost;
