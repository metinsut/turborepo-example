import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

function PassiveIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path
        d="M6 15h3l-3 3h3M10.5 10.5h3l-3 3h3M15 6h3l-3 3h3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </IconBase>
  );
}

export default PassiveIcon;
