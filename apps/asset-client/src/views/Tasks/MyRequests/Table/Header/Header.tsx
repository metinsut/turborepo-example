import { CatTypography } from 'catamaran/core';
import { TableCell, TableHead, TableRow } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import React from 'react';

const Header = () => {
  const { t } = useTranslation();
  return (
    <TableHead className="elev-1">
      <TableRow>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('tasks.common.table.headers.type')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('tasks.common.table.headers.status')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('tasks.common.table.headers.category')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('tasks.common.table.headers.brand')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('tasks.common.table.headers.model')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold noWrap" noBreak variant="caption">
            {t('tasks.common.table.headers.code')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('tasks.common.table.headers.location_request_date')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('tasks.common.table.headers.assigned_to')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0" />
      </TableRow>
    </TableHead>
  );
};

export default Header;
