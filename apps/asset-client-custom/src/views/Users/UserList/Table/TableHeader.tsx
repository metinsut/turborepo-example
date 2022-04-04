import { CatCheckbox, CatTypography } from 'catamaran/core';
import { TableCell, TableHead, TableRow } from 'catamaran/core/mui';
import { fillAllCheckbox } from 'store/slices/users/list/slice';
import {
  selectHasAnyCheckboxChecked,
  selectIsAllCheckboxChecked
} from 'store/slices/users/list/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import React from 'react';

const TableHeader = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const isAllCheckboxChecked = useTypedSelector(selectIsAllCheckboxChecked);
  const hasAnyCheckboxChecked = useTypedSelector(selectHasAnyCheckboxChecked);
  const handleAllCheckbox = () => {
    dispatch(fillAllCheckbox());
  };
  return (
    <TableHead className="elev-1">
      <TableRow>
        <TableCell className="bg-white border-0 p4">
          <CatCheckbox
            checked={isAllCheckboxChecked}
            indeterminate={!isAllCheckboxChecked && hasAnyCheckboxChecked}
            onClick={handleAllCheckbox}
            paddingSize="medium"
          />
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('users.list.headers.asset_management')}
          </CatTypography>
        </TableCell>
        <TableCell align="center" className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('users.list.headers.add_per')}
          </CatTypography>
        </TableCell>
        <TableCell align="center" className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('users.list.headers.first')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('users.list.headers.last')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('users.list.headers.branches')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold noWrap" noBreak variant="caption">
            {t('users.list.headers.date_added')}
          </CatTypography>
        </TableCell>
        <TableCell className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('users.list.headers.last_update')}
          </CatTypography>
        </TableCell>
        <TableCell align="center" className="bg-white border-0">
          <CatTypography className="opacity-8 font-bold" noBreak variant="caption">
            {t('users.list.headers.status')}
          </CatTypography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
