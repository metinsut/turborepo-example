import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function TechnicianIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <g opacity={0.8}>
        <circle cx={12} cy={12} r={8.25} stroke="currentColor" strokeWidth={1.5} />
        <path
          d="M8.566 7.683a1.874 1.874 0 012.492 2.512.432.432 0 01.09.07l2.542 2.541a.432.432 0 01.095.146 1.874 1.874 0 012.532 2.482l-1.339-1.339a.432.432 0 00-.61 0l-.273.272a.432.432 0 000 .611l1.34 1.34a1.874 1.874 0 01-2.483-2.533.432.432 0 01-.146-.095l-2.542-2.543a.43.43 0 01-.069-.09 1.874 1.874 0 01-2.512-2.491l1.339 1.339a.432.432 0 00.61 0l.273-.272a.432.432 0 000-.611l-1.34-1.34z"
          fill="currentColor"
        />
      </g>
    </IconBase>
  );
}

export default TechnicianIcon;
