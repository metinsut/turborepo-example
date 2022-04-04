import IconBase, { IconBaseProps } from './IconBase';

const SevenIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <path
      d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Z"
      fill="url(#a)"
      fillOpacity={0.1}
    />
    <path d="m9.56 17 4.23-8.365V8.56H8.913V7.545h6.057v1.071L10.761 17h-1.2Z" fill="#E4756D" />
    <defs>
      <linearGradient gradientUnits="userSpaceOnUse" id="a" x1={12} x2={12} y1={0} y2={24}>
        <stop stopColor="#ED6E76" />
        <stop offset={1} stopColor="#EC816A" />
      </linearGradient>
    </defs>
  </IconBase>
);

export default SevenIcon;
