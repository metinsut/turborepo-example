import { Box, CatTypography } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import React from 'react';

type Props = {
  part?: string;
  number?: number;
};

function DisplayPartItem(props: Props) {
  const { part, number } = props;

  const { t } = useTranslation();

  return (
    <>
      <Box className="opacity-1" px={2}>
        |
      </Box>
      <CatTypography className="opacity-6" variant="body1">
        {t('contracts.edit.parts.part_field', { number })}
      </CatTypography>
      <Box ml={1}>
        <CatTypography className="opacity-8" variant="subtitle1">
          {part}
        </CatTypography>
      </Box>
    </>
  );
}

export default DisplayPartItem;
