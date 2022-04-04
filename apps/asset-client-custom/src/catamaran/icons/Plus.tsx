import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

function PlusIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path
        d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
        opacity="0.1"
      />
      <path d="M8 11.9999L16 11.9999" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path
        d="M12 15.9999L12 7.99994"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </IconBase>
  );
}

export default PlusIcon;
