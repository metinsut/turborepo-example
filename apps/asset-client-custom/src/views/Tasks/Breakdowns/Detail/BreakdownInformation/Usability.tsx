import { CatToggleButton } from 'catamaran/core';
import { Usability as UsabilityType } from 'store/slices/breakdown/common/types';
import { updateBreakdownUsability } from 'store/slices/breakdown/taskDetail/action';
import { useLoading } from 'hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingIcon from 'catamaran/icons/Loading';
import MaintenanceOkIcon from 'catamaran/icons/MaintenanceOk';
import NotUsableIcon from 'catamaran/icons/NotUsable';
import clsx from 'clsx';
import styles from '../Detail.module.scss';

type Props = {
  usability: UsabilityType;
};

function Usability({ usability }: Props) {
  const { t } = useTranslation();
  const [clickedUsability, setClickedUsability] = useState('');
  const [usabilityLoading, usabilityLoadingDispatch] = useLoading();

  const handleUsabilityClick = async (type: UsabilityType) => {
    if (type !== usability) {
      setClickedUsability(type);
      await usabilityLoadingDispatch(updateBreakdownUsability(type));

      setClickedUsability('');
    }
  };

  return (
    <div className={clsx('grid grid-auto-flow-column gap-16', styles.usability_grid_content)}>
      <CatToggleButton
        color="green"
        disabled={usabilityLoading}
        icon={usability && clickedUsability === 'usable' ? <LoadingIcon /> : <MaintenanceOkIcon />}
        onClick={() => handleUsabilityClick('usable')}
        selected={usability === 'usable'}
        size="large"
        title={t('tasks.breakdowns.open_breakdown.usability.usable')}
      />
      <CatToggleButton
        color="red"
        disabled={usabilityLoading}
        icon={usability && clickedUsability === 'notUsable' ? <LoadingIcon /> : <NotUsableIcon />}
        onClick={() => handleUsabilityClick('notUsable')}
        selected={usability === 'notUsable'}
        size="large"
        title={t('tasks.breakdowns.open_breakdown.usability.not_usable')}
      />
    </div>
  );
}

export default Usability;
