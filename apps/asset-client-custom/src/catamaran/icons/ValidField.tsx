import { styled } from 'catamaran/core/mui';
import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

const IconBaseStyled = styled(IconBase)(({ theme }) => ({
  color: theme.palette.green.main,
  width: '14px'
}));

function ValidFieldIcon(props: Props) {
  return (
    <IconBaseStyled {...props} viewBox="0 0 13 13">
      <circle cx="6.5" cy="6.5" fill="currentColor" r="3.5" />
      <circle cx="6.5" cy="6.5" r="4" stroke="white" />
      <g transform="translate(0,1)">
        <path
          d="M5.1875 5.5L6.0625 6.375L6.9375 5.5L7.8125 4.625"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </IconBaseStyled>
  );
}

export default ValidFieldIcon;
