import { Box, CatAccordionPanel } from 'catamaran/core';
import { Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import EditIcon from 'catamaran/icons/Edit';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
};

function AccordionPanels(props: Props) {
  const classes = useStyles();
  const { className } = props;

  return (
    <Paper className={clsx(classes.root, className)} elevation={0}>
      <Box flex width="100%">
        <CatAccordionPanel
          defaultExpanded
          icon={<EditIcon color="darkGrey" hoverable={false} />}
          title="Test Panel Title"
        >
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </CatAccordionPanel>
      </Box>
    </Paper>
  );
}

export default AccordionPanels;
