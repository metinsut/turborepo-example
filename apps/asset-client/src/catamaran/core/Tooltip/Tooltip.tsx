import { Tooltip as MuiTooltip, Theme, TooltipProps, Typography } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.lightGrey.main
  },
  tooltip: {
    background: theme.palette.lightGrey.main,
    backgroundColor: theme.palette.lightGrey.main,
    color: theme.palette.darkGrey.main
  }
}));

const Tooltip = ({ children, disableInteractive = false, title, ...rest }: TooltipProps) => {
  const classes = useStyles();
  return (
    <MuiTooltip
      classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
      disableInteractive={disableInteractive}
      title={<Typography variant="caption">{title}</Typography>}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
