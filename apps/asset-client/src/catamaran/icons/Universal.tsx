import IconBase, { IconBaseProps } from './IconBase';

const UniversalIcon = (props: IconBaseProps) => (
  <IconBase {...props}>
    <g opacity={0.5}>
      <circle cx={3} cy={12} r={2.5} stroke="url(#a)" transform="rotate(-90 3 12)" />
      <circle cx={5.636} cy={18.364} r={3} stroke="url(#b)" transform="rotate(-135 5.636 18.364)" />
      <path d="M9.5 21a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" stroke="url(#c)" />
      <path
        d="M16.596 20.132a2.5 2.5 0 1 1 3.536-3.536 2.5 2.5 0 0 1-3.536 3.536Z"
        stroke="url(#d)"
      />
      <circle cx={21} cy={12} r={2.5} stroke="url(#e)" transform="rotate(-90 21 12)" />
      <circle cx={18.364} cy={5.636} r={3} stroke="url(#f)" transform="rotate(-135 18.364 5.636)" />
      <circle cx={12} cy={3} r={2.5} stroke="url(#g)" transform="rotate(180 12 3)" />
      <circle cx={5.636} cy={5.636} r={2.5} stroke="url(#h)" transform="rotate(135 5.636 5.636)" />
    </g>
    <g opacity={0.2}>
      <circle cx={3} cy={12} fill="url(#i)" r={3} transform="rotate(-90 3 12)" />
      <circle cx={5.636} cy={18.364} fill="url(#j)" r={3} transform="rotate(-135 5.636 18.364)" />
      <circle cx={12} cy={21} fill="url(#k)" r={3} transform="rotate(180 12 21)" />
      <circle cx={18.364} cy={18.364} fill="url(#l)" r={3} transform="rotate(135 18.364 18.364)" />
      <circle cx={21} cy={12} fill="url(#m)" r={3} transform="rotate(-90 21 12)" />
      <circle cx={18.364} cy={5.636} fill="url(#n)" r={3} transform="rotate(-135 18.364 5.636)" />
      <circle cx={12} cy={3} fill="url(#o)" r={3} transform="rotate(180 12 3)" />
      <circle cx={5.636} cy={5.636} fill="url(#p)" r={3} transform="rotate(135 5.636 5.636)" />
    </g>
    <g opacity={0.6} strokeLinecap="round">
      <path d="M12 6.75v10.5" stroke="url(#q)" />
      <path d="m8.288 8.288 7.424 7.425" stroke="url(#r)" />
      <path d="M6.75 12h10.5" stroke="url(#s)" />
      <path d="m8.288 15.712 7.424-7.425" stroke="url(#t)" />
    </g>
    <defs>
      <linearGradient gradientUnits="userSpaceOnUse" id="a" x1={3} x2={3} y1={9} y2={15}>
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="b"
        x1={5.636}
        x2={5.636}
        y1={15.364}
        y2={21.364}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient gradientUnits="userSpaceOnUse" id="c" x1={12} x2={12} y1={24} y2={18}>
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="d"
        x1={20.485}
        x2={16.243}
        y1={20.486}
        y2={16.243}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient gradientUnits="userSpaceOnUse" id="e" x1={21} x2={21} y1={9} y2={15}>
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="f"
        x1={18.364}
        x2={18.364}
        y1={2.636}
        y2={8.636}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient gradientUnits="userSpaceOnUse" id="g" x1={12} x2={12} y1={0} y2={6}>
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="h"
        x1={5.636}
        x2={5.636}
        y1={2.636}
        y2={8.636}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient gradientUnits="userSpaceOnUse" id="i" x1={3} x2={3} y1={9} y2={15}>
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="j"
        x1={5.636}
        x2={5.636}
        y1={15.364}
        y2={21.364}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient gradientUnits="userSpaceOnUse" id="k" x1={12} x2={12} y1={18} y2={24}>
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="l"
        x1={18.364}
        x2={18.364}
        y1={15.364}
        y2={21.364}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient gradientUnits="userSpaceOnUse" id="m" x1={21} x2={21} y1={9} y2={15}>
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="n"
        x1={18.364}
        x2={18.364}
        y1={2.636}
        y2={8.636}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient gradientUnits="userSpaceOnUse" id="o" x1={12} x2={12} y1={0} y2={6}>
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="p"
        x1={5.636}
        x2={5.636}
        y1={2.636}
        y2={8.636}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="q"
        x1={12.5}
        x2={12.5}
        y1={6.75}
        y2={17.25}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="r"
        x1={8.641}
        x2={16.066}
        y1={7.935}
        y2={15.359}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="s"
        x1={6.75}
        x2={17.25}
        y1={11.5}
        y2={11.5}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="t"
        x1={7.934}
        x2={15.359}
        y1={15.358}
        y2={7.934}
      >
        <stop stopColor="#40DBA3" />
        <stop offset={1} stopColor="#54DFAD" />
      </linearGradient>
    </defs>
  </IconBase>
);

export default UniversalIcon;
