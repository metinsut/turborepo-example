import {
  Box,
  CatButton,
  CatButtonProps,
  CatColorTypes,
  CatMultiActionResultButton,
  CatResultAction
} from 'catamaran/core';
import {
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
import { useTranslation } from 'react-i18next';
import CheckIcon from 'catamaran/icons/Check';
import ExpandIcon from 'catamaran/icons/Expand';
import ImportIcon from 'catamaran/icons/Import';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  table: {
    backgroundColor: '#FFF',
    minWidth: 650
  }
}));

type PageProps = {
  className?: string;
};

function ExampleButton(props: CatButtonProps) {
  const { t } = useTranslation();
  return (
    <CatButton endIcon={<ImportIcon />} onClick={() => {}} {...props}>
      {t('categories.import_categories_button')}
    </CatButton>
  );
}

const colors: CatColorTypes[] = ['blue', 'darkGrey', 'green', 'orange', 'red'];

function Buttons(props: PageProps) {
  const classes = useStyles();
  const { className } = props;

  return (
    <Box>
      <TableContainer className={clsx(classes.root, className)} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>color</TableCell>
              <TableCell>default - small</TableCell>
              <TableCell>disabled - small</TableCell>
              <TableCell>default - medium</TableCell>
              <TableCell>disabled - medium</TableCell>
              <TableCell>default - large</TableCell>
              <TableCell>disabled - large</TableCell>
              <TableCell>transparent background</TableCell>
              <TableCell>custom hover background</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colors.map((color) => (
              <TableRow key={color}>
                <TableCell>{color}</TableCell>
                <TableCell>
                  <ExampleButton color={color} size="small" />
                </TableCell>
                <TableCell>
                  <ExampleButton color={color} disabled size="small" />
                </TableCell>
                <TableCell>
                  <ExampleButton color={color} size="medium" />
                </TableCell>
                <TableCell>
                  <ExampleButton color={color} disabled size="medium" />
                </TableCell>
                <TableCell>
                  <ExampleButton color={color} size="large" />
                </TableCell>
                <TableCell>
                  <ExampleButton color={color} disabled size="large" />
                </TableCell>
                <TableCell>
                  <ExampleButton backgroundColor="transparent" color={color} size="large" />
                </TableCell>
                <TableCell>
                  <ExampleButton color={color} onHoverBackgroundColor="lime" size="large" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box component={Paper} height="150px" mt={2}>
        <CatMultiActionResultButton
          color="green"
          description="30 valid assets"
          primaryAction={
            <CatResultAction>
              <ExpandIcon />
            </CatResultAction>
          }
          secondaryActions={[
            <CatResultAction key={0}>
              <CheckIcon />
            </CatResultAction>
          ]}
          startIcon={<CheckIcon fontSize="small" />}
          title="Valid Entries"
        />
        <CatMultiActionResultButton
          color="orange"
          description="4 missing categories"
          primaryAction={
            <CatResultAction>
              <ExpandIcon />
            </CatResultAction>
          }
          startIcon={<CheckIcon fontSize="small" />}
          title="Attention! Check Category Definitions"
        />
        <CatMultiActionResultButton
          color="red"
          description="6 assets"
          primaryAction={
            <CatResultAction>
              <ExpandIcon />
            </CatResultAction>
          }
          secondaryActions={[
            <CatResultAction key={0}>
              <CheckIcon />
            </CatResultAction>
          ]}
          startIcon={<CheckIcon fontSize="small" />}
          title="Will Not Upload"
        />
        <CatMultiActionResultButton
          color="darkGrey"
          description="4 new definitions"
          primaryAction={
            <CatResultAction>
              <ExpandIcon />
            </CatResultAction>
          }
          startIcon={<CheckIcon fontSize="small" />}
          title="New Category Definitions"
        />
      </Box>
    </Box>
  );
}

export default Buttons;
