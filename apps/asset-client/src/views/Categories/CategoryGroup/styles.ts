import { Theme, makeStyles } from 'catamaran/core/mui';

export const useStyles = makeStyles((theme: Theme) => ({
  activeDropZone: {
    borderStyle: 'dashed',
    borderWidth: 'thin'
  },
  categoryItem: {
    marginBottom: 5
  },
  checkbox: {
    marginTop: 2
  },
  checkboxLabel: {
    '& >span': {
      marginLeft: 4
    },
    marginLeft: 8
  },
  container: {},
  content: {
    padding: theme.spacing(4, 2.5)
  },
  deleteButton: {
    '& .MuiBadge-badge': {
      background: theme.palette.redGradient.main,
      border: `1px solid ${theme.palette.common.white}`,
      fontSize: 7,
      fontWeight: 400,
      height: 13,
      minWidth: 13,
      padding: 3,
      right: 6,
      top: 5
    },
    backgroundColor: theme.palette.common.white,
    marginBottom: '-22px',
    marginTop: '-11px',
    padding: 2,
    zIndex: 1
  },
  divider: {
    height: '1px',
    margin: theme.spacing(1, 0)
  },
  header: {
    maxWidth: 200,
    textAlign: 'center'
  },
  root: {
    borderRadius: theme.spacing(2),
    minWidth: 357,
    width: 357
  },
  top: {
    height: theme.spacing(6)
  }
}));
