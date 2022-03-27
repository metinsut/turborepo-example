import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

const DragAffordanceIcon = (props: Props) => (
  <IconBase {...props}>
    <circle cx={9.25} cy={17.5} fill="currentColor" r={1.5} transform="rotate(-90 9.25 17.5)" />
    <circle cx={9.25} cy={12} fill="currentColor" r={1.5} transform="rotate(-90 9.25 12)" />
    <circle cx={9.25} cy={6.5} fill="currentColor" r={1.5} transform="rotate(-90 9.25 6.5)" />
    <circle cx={14.75} cy={17.5} fill="currentColor" r={1.5} transform="rotate(-90 14.75 17.5)" />
    <circle cx={14.75} cy={12} fill="currentColor" r={1.5} transform="rotate(-90 14.75 12)" />
    <circle cx={14.75} cy={6.5} fill="currentColor" r={1.5} transform="rotate(-90 14.75 6.5)" />
  </IconBase>
);

export default DragAffordanceIcon;
