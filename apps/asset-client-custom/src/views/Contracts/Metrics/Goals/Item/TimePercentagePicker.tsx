import { CatIconButton } from 'catamaran/core';
import { InputAdornment, Slider, TextField } from 'catamaran/core/mui';
import { useDebounce } from 'react-use';
import MinusIcon from 'catamaran/icons/Minus';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';

type Props = {
  onPercentageChange: (value: number) => void;
  percentageValue: number;
};

function TimePercentagePicker(props: Props) {
  const { onPercentageChange, percentageValue } = props;

  const [localValue, setLocalValue] = React.useState(percentageValue);

  const handlePlusButton = () => {
    if (localValue + 5 <= 100) {
      setLocalValue(localValue + 5);
    } else {
      setLocalValue(100);
    }
  };

  const handleMinusButton = () => {
    if (localValue - 5 >= 0) {
      setLocalValue(localValue - 5);
    } else {
      setLocalValue(0);
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setLocalValue(newValue as number);
  };

  const handleTextChange = (event: any) => {
    let newText: any = event.target.value;
    if (!newText) {
      newText = 0;
    }

    if (!Number(newText) && Number(newText) !== 0) {
      return;
    }

    if (Number(newText) > 100) {
      newText = 100;
    }

    if (Number(newText) < 0) {
      newText = 0;
    }

    setLocalValue(parseInt(newText, 10));
  };

  useDebounce(
    () => {
      onPercentageChange(localValue);
    },
    500,
    [localValue]
  );

  return (
    <div className="flex align-items-center gap-4">
      <div
        className="grid grid-auto-flow-column align-items-center gap-8 px4 bg-white radius-24"
        style={{ height: '32px' }}
      >
        <TextField
          InputProps={{
            classes: {
              input: 'text-center p0'
            },
            endAdornment: (
              <InputAdornment position="end" sx={{ position: 'relative', right: '8px' }}>
                %
              </InputAdornment>
            ),
            sx: {
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: '16px',
              display: 'grid',
              gridAutoFlow: 'column',
              height: '24px',
              padding: '0',
              width: '50px'
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
      <div
        className="flex align-items-center px8 bg-white radius-24"
        style={{ height: '30px', width: '200px' }}
      >
        <Slider onChange={handleSliderChange} size="small" value={localValue} />
      </div>
    </div>
  );
}

export default TimePercentagePicker;
