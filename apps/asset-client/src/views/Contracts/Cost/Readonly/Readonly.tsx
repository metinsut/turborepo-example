import { Box, CatButton } from 'catamaran/core';
import { Cost } from 'store/slices/contracts/types';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import AnnualCost from './AnnualCost';
import CloseIcon from 'catamaran/icons/Close';
import CostForEachCategory from './CostForEachCategory';
import EditIcon from 'catamaran/icons/Edit';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import TotalCost from './TotalCost';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  cost?: Cost;
  onAddButtonClick: () => void;
};

function Readonly(props: Props) {
  const classes = useStyles();
  const { cost, onAddButtonClick } = props;
  const { t } = useTranslation();

  if (!cost) {
    return (
      <>
        <Box alignItems="center" className="opacity-8" display="flex" mb={1}>
          <CloseIcon fontSize="large" />
          <Typography variant="subtitle1">{t('contracts.edit.no_costs_added_yet')}</Typography>
        </Box>
        <CatButton color="green" endIcon={<PlusIcon />} onClick={onAddButtonClick} size="small">
          {t('common.add')}
        </CatButton>
      </>
    );
  }

  let content = null;
  if (cost.type === 'total') {
    content = <TotalCost cost={cost} />;
  } else if (cost.type === 'annual') {
    content = <AnnualCost cost={cost} />;
  } else {
    content = <CostForEachCategory cost={cost} />;
  }

  return (
    <>
      <Box alignItems="center" display="flex" my={2}>
        {content}
      </Box>
      <CatButton color="blue" endIcon={<EditIcon />} onClick={onAddButtonClick} size="small">
        {t('common.edit')}
      </CatButton>
    </>
  );
}

export default Readonly;
