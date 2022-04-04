import { CatButton } from 'catamaran/core';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  makeStyles
} from 'catamaran/core/mui';
import { Plan } from 'store/slices/plans/types';
import { startPlanFlow } from 'store/slices/contractplans/wizard/slice';
import { useTranslation } from 'react-i18next';
import ContractPlanWizard from 'views/Contracts/ContractWizard/ContractPlanWizard';
import PlanListRow from './PlanListRow';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  headerRow: {
    '& .MuiTableCell-head': {
      backgroundColor: '#fafafa'
    }
  },
  root: {
    borderRadius: theme.spacing(2),
    height: '38vh',
    marginTop: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
  loading: boolean;
  onPlanEdit: (planId: string) => void;
  plans: Plan[];
};

function PlanList(props: Props) {
  const classes = useStyles();
  const { className, loading, onPlanEdit, plans } = props;

  const { t } = useTranslation();
  const [addButtonLoading, addButtonLoadingDispatch] = useLoading();

  const [wizardOpen, setWizardOpen] = React.useState(false);
  const handleWizardOpen = async () => {
    await addButtonLoadingDispatch(startPlanFlow());
    setWizardOpen(true);
  };

  const handleClose = () => {
    setWizardOpen(false);
  };

  return (
    <>
      <TableContainer className={clsx(classes.root, className)} component={Paper}>
        <Table size="small" stickyHeader>
          <TableHead className={classes.headerRow}>
            <TableRow>
              <TableCell>{t('plans.plan_list.plan_list_title')}</TableCell>
              <TableCell align="right">{t('plans.type_field')}</TableCell>
              <TableCell align="right">{t('plans.contract_title_field')}</TableCell>
              <TableCell align="right">{t('plans.start_date_field')}</TableCell>
              <TableCell align="right">{t('plans.end_date_field')}</TableCell>
              <TableCell align="right">
                <CatButton
                  color="green"
                  endIcon={<PlusIcon />}
                  loading={addButtonLoading}
                  onClick={handleWizardOpen}
                >
                  {t('plans.plan_list.add_new_button')}
                </CatButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan) => (
              <PlanListRow key={plan.id} onPlanEdit={onPlanEdit} plan={plan} />
            ))}

            {loading && (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ContractPlanWizard onClose={handleClose} open={wizardOpen} />
    </>
  );
}

export default PlanList;
