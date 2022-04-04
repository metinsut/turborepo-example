import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

const NoneIcon = (props: Props) => (
  <IconBase {...props} viewBox="0 0 16 16">
    <g opacity={0.6} stroke="currentColor" strokeLinecap="round" strokeWidth={2}>
      <path d="m6.4 9.6 3.2-3.2M9.6 9.6 6.4 6.4" />
    </g>
  </IconBase>
);

export default NoneIcon;
