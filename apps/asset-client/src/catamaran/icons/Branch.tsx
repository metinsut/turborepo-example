import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

const BranchIcon = (props: Props) => (
    <IconBase {...props}>
      <rect fill="currentColor" height={4.5} rx={1} width={4.5} x={4.5} y={14} />
      <rect fill="currentColor" height={4.5} rx={1} width={4.5} x={9.75} y={3.5} />
      <path
        d="M12 8.75v4.5M12 11H8.25a1.5 1.5 0 00-1.5 1.5v.75M12 11h3.75a1.5 1.5 0 011.5 1.5v.75"
        stroke="currentColor"
      />
      <rect fill="currentColor" height={4.5} rx={1} width={4.5} x={15} y={14} />
      <rect fill="currentColor" height={4.5} rx={1} width={4.5} x={9.75} y={14} />
    </IconBase>
  );

export default BranchIcon;
