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
import React, { useState } from 'react';
import ToggleButton, {
  ColorTypes,
  Props as ToggleProps
} from 'catamaran/core/ToggleButton/ToggleButton';
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

type Props = {
  className?: string;
};

function ExampleToggle(props: ToggleProps) {
  const [selected, setSelected] = useState(false);
  return (
    <ToggleButton
      color="red"
      icon={<Check />}
      onChange={() => setSelected(!selected)}
      selected={selected}
      subtitle="834"
      title="Usable"
      {...props}
    />
  );
}

const colors: ColorTypes[] = ['blue', 'darkGrey', 'green', 'grey', 'orange', 'red', 'yellow'];

function SelectableButtons(props: Props) {
  const classes = useStyles();
  const { className } = props;

  return (
    <TableContainer className={clsx(classes.root, className)} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>color</TableCell>
            <TableCell>small</TableCell>
            <TableCell>medium</TableCell>
            <TableCell>large</TableCell>
            <TableCell>xLarge</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {colors.map((color) => (
            <TableRow key={color}>
              <TableCell>{color}</TableCell>
              <TableCell>
                <div className="grid gap-8 p4">
                  <ExampleToggle color={color} size="small" title="standard" />
                  <ExampleToggle closable color={color} size="small" title="closable" />
                  <ExampleToggle color={color} reverse size="small" title="reverse" />
                </div>
              </TableCell>
              <TableCell>
                <div className="grid gap-8 p4">
                  <ExampleToggle color={color} size="medium" title="standard" />
                  <ExampleToggle closable color={color} size="medium" title="closable" />
                  <ExampleToggle color={color} reverse size="medium" title="reverse" />
                </div>
              </TableCell>
              <TableCell style={{ width: '200px' }}>
                <div className="grid gap-8 p4">
                  <ExampleToggle color={color} size="large" title="standard" />
                  <ExampleToggle closable color={color} size="large" title="closable" />
                  <ExampleToggle color={color} reverse size="large" title="reverse" />
                </div>
              </TableCell>
              <TableCell>
                <div className="grid gap-8 p4">
                  <ExampleToggle color={color} size="xLarge" title="standard" />
                  <ExampleToggle closable color={color} size="xLarge" title="closable" />
                  <ExampleToggle color={color} reverse size="xLarge" title="reverse" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SelectableButtons;
