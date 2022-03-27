import { Grid, Paper, Theme, ToggleButtonGroup, makeStyles } from 'catamaran/core/mui';
import PeriodSelector from 'components/PeriodSelector';
import React, { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 10
  }
}));

type Props = {
  className?: string;
};

function PeriodSelectors(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const [selected, setSelected] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selectedDay, setSelectedDay] = React.useState(() => []);
  const [selectedOption, setSelectedOption] = React.useState<string | null>();

  const handleDayChanged = (event: React.MouseEvent<HTMLElement>, newDay: string[]) => {
    setSelectedDay(newDay);
  };

  const handleOptionChanged = (event: React.MouseEvent<HTMLElement>, newOption: string | null) => {
    setSelectedOption(newOption);
  };

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid container style={{ padding: 10 }}>
        <PeriodSelector onChange={() => setSelected(!selected)} selected={selected}>
          Daily
        </PeriodSelector>
      </Grid>
      <Grid container style={{ padding: 10 }}>
        <PeriodSelector onChange={() => setSelected2(!selected2)} selected={selected2} size="small">
          Mo
        </PeriodSelector>
      </Grid>
      <Grid container style={{ padding: 10 }}>
        <ToggleButtonGroup onChange={handleDayChanged} value={selectedDay}>
          <PeriodSelector size="small" value="monday">
            Mo
          </PeriodSelector>
          <PeriodSelector size="small" value="tuesday">
            Tue
          </PeriodSelector>
          <PeriodSelector size="small" value="wednesday">
            Wed
          </PeriodSelector>
          <PeriodSelector size="small" value="thursday">
            Thu
          </PeriodSelector>
          <PeriodSelector size="small" value="friday">
            Fri
          </PeriodSelector>
        </ToggleButtonGroup>
      </Grid>
      <Grid container style={{ padding: 10 }}>
        <ToggleButtonGroup exclusive onChange={handleOptionChanged} value={selectedOption}>
          <PeriodSelector value="month">Every Month</PeriodSelector>
          <PeriodSelector value="trimonth">
            Every
            <br />3 Month
          </PeriodSelector>
          <PeriodSelector value="sixmonth">
            Every
            <br />6 Month
          </PeriodSelector>
          <PeriodSelector value="year">Every Year</PeriodSelector>
          <PeriodSelector value="twoyear">
            Every
            <br />2 Years
          </PeriodSelector>
          <PeriodSelector value="weekly">Weekly</PeriodSelector>
          <PeriodSelector value="daily">Daily</PeriodSelector>
        </ToggleButtonGroup>
      </Grid>
    </Paper>
  );
}

export default PeriodSelectors;
