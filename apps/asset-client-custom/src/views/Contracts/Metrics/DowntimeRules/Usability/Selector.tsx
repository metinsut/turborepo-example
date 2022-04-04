import { Box, CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { DowntimeRule, MetricType, Usability } from 'store/slices/contracts/types';
import { updateDowntimeRuleUsability } from 'store/slices/contracts/slice';
import { usabilities } from 'store/slices/contracts/data';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import UsabilityIcon from './Icon';

type Props = {
  className?: string;
  metricType: MetricType;
  downtimeRule: DowntimeRule;
  index: number;
};

function UsabilitySelector(props: Props) {
  const { className, metricType, downtimeRule, index } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleChange = (event: any) => {
    const usability = event.target.value;
    dispatch(
      updateDowntimeRuleUsability({
        downtimeRuleIndex: index,
        metricType,
        usability
      })
    );
  };

  return (
    <CatSelect
      className={className}
      densed
      displayEmpty
      fullWidth
      onChange={handleChange}
      renderValue={(selected) => {
        const usability = selected as Usability;
        return (
          <Box alignItems="center" display="flex">
            <UsabilityIcon fontSize="small" usability={usability} />
            <Box ml={1}>
              <CatTypography className="opacity-8" variant="caption">
                {t(`contracts.edit.metrics.downTimeRules.usabilities.${usability}`)}
              </CatTypography>
            </Box>
          </Box>
        );
      }}
      value={downtimeRule.usability ?? ''}
    >
      <CatMenuItem disabled key="" value="">
        {t('common.dropdown_generic_hint')}
      </CatMenuItem>
      {usabilities.map((usability) => (
        <CatMenuItem key={usability} value={usability}>
          <UsabilityIcon fontSize="small" usability={usability} />
          <CatTypography variant="body2">
            {t(`contracts.edit.metrics.downTimeRules.usabilities.${usability}`)}
          </CatTypography>
        </CatMenuItem>
      ))}
    </CatSelect>
  );
}

export default UsabilitySelector;
