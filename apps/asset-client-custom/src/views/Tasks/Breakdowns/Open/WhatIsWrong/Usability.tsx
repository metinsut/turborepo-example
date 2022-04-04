import { CatToggleButton, CatTypography } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { OpenBreakdown } from 'store/slices/breakdown/open/types';
import { Usability as UsabilityType } from 'store/slices/breakdown/common/types';
import { selectUsability } from 'store/slices/breakdown/open/selector';
import { setUsability } from 'store/slices/breakdown/open/slice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import InvalidFieldIcon from 'catamaran/icons/InvalidField';
import MaintenanceOkIcon from 'catamaran/icons/MaintenanceOk';
import NotUsableIcon from 'catamaran/icons/NotUsable';
import ValidFieldIcon from 'catamaran/icons/ValidField';

type Props = {
  formHelper?: FormHelper<OpenBreakdown>;
};

const Usability = ({ formHelper }: Props) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const handleUsabilityStatus = (status: UsabilityType) => {
    dispatch(setUsability(status));
  };

  const usability = useTypedSelector(selectUsability);
  const usabilityStatus = usability === 'usable';
  const notUsabilityStatus = usability === 'notUsable';

  const { setFormState } = formHelper;
  useEffect(() => {
    setFormState((previews) => ({ ...previews, usability }));
  }, [setFormState, usability]);

  const isUsabilityValid = formHelper.formState.values.usability;

  return (
    <div className="grid align-self-end pb12 gap-8">
      <div className="flex align-items-center gap-8">
        {isUsabilityValid ? <ValidFieldIcon /> : <InvalidFieldIcon />}
        <CatTypography variant="subtitle1">
          {t('tasks.breakdowns.open_breakdown.usability.asset_usable')}
        </CatTypography>
      </div>
      <div className="flex gap-8 align-items-center">
        <CatToggleButton
          color="green"
          icon={<MaintenanceOkIcon />}
          onClick={() => handleUsabilityStatus('usable')}
          selected={usabilityStatus}
          size="large"
          title={t('tasks.breakdowns.open_breakdown.usability.usable')}
        />
        <CatToggleButton
          color="red"
          icon={<NotUsableIcon />}
          onClick={() => handleUsabilityStatus('notUsable')}
          selected={notUsabilityStatus}
          size="large"
          title={t('tasks.breakdowns.open_breakdown.usability.not_usable')}
        />
      </div>
    </div>
  );
};

export default Usability;
