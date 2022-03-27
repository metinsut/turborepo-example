import { AccordionProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '../Box';
import ChevronDownIcon from 'catamaran/icons/ChevronDown';
import React from 'react';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiAccordionDetails-root': {
        padding: 0
      },
      '& .MuiAccordionSummary-root': {
        padding: 0
      },
      boxShadow: 'none',
      padding: '0px 24px 16px 32px',
      width: 'auto'
    },
    title: {
      marginLeft: '16px',
      opacity: '0.8'
    }
  })
);

type PanelProps = AccordionProps & {
  icon?: React.ReactNode;
  title: React.ReactNode | String;
};

function AccordionPanel(props: PanelProps, ref: React.Ref<any>) {
  const classes = useStyles();
  const { children, className, icon, title, ...rest } = props;

  return (
    <Box>
      <Accordion className={clsx(classes.root, className)} ref={ref} {...rest}>
        <Box marginRight="8px">
          <AccordionSummary
            aria-controls="panel1a-content"
            expandIcon={<ChevronDownIcon color="darkGrey" />}
            id="panel1a-header"
          >
            <Box center flex>
              {icon}
              <Typography className={classes.title} variant="h2">
                {title}
              </Typography>
            </Box>
          </AccordionSummary>
        </Box>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default React.forwardRef(AccordionPanel);
