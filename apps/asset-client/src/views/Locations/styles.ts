import { Theme, makeStyles } from 'catamaran/core/mui';

export const useStyles = makeStyles((theme: Theme) => ({
  addButton: {
    width: 180
  },
  bottom: {
    marginBottom: theme.spacing(1.5)
  },
  checkbox: {
    '&.Mui-checked': {
      color: theme.palette.success.main
    },
    fontSize: 16,
    marginLeft: -2,
    padding: 0
  },
  checkboxLabel: {
    marginBottom: theme.spacing(1),
    marginLeft: 8
  },
  deleteButton: {
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette.darkGrey.main,
      border: `1px solid ${theme.palette.common.white}`,
      fontSize: 7,
      fontWeight: 400,
      height: 13,
      minWidth: 13,
      padding: 3,
      right: 3,
      top: 3
    },
    marginBottom: '-12px',
    marginTop: '-5px',
    zIndex: 1
  },
  displayOnlyIcon: {
    height: theme.spacing(10),
    width: theme.spacing(10)
  },
  divider: {
    backgroundColor: 'lightGrey',
    height: '1px',
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  emptyLocationItem: {
    height: 37,
    visibility: 'hidden',
    width: '100%'
  },
  header: {},
  headerGrid: {
    padding: theme.spacing(2, 1)
  },
  iconButton: {
    marginLeft: '3px'
  },
  locationItem: {
    width: '100%'
  },
  root: {
    borderRadius: theme.spacing(2),
    height: '75vh',
    minWidth: 288,
    padding: theme.spacing(0, 2.5),
    width: 288
  },
  searchResultBottomDivider: {
    marginBottom: 5,
    marginTop: -5
  },
  subheader: {
    padding: theme.spacing(0, 1, 1)
  },
  top: {
    height: theme.spacing(6)
  }
}));
