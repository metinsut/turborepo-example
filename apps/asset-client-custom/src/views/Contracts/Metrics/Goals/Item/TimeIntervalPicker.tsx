import { CatIconButton, CatMenuItem, CatSelect, CatTypography } from 'catamaran/core';
import { TextField } from 'catamaran/core/mui';
import { TimeType } from 'store/slices/contracts/types';
import { timeTypes } from 'store/slices/contracts/data';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';
import MinusIcon from 'catamaran/icons/Minus';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';

type Props = {
  onTimeTypeChange: (value: TimeType) => void;
  onTimeValueChange: (value: number) => void;
  timeType: TimeType;
  timeValue: number;
};

function TimeIntervalPicker(props: Props) {
  const { onTimeTypeChange, onTimeValueChange, timeType, timeValue } = props;

  const { t } = useTranslation();

  const [localValue, setLocalValue] = React.useState(timeValue);

  const handlePlusButton = () => {
    const incrementAmount = timeType === 'minutes' ? 5 : 1;
    setLocalValue(timeValue + incrementAmount);
  };

  const handleMinusButton = () => {
    const decrementAmount = timeType === 'minutes' ? 5 : 1;
    if (timeValue - decrementAmount >= 0) {
      setLocalValue(timeValue - decrementAmount);
    } else {
      setLocalValue(0);
    }
  };

  const handleTimeTypeChange = (event: any) => {
    const type = event.target.value;
    const selectedTimeType = timeTypes.find((i) => i === type);
    onTimeTypeChange(selectedTimeType);
  };

  const handleTextChange = (event: any) => {
    let newText: any = event.target.value;
    if (!newText) {
      newText = 0;
    }

    if (!Number(newText) && Number(newText) !== 0) {
      return;
    }

    setLocalValue(parseInt(newText, 10));
  };

  useDebounce(
    () => {
      onTimeValueChange(localValue);
    },
    500,
    [localValue]
  );

  return (
    <div
      className="grid grid-auto-flow-column align-items-center bg-white radius-24"
      style={{ height: '32px' }}
    >
      <div className="grid grid-auto-flow-column align-items-center justify-item-start gap-8 pl8">
        <TextField
          InputProps={{
            classes: {
              input: 'text-center'
            },
            sx: {
              borderRadius: '16px',
              height: '24px',
              width: '44px'
            }
          }}
          onChange={handleTextChange}
          size="small"
          value={localValue}
        />
        <div className="flex align-items-center">
          <CatIconButton onClick={handleMinusButton}>
            <MinusIcon color="darkGrey" contained fontSize="small" />
          </CatIconButton>
          <div className="divider-vertical mx4" style={{ height: '8px' }} />
          <CatIconButton onClick={handlePlusButton}>
            <PlusIcon color="darkGrey" contained fontSize="small" />
          </CatIconButton>
        </div>
      </div>
      <div className="divider-vertical" style={{ height: '24px' }} />
      <CatSelect densed disableUnderline onChange={handleTimeTypeChange} value={timeType ?? ''}>
        {timeTypes.map((type) => (
          <CatMenuItem key={type} value={type}>
            <CatTypography className="opacity-6" variant="caption">
              {t(`contracts.edit.metrics.time_types.${type}`)}
            </CatTypography>
          </CatMenuItem>
        ))}
      </CatSelect>
    </div>
  );
}

export default TimeIntervalPicker;
