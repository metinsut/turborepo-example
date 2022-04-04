import { CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { DelayTolerance, DowntimeRule } from 'store/slices/contracts/types';
import { delayTolerances } from 'store/slices/contracts/data';
import { useTranslation } from 'react-i18next';
import CalendarMasterIcon from 'catamaran/icons/CalendarMaster';

type Props = {
  downtimeRule: DowntimeRule;
  onDelayToleranceChange: (delayTolerance: DelayTolerance) => void;
};

function DelayTolerancePicker(props: Props) {
  const { downtimeRule, onDelayToleranceChange } = props;

  const { t } = useTranslation();

  const handleChange = (event: any) => {
    const type = event.target.value;
    const selectedDelayTolerance = delayTolerances.find((i) => i === type);
    onDelayToleranceChange(selectedDelayTolerance);
  };

  return (
    <CatSelect
      densed
      displayEmpty
      fullWidth
      onChange={handleChange}
      renderValue={(selected) => {
        const delayTolerance = selected as DelayTolerance;
        return (
          <div className="flex align-items-center">
            <CalendarMasterIcon
              color="darkGrey"
              contained={false}
              fontSize="small"
              hoverable={false}
            />
            <CatTypography className="three-dot opacity-8 ml8" variant="caption">
              {t(`contracts.edit.metrics.downTimeRules.delay_tolerances.${delayTolerance}`)}
            </CatTypography>
          </div>
        );
      }}
      value={downtimeRule.delayTolerance ?? ''}
    >
      <CatMenuItem disabled key="" value="">
        {t('common.dropdown_generic_hint')}
      </CatMenuItem>
      {delayTolerances.map((dt) => (
        <CatMenuItem key={dt} value={dt}>
          <CalendarMasterIcon
            color="darkGrey"
            contained={false}
            fontSize="small"
            hoverable={false}
          />
          <CatTypography className="three-dot" variant="body2">
            {t(`contracts.edit.metrics.downTimeRules.delay_tolerances.${dt}`)}
          </CatTypography>
        </CatMenuItem>
      ))}
    </CatSelect>
  );
}

export default DelayTolerancePicker;
