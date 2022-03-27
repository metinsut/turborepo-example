import { Theme, makeStyles } from 'catamaran/core/mui';

export const useStyles = makeStyles((theme: Theme) => ({
  activeListItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    textDecoration: 'none'
  },
  checkButton: {
    backgroundColor: '#ECFBF7',
    color: theme.palette.success.main
  },
  clearInput: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#69C9FF !important'
      }
    }
  },
  content: {
    borderRadius: 16,
    maxHeight: 128,
    padding: theme.spacing(2, 1, 2, 0)
  },
  displayFirstInput: {
    width: '24.29022082018927%' // 77px
  },
  displaySecondInput: {
    width: '75.0788643533123%' // 238px
  },
  dragButton: {
    padding: 0
  },
  dragIcon: {
    fontSize: 15,
    marginLeft: -4.375
  },
  draggableFirstInput: {
    width: '30.28391167192429%' // 96px
  },
  draggableSecondInput: {
    width: '69.08517350157729%' // 219px
  },
  expandIconButton: {
    marginRight: theme.spacing(-1),
    padding: theme.spacing(1)
  },
  firstInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(2, 0, 0, 2)
    }
  },
  firstInputContainer: {
    marginRight: 2
  },
  formInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(1)
    }
  },
  hover: {
    // backgroundColor: colors.green[100]
  },
  iconButton: {
    marginLeft: theme.spacing(1)
  },
  input: {
    '& .MuiFormHelperText-root.Mui-error': {
      backgroundColor: 'white',
      fontSize: 9,
      fontWeight: 400,
      marginBottom: -5,
      marginTop: -5,
      width: 'fit-content',
      zIndex: 100
    },
    '& .MuiInputLabel-root': {
      transform: 'translate(14px, -6px) scale(0.75)'
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiInputBase-input': {
        fontSize: 11,
        lineHeight: '15px',
        paddingBottom: 10,
        paddingTop: 10
      },
      '& fieldset': {
        '& legend': {
          // white bg behind label
          fontSize: '9.75px'
        },
        borderWidth: 0
      },
      '&.Mui-focused': {
        backgroundColor: '#FFFFFF',
        paddingRight: 6
      },
      '&.Mui-focused fieldset': {
        borderWidth: 1
      },
      backgroundColor: '#F3F5F6',
      height: 32
    }
  },
  notReadonlyInput: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-error fieldset': {
        borderWidth: 1
      }
    }
  },
  outerContainer: {
    width: '100%'
  },
  readonlyInput: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderWidth: 0
      },
      backgroundColor: '#F3F5F6 !important',
      paddingRight: 8
    },
    '&.expandedInput .MuiOutlinedInput-root': {
      backgroundColor: `${theme.palette.info.main} !important`,
      color: theme.palette.info.contrastText,
      fontWeight: 700
    }
  },
  root: {},
  scrollContainer: {
    maxHeight: 96
  },
  searchDropdownText: {
    padding: theme.spacing(1)
  },
  secondInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(0, 2, 2, 0)
    }
  },
  selectableFirstInput: {
    width: '26%' // 85px,
  },
  selectableSecondInput: {
    width: '72%' // 230px
  },
  selectedInput: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderWidth: 0
      },
      backgroundColor: '#D9F8ED !important',
      fontWeight: 'bold'
    }
  },
  singleInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(2, 2, 2, 2)
    }
  },
  validInput: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#40DBA3'
      }
    }
  }
}));
