import {
  BreakdownType,
  selectAllBreakdownTypes
} from 'store/slices/taskConfiguration/breakdown/breakdownTypes';
import {
  CatPanel,
  CatPanelContent,
  CatPanelHeader,
  CatToggleButton,
  CatTypography
} from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import {
  selectBreakdownTypeId,
  selectBreakdownTypeName
} from 'store/slices/breakdown/taskDetail/selector';
import { updateBreakdownType } from 'store/slices/breakdown/taskDetail/action';
import { useLoading, useTypedSelector } from 'hooks';
import { useState } from 'react';
import Check from 'catamaran/icons/Check';
import InfoIcon from 'catamaran/icons/Info';
import NoItem from 'catamaran/icons/NoItem';
import RadioIcon from 'catamaran/icons/Radio';

const TypeOfBreakdown = () => {
  const { t } = useTranslation();
  const breakdownTypeId = useTypedSelector(selectBreakdownTypeId);
  const breakdownTypeName = useTypedSelector(selectBreakdownTypeName);
  const breakdownTypes = useTypedSelector(selectAllBreakdownTypes);
  const [clickedTypeId, setClickedTypeId] = useState('');
  const [load, dispatchBreakdownType] = useLoading<void>();

  if (breakdownTypeId && !breakdownTypes.find((i) => i.id === breakdownTypeId)) {
    breakdownTypes.push({
      disabled: true,
      id: breakdownTypeId,
      name: breakdownTypeName
    });
  }

  const handleOnChange = async (id: string) => {
    if (breakdownTypeId === id) {
      setClickedTypeId(id);
      await dispatchBreakdownType(updateBreakdownType(null));
      setClickedTypeId('');
      return;
    }
    setClickedTypeId(id);
    await dispatchBreakdownType(updateBreakdownType(id));
    setClickedTypeId('');
  };

  const getButtonIcon = (breakdownType: BreakdownType) => {
    if (breakdownTypeId === breakdownType.id) {
      return <Check />;
    }

    return <RadioIcon />;
  };

  return (
    <CatPanel>
      <CatPanelHeader title={t('tasks.detail.type.title')} />
      <CatPanelContent className="grid gap-8 pb8">
        {breakdownTypes.length > 0 ? (
          <div className="grid gap-24">
            <div
              className="grid align-items-center gap-8"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, auto))' }}
            >
              {breakdownTypes.map((type) => {
                const selected = type.id === breakdownTypeId;
                const disabled = load || (type.disabled && !selected);
                const itemLoading = load && clickedTypeId === type.id;
                return (
                  <CatToggleButton
                    closable
                    disabled={disabled}
                    icon={getButtonIcon(type)}
                    keepIconColor={!selected}
                    key={type.id}
                    loading={itemLoading}
                    onChange={() => handleOnChange(type.id)}
                    reverse
                    selected={selected}
                    size="large"
                    title={type.name}
                  />
                );
              })}
            </div>
            <div className="flex align-items-center gap-8">
              <InfoIcon color="darkGrey" contained fontSize="small" hoverable={false} />
              <CatTypography variant="body2">{t('tasks.detail.type.note')}</CatTypography>
            </div>
          </div>
        ) : (
          <div className="grid gap-16 grid-auto-flow-column justify-content-start align-items-center">
            <NoItem />
            <div className="grid gap-4">
              <CatTypography variant="subtitle1">
                {t('tasks.detail.type.no_item_desc_1')}
              </CatTypography>
              <CatTypography className="opacity-8" variant="body1">
                <Trans i18nKey="tasks.detail.type.no_item_desc_2" t={t} />
              </CatTypography>
              <CatTypography className="opacity-8" variant="body1">
                {t('tasks.detail.type.no_item_desc_3')}
              </CatTypography>
            </div>
          </div>
        )}
      </CatPanelContent>
    </CatPanel>
  );
};

export default TypeOfBreakdown;
