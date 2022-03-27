import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

const ExclamationIcon = (props: Props) => (
  <IconBase {...props} viewBox="0 0 32 32">
    <path
      d="M6.307 10.322a2.508 2.508 0 114.986 0l-.94 8.517a1.563 1.563 0 01-3.107 0l-.939-8.517z"
      fill="currentColor"
    />
    <ellipse cx={8.8} cy={23.051} fill="currentColor" rx={1.4} ry={1.41} />
    <g fill="currentColor" opacity={0.6}>
      <path d="M13.507 10.322a2.508 2.508 0 114.986 0l-.94 8.517a1.563 1.563 0 01-3.107 0l-.939-8.517z" />
      <ellipse cx={16} cy={23.051} rx={1.4} ry={1.41} />
    </g>
    <g fill="currentColor" opacity={0.2}>
      <path d="M20.707 10.322a2.508 2.508 0 114.986 0l-.94 8.517a1.563 1.563 0 01-3.107 0l-.939-8.517z" />
      <ellipse cx={23.2} cy={23.051} rx={1.4} ry={1.41} />
    </g>
  </IconBase>
);

export default ExclamationIcon;
