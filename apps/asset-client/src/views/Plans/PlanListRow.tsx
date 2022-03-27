import { CatIconButton, useLocalizationHelpers } from 'catamaran/core';
import { Plan } from 'store/slices/plans/types';
import { TableCell, TableRow, Theme, makeStyles } from 'catamaran/core/mui';
import { selectContractById } from 'store/slices/contracts/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import EditIcon from 'catamaran/icons/Edit';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginLeft: '3px'
  },
  root: {
    cursor: 'pointer'
  }
}));

type Props = {
  className?: string;
  plan: Plan;
  onPlanEdit: (planId: string) => void;
};

function PlanListRow(props: Props) {
  const classes = useStyles();
  const { className, plan, onPlanEdit } = props;
  const { t } = useTranslation();

  const planTypeResource = plan ? t(`plans.types.${plan.type}`) : '';
  const { formatDate } = useLocalizationHelpers();

  const contract = useTypedSelector((state) => selectContractById(state, plan.contractId));
  return (
    <TableRow className={clsx(className, classes.root)} hover onClick={() => onPlanEdit(plan.id)}>
      <TableCell className="break-word" component="th" scope="row">
        {plan.title}
      </TableCell>
      <TableCell align="right">{planTypeResource}</TableCell>
      <TableCell align="right" className="break-word">
        {contract?.title ?? ''}
      </TableCell>
      <TableCell align="right">{formatDate(plan.startDate)}</TableCell>
      <TableCell align="right">{formatDate(plan.endDate)}</TableCell>
      <TableCell align="right">
        <CatIconButton className={classes.iconButton}>
          <EditIcon color="blue" contained fontSize="medium" />
        </CatIconButton>
      </TableCell>
    </TableRow>
  );
}

export default PlanListRow;
