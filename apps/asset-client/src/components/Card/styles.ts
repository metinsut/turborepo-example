import { Theme, makeStyles } from 'catamaran/core/mui';

export const useStyles = makeStyles((theme: Theme) => ({
  cardContent: {},
  cardLeftPanel: {
    backgroundColor: theme.palette.darkGrey[100],
    borderRadius: 16,
    height: '100%',
    maxWidth: 32,
    padding: theme.spacing(0.5, 0)
  },
  cardRightPanel: {
    padding: theme.spacing(1.5, 1.5)
  },
  cardRoot: {
    '&.assigned': {
      '& $cardLeftPanel': {
        backgroundColor: theme.palette.info[400]
      },
      backgroundColor: theme.palette.info[400]
    },
    '&.assigned.hover': {
      '& $cardLeftPanel': {
        backgroundColor: theme.palette.info[400]
      },
      backgroundColor: theme.palette.info[400]
    },
    '&.hover': {
      '& $cardLeftPanel': {
        backgroundColor: theme.palette.info[400]
      },
      borderColor: theme.palette.info[400],
      borderStyle: 'dashed',
      color: theme.palette.common.white
    },
    borderColor: theme.palette.darkGrey[100],
    borderRadius: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: 'none'
  },
  hidden: {
    // visibility: 'hidden'
  },
  root: {}
}));
