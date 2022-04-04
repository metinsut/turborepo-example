import { Box, CatChip, CatChipProps } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import React from 'react';
import theme from 'catamaran/theme';

function NewBadge(props: CatChipProps) {
  const { t } = useTranslation();

  return (
    <CatChip
      color="blue"
      icon={
        <Box
          sx={{
            backgroundColor: theme.palette.blue.main,
            borderRadius: '50%',
            height: '4px',
            width: '4px'
          }}
        />
      }
      label={t('common.new')}
      size="small"
      {...props}
    />
  );
}

export default NewBadge;
