import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

function BlueEyeIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 16 16">
      <circle cx={8} cy={8} fill="url(#a)" r={8} />
      <path
        d="M8 4.667c-1.928 0-3.821 1.594-4.86 2.757a.86.86 0 0 0 0 1.152C4.18 9.74 6.072 11.334 8 11.334c1.962 0 3.978-1.654 4.951-2.821.25-.3.25-.725 0-1.025C11.978 6.32 9.962 4.667 8 4.667Z"
        stroke="#F3F5F6"
      />
      <circle cx={8} cy={8} fill="#F3F5F6" r={1.5} stroke="#F3F5F6" />
      <circle cx={7.999} cy={8.001} fill="#69C9FF" r={0.667} />
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="a" x1={8} x2={8} y1={0} y2={16}>
          <stop stopColor="#69C9FF" />
          <stop offset={1} stopColor="#78CFFF" />
        </linearGradient>
      </defs>
    </IconBase>
  );
}

export default BlueEyeIcon;
