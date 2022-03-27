import palette from '../../colors/palette';

export default {
  root: {
    '&$hover': {
      '&:hover': {
        backgroundColor: palette.background.default
      }
    },
    '&.Mui-selected': {
      '&:hover': {
        backgroundColor: palette.background.default
      },
      background: palette.background.default,
      boxShadow: ' 0px 1px 2px rgba(var(--main-darkgray), 0.1)'
    },
    height: '36px'
  }
};
