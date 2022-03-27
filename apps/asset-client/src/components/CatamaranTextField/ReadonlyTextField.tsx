import { Box, Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

type StyleProps = {
  disabled: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  alignSelf: {
    alignSelf: 'center'
  },
  itemContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap'
  },
  label: {
    color: theme.palette.darkGrey[600]
    // position: 'absolute',
    // transform: 'translate(8px, 11px) scale(1)'
  },
  labelShrinked: {
    fontSize: '9px',
    lineHeight: '10.8px',
    marginTop: '-5px'
  },
  mainText: (props: StyleProps) => ({
    opacity: props.disabled ? 0.5 : 1
  }),
  root: (props: StyleProps) => ({
    alignContent: 'center',
    backgroundColor: props.disabled ? theme.palette.lightGrey[400] : theme.palette.lightGrey.main,
    borderRadius: theme.spacing(1),
    display: 'grid',
    height: '40px',
    padding: theme.spacing(0, 1),
    width: '100%'
  })
}));

type Props = {
  className?: string;
  disabled?: boolean;
  endAdornment?: React.ReactNode;
  label?: string | React.ReactNode;
  startAdornment?: React.ReactNode;
  text?: string;
};

function ReadonlyTextField(props: Props) {
  const { className, disabled = false, endAdornment, label, startAdornment, text } = props;
  const classes = useStyles({ disabled });

  return (
    <Box
      className={clsx({
        [className]: true,
        [classes.root]: true
      })}
    >
      <Grid container item zeroMinWidth>
        <Grid className={classes.itemContainer} item>
          {startAdornment}
        </Grid>
        <Grid className={classes.alignSelf} item xs zeroMinWidth>
          <Typography
            className={clsx({
              [classes.label]: true,
              [classes.labelShrinked]: !!text
            })}
            variant="body1"
          >
            {label}
          </Typography>
          {!!text && (
            <Typography className={classes.mainText} noWrap variant="body1">
              {text}
            </Typography>
          )}
        </Grid>
        <Grid className={classes.itemContainer} item>
          {endAdornment}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReadonlyTextField;
