import { Box } from 'catamaran/core';
import { styled } from 'catamaran/core/mui';
import fadeColor from '../../catamaran/colors/fadeColor';

export const ColumnTitle = styled(Box)(({ theme }) => ({
  alignSelf: 'center',
  borderLeft: '1px solid #dedede',
  color: fadeColor(theme.palette.darkGrey.main, 0.7),
  fontSize: '9px',
  paddingLeft: '6px'
}));
