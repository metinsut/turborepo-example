import { CatChip, CatTypography } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import React from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  currentCount: number;
  maxCount: number;
  type?: 'increment' | 'decrement';
};

function RemainingCharacters({
  className,
  currentCount,
  maxCount,
  style,
  type = 'decrement'
}: Props) {
  const { t } = useTranslation();
  const displayCount = type === 'decrement' ? maxCount - currentCount : currentCount;
  return (
    <div className={clsx(className, 'flex align-items-center  gap-8')} style={style}>
      <CatTypography className="opacity-8" variant="caption">
        {t('common.remaining_characters')}
      </CatTypography>
      <CatChip
        color={displayCount > 0 ? 'darkGrey' : 'red'}
        label={
          <>
            <b>{displayCount}</b>
            {`/${maxCount}`}
          </>
        }
        size="small"
        variant="outlined"
      />
    </div>
  );
}

export default RemainingCharacters;
