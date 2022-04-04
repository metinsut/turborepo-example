import { CatTypography, useLocalizationHelpers } from 'catamaran/core';
import { TableCell } from 'catamaran/core/mui';
import React from 'react';

interface Props {
  addedDate: string;
}

const DateAddedCell = ({ addedDate }: Props) => {
  const { formatDate } = useLocalizationHelpers();

  return (
    <TableCell className="border-0">
      <CatTypography noBreak variant="body2">
        {formatDate(addedDate)}
      </CatTypography>
    </TableCell>
  );
};

export default DateAddedCell;
