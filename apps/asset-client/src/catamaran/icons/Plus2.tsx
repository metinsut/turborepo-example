import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

function Plus2Icon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <g opacity={0.8} stroke="currentColor" strokeLinecap="round" strokeWidth={2}>
        <path d="M9 12h6M12 15V9" />
      </g>
    </IconBase>
  );
}

export default Plus2Icon;
