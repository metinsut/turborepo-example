import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

function VariableIcon(props: Props) {
  return (
    <IconBase {...props}>
      <g fill="currentColor" opacity={0.8}>
        <rect height={2} rx={1} width={12} x={6} y={6} />
        <rect height={2} rx={1} width={7} x={11} y={11} />
        <rect height={2} rx={1} width={12} x={6} y={16} />
        <path d="M9.467 11.6 6.8 9.6a.5.5 0 0 0-.8.4v4a.5.5 0 0 0 .8.4l2.667-2a.5.5 0 0 0 0-.8Z" />
      </g>
    </IconBase>
  );
}

export default VariableIcon;
