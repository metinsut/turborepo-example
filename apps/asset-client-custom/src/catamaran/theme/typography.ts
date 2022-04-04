import { TypographyOptions } from '@mui/material/styles/createTypography';
import palette from '../colors/palette';

const options: TypographyOptions = {
  body1: {
    color: palette.text.primary,
    fontSize: '13px',
    letterSpacing: '-0.05px',
    lineHeight: '18.28px'
  },
  body2: {
    color: palette.text.primary,
    fontSize: '11px',
    letterSpacing: '-0.04px',
    lineHeight: '13px'
  },
  button: {
    color: palette.text.primary,
    fontSize: '11px',
    lineHeight: '15.47px',
    textAlign: 'right'
  },
  caption: {
    color: palette.text.primary,
    fontSize: '9px',
    lineHeight: '10.8px'
  },
  fontFamily: ['"Inter"', '"Roboto"', '"Helvetica"', 'Arial', 'sans-serif'].join(','),
  h1: {
    color: palette.text.primary,
    fontSize: '24px',
    fontWeight: 400,
    letterSpacing: '-0.24px',
    lineHeight: '28.8px'
  },
  h2: {
    color: palette.text.primary,
    fontSize: '18px',
    fontWeight: 500,
    letterSpacing: '-0.24px',
    lineHeight: '21.6px'
  },
  h3: {
    color: palette.text.primary,
    fontSize: '24px',
    fontWeight: 500,
    letterSpacing: '-0.06px',
    lineHeight: '28px'
  },
  h4: {
    color: palette.text.primary,
    fontSize: '20px',
    fontWeight: 500,
    letterSpacing: '-0.06px',
    lineHeight: '24px'
  },
  h5: {
    color: palette.text.primary,
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '-0.05px',
    lineHeight: '20px'
  },
  h6: {
    color: palette.text.primary,
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '-0.05px',
    lineHeight: '20px'
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase'
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: '15px',
    letterSpacing: '-0.05px',
    lineHeight: '18px'
  },
  subtitle2: {
    color: palette.text.primary,
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '-0.05px',
    lineHeight: '16.8px'
  }
};

export default options;
