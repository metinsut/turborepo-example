import { styled } from 'catamaran/core/mui';
import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

const IconBaseStyled = styled(IconBase)(({ theme }) => ({
  color: theme.palette.red.main,
  width: '14px'
}));

function InvalidFieldIcon(props: Props) {
  return (
    <IconBaseStyled {...props} viewBox="0 0 13 13">
      <circle cx="6.5" cy="6.5" fill="currentColor" r="3.5" />
      <circle cx="6.5" cy="6.5" r="4" stroke="white" strokeLinecap="round" />
      <g transform="translate(0,1)">
        <path
          clipRule="evenodd"
          d="M6.5 3.75C6.74162 3.75 6.9375 3.94588 6.9375 4.1875L6.9375 6.8125C6.9375 7.05412 6.74162 7.25 6.5 7.25C6.25838 7.25 6.0625 7.05412 6.0625 6.8125L6.0625 4.1875C6.0625 3.94588 6.25838 3.75 6.5 3.75Z"
          fill="white"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M4.98437 6.37498C4.86356 6.16573 4.93526 5.89816 5.14451 5.77734L7.41783 4.46484C7.62708 4.34403 7.89465 4.41573 8.01546 4.62498C8.13628 4.83423 8.06458 5.1018 7.85533 5.22262L5.58201 6.53512C5.37276 6.65593 5.10519 6.58423 4.98437 6.37498Z"
          fill="white"
          fillRule="evenodd"
        />
        <path
          clipRule="evenodd"
          d="M5.03809 4.62547C5.1589 4.41622 5.42647 4.34452 5.63572 4.46533L7.90904 5.77783C8.11829 5.89864 8.18999 6.16622 8.06917 6.37547C7.94836 6.58472 7.68079 6.65642 7.47154 6.5356L5.19822 5.2231C4.98897 5.10229 4.91727 4.83472 5.03809 4.62547Z"
          fill="white"
          fillRule="evenodd"
        />
      </g>
    </IconBaseStyled>
  );
}

export default InvalidFieldIcon;
