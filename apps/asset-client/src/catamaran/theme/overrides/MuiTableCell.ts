import palette from '../../colors/palette';
import typography from '../typography';

export default {
  root: {
    ...typography.body1,
    borderBottom: `1px solid ${palette.divider}`,
    padding: '3px 12px'
  }
};
