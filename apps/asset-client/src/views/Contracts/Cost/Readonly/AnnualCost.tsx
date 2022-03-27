import { Box, CatTypography } from 'catamaran/core';
import { Cost } from 'store/slices/contracts/types';
import { Trans, useTranslation } from 'react-i18next';
import { ceil } from 'lodash';
import { selectContractBasicInformation } from 'store/slices/contracts/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';

type Props = {
  cost: Cost;
};

function AnnualCost(props: Props) {
  const { cost } = props;
  const { startDate, endDate } = useTypedSelector(selectContractBasicInformation);

  const monthDifference = moment(endDate).diff(startDate, 'months', true);

  const annualCost = cost.details[0].amount;
  const totalCost = annualCost * (monthDifference / 12);

  const { t } = useTranslation();
  return (
    <>
      <CatTypography className="opacity-6" variant="body1">
        {t(`contracts.cost_types.${cost.type}`)}
      </CatTypography>
      <Box className="opacity-2" px={1}>
        |
      </Box>
      <CatTypography className="opacity-6" variant="caption">
        {t('contracts.edit.entered_cost')}
      </CatTypography>
      <Box ml={0.5}>
        <CatTypography className="opacity-8" variant="subtitle1">
          {/* TODO currency */}${annualCost.toFixed(2)}
        </CatTypography>
      </Box>
      <Box className="opacity-1" px={1}>
        |
      </Box>
      <CatTypography className="opacity-6" variant="caption">
        {t('contracts.edit.duration')}
      </CatTypography>
      <Box ml={0.5}>
        <CatTypography className="opacity-8" variant="subtitle1">
          <Trans
            i18nKey="contracts.edit.cost_duration_value"
            t={t}
            values={{ duration: ceil(monthDifference) }}
          />
        </CatTypography>
      </Box>
      <Box className="opacity-1" px={1}>
        |
      </Box>
      <CatTypography className="opacity-6" variant="caption">
        <Trans i18nKey="contracts.edit.calculated_total_cost" t={t} />
      </CatTypography>
      <Box ml={0.5}>
        <CatTypography className="opacity-8" variant="subtitle1">
          ${totalCost.toFixed(2)}
        </CatTypography>
      </Box>
    </>
  );
}

export default AnnualCost;
