import { CatIconButton, CatTextField, CatTypography } from 'catamaran/core';
import { InputAdornment } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { selectDraftTimeTolerance } from 'store/slices/metricsConfiguration/detail/selectors';
import { timeToleranceUpdated } from 'store/slices/metricsConfiguration/detail/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ChevronDownIcon from 'catamaran/icons/ChevronDown';
import ChevronUpIcon from 'catamaran/icons/ChevronUp';
import React from 'react';
import TimeIcon from 'catamaran/icons/Time';

function TimeTolerance() {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const timeTolerance = useTypedSelector(selectDraftTimeTolerance);

  const onTimeToleranceValueChange = (value: number) => {
    dispatch(timeToleranceUpdated(value));
  };

  const handlePlusButton = () => {
    if (timeTolerance + 5 <= 60) {
      onTimeToleranceValueChange(timeTolerance + 5);
    } else {
      onTimeToleranceValueChange(60);
    }
  };

  const handleMinusButton = () => {
    if (timeTolerance - 5 >= 0) {
      onTimeToleranceValueChange(timeTolerance - 5);
    } else {
      onTimeToleranceValueChange(0);
    }
  };
  const handleTextChange = (event: any) => {
    let newText: any = event.target.value;
    if (!newText) {
      newText = 0;
    }

    if (!Number(newText) && Number(newText) !== 0) {
      return;
    }

    if (Number(newText) > 60) {
      newText = 60;
    }

    if (Number(newText) < 0) {
      newText = 0;
    }

    onTimeToleranceValueChange(parseInt(newText, 10));
  };

  return (
    <div className="grid p24 gap-5">
      <div className="flex gap-8">
        <TimeIcon fontSize="small" />
        <div className="grid gap-5">
          <CatTypography className="opacity-8" variant="subtitle1">
            {t('metrics_configuration.detail.time_tolerance.title')}
          </CatTypography>
          <CatTypography className="opacity-6" variant="body2">
            {t('metrics_configuration.detail.time_tolerance.desc')}
          </CatTypography>
        </div>
      </div>
      <div className="grid grid-auto-flow-column justify-content-start align-items-center gap-16">
        <CatTextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <div className="flex flex-direction-column gap-4">
                  <CatIconButton onClick={handlePlusButton}>
                    <ChevronUpIcon
                      color="darkGrey"
                      contained={false}
                      fontSize="small"
                      hoverable={false}
                      style={{ background: 'white' }}
                    />
                  </CatIconButton>
                  <CatIconButton onClick={handleMinusButton}>
                    <ChevronDownIcon
                      color="darkGrey"
                      contained={false}
                      fontSize="small"
                      hoverable={false}
                      style={{ background: 'white' }}
                    />
                  </CatIconButton>
                </div>
              </InputAdornment>
            )
          }}
          onChange={handleTextChange}
          size="small"
          style={{ width: '112px' }}
          value={timeTolerance}
        />
        <div>
          <CatTypography className="opacity-8" variant="body2">
            <Trans
              i18nKey="metrics_configuration.detail.time_tolerance.selection_explanation"
              t={t}
              values={{ value: timeTolerance }}
            />
          </CatTypography>
        </div>
      </div>
    </div>
  );
}

export default TimeTolerance;
