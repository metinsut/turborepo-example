import { CatChip } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import React from 'react';

type Props = {
  className?: string;
  maxCount: number;
  remainingCount: number;
};

function RemainingChip({ className, maxCount, remainingCount }: Props) {
  const { t } = useTranslation();
  return (
    <CatChip
      className={className}
      color={remainingCount > 0 ? 'darkGrey' : 'red'}
      label={<Trans i18nKey="common.remaining" t={t} values={{ maxCount, remainingCount }} />}
      size="small"
      variant={remainingCount > 0 ? 'outlined' : 'filled'}
    />
  );
}

export default RemainingChip;
