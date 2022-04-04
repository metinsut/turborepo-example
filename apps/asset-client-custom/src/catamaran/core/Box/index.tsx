import { BoxProps, Box as MuiBox } from '@mui/material';
import { styled } from 'catamaran/core/mui';

export type Props = Omit<BoxProps, 'flex'> & {
  bg?: string;
  cursor?: boolean;
  opacity?: any;
  flex?: boolean;
  row?: boolean;
  col?: boolean;
  center?: boolean;
  background?: string;
};

const StyledBox = styled(MuiBox)({
  '&.DS-center': {
    alignItems: 'center',
    justifyContent: 'center'
  },
  '&.DS-col': {
    flexDirection: 'column'
  },
  '&.DS-cursor': {
    cursor: 'pointer'
  },
  '&.DS-flex': {
    display: 'flex'
  },
  '&.DS-row': {
    flexDirection: 'row'
  }
});

function Box(props: Props) {
  const {
    children,
    bg,
    background,
    cursor,
    opacity,
    style,
    flex,
    row,
    col,
    center,
    className: _,
    ...rest
  } = props;
  let { className } = props;
  className = center ? `${className} DS-center` : className;
  className = cursor ? `${className} DS-cursor` : className;
  className = flex ? `${className} DS-flex` : className;
  className = row ? `${className} DS-row` : className;
  className = col ? `${className} DS-col` : className;

  return (
    <StyledBox
      {...rest}
      className={className}
      style={{
        ...(bg ? { backgroundColor: bg } : {}),
        ...(opacity ? { opacity } : {}),
        ...(typeof flex === 'string' ? { flex } : {}),
        ...(background ? { background } : {}),
        ...style
      }}
    >
      {children}
    </StyledBox>
  );
}

export default Box;
