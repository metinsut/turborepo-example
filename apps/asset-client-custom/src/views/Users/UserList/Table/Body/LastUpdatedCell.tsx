import { CatTypography, useLocalizationHelpers } from 'catamaran/core';
import { TableCell } from 'catamaran/core/mui';
import React from 'react';

interface Props {
  lastUpdate: string;
}

const LastUpdatedCell = ({ lastUpdate }: Props) => {
  const { formatDate } = useLocalizationHelpers();

  return (
    <TableCell className="border-0">
      <CatTypography noBreak variant="body2">
        {formatDate(lastUpdate)}
      </CatTypography>
    </TableCell>
  );
};

export default LastUpdatedCell;
