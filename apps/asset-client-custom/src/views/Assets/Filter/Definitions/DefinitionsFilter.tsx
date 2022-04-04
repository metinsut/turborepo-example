import { Box, CatAccordionPanel } from 'catamaran/core';
import { Paper, Theme, makeStyles } from 'catamaran/core/mui';
import { definitionPlanTypes } from 'store/slices/asset/filter/data';
import ContractIcon from 'catamaran/icons/Contract';
import PlanFilter from './PlanFilter';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  drawerOpen: boolean;
};

function DefinitionsFilter(props: Props) {
  const classes = useStyles();
  const { className, drawerOpen } = props;

  return (
    <Paper className={clsx('w-full', className)} elevation={0}>
      <Box flex flexDirection="column" width="100%">
        <CatAccordionPanel
          defaultExpanded
          icon={<ContractIcon color="darkGrey" hoverable={false} />}
          title="Definitions"
        >
          {drawerOpen && (
            <Box flex flexDirection="column" width="100%">
              {definitionPlanTypes.map((type) => (
                <PlanFilter key={type} planType={type} />
              ))}
            </Box>
          )}
        </CatAccordionPanel>
      </Box>
    </Paper>
  );
}

export default DefinitionsFilter;
