export default {
  root: {
    // Input Field padding. Added paddings on outer div. Set input field paddings to 0 to avoid double padding.
    '& .MuiFilledInput-root': {
      paddingTop: '0px'
    },
    '& .MuiFilledInput-root.MuiInputBase-sizeSmall': {
      paddingBottom: '0px'
    },
    // Input Field padding. Added for fixing freesolo height and no input label position. Original autocomplete no input label padding values.
    '& .MuiFilledInput-root.MuiInputBase-sizeSmall .MuiFilledInput-input': {
      padding: '13px 0px 9px 0px'
    }
  }
};
