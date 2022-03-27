import { CatIconButton } from 'catamaran/core';
import { ColorTypes, IconBaseProps } from 'catamaran/icons/IconBase';
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
import Check from 'catamaran/icons/Check';
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

function ExampleIconButton(
  props: IconBaseProps & { disabled?: boolean; backgroundColor?: string }
) {
  const { disabled, backgroundColor, ...rest } = props;
  return (
    <div style={{ backgroundColor, borderRadius: '8px', padding: '16px' }}>
      <CatIconButton disabled={disabled} onClick={() => {}}>
        <Check contained {...rest} />
      </CatIconButton>
    </div>
  );
}

const colors: ColorTypes[] = ['blue', 'darkGrey', 'green', 'red', 'orange'];

const lightColors: { color: ColorTypes; bg: string }[] = [
  { bg: '#69C9FF', color: 'lightBlue' },
  { bg: '#494949', color: 'lightGrey' },
  { bg: '#40DBA3', color: 'lightGreen' },
  { bg: '#E5A071', color: 'lightOrange' },
  { bg: '#E4756D', color: 'lightRed' }
];

function IconButtons(props: PageProps) {
  const classes = useStyles();
  const { className } = props;

  return (
    <TableContainer className={clsx(classes.root, className)} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>color</TableCell>
            <TableCell>default - small</TableCell>
            <TableCell>disabled - small</TableCell>
            <TableCell>default</TableCell>
            <TableCell>disabled</TableCell>
            <TableCell>default - large</TableCell>
            <TableCell>disabled - large</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {colors.map((color) => (
            <TableRow key={color}>
              <TableCell>{color}</TableCell>
              <TableCell>
                <ExampleIconButton color={color} fontSize="small" />
              </TableCell>
              <TableCell>
                <ExampleIconButton color={color} disabled fontSize="small" />
              </TableCell>
              <TableCell>
                <ExampleIconButton color={color} fontSize="medium" />
              </TableCell>
              <TableCell>
                <ExampleIconButton color={color} disabled fontSize="medium" />
              </TableCell>
              <TableCell>
                <ExampleIconButton color={color} fontSize="large" />
              </TableCell>
              <TableCell>
                <ExampleIconButton color={color} disabled fontSize="large" />
              </TableCell>
            </TableRow>
          ))}
          {lightColors.map((colorPair) => (
            <TableRow key={colorPair.color}>
              <TableCell>{colorPair.color}</TableCell>
              <TableCell>
                <ExampleIconButton
                  backgroundColor={colorPair.bg}
                  color={colorPair.color}
                  fontSize="small"
                />
              </TableCell>
              <TableCell>
                <ExampleIconButton
                  backgroundColor={colorPair.bg}
                  color={colorPair.color}
                  disabled
                  fontSize="small"
                />
              </TableCell>
              <TableCell>
                <ExampleIconButton
                  backgroundColor={colorPair.bg}
                  color={colorPair.color}
                  fontSize="medium"
                />
              </TableCell>
              <TableCell>
                <ExampleIconButton
                  backgroundColor={colorPair.bg}
                  color={colorPair.color}
                  disabled
                  fontSize="medium"
                />
              </TableCell>
              <TableCell>
                <ExampleIconButton
                  backgroundColor={colorPair.bg}
                  color={colorPair.color}
                  fontSize="large"
                />
              </TableCell>
              <TableCell>
                <ExampleIconButton
                  backgroundColor={colorPair.bg}
                  color={colorPair.color}
                  disabled
                  fontSize="large"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IconButtons;
