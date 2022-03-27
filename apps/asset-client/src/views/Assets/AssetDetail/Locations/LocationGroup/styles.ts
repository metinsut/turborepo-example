import { Theme, makeStyles } from 'catamaran/core/mui';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '75vh !important'
  },
  locationItem: {
    marginBottom: 5
  },
  root: {
    borderRadius: theme.spacing(2),
    minWidth: 357,
    width: 357
  }
}));
