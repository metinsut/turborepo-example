import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function BreakdownIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M7.421 6.243a2.5 2.5 0 013.323 3.35.578.578 0 01.12.092l1.39 1.39 3.485-3.346a.498.498 0 01-.018-.131v-.436a.5.5 0 01.276-.447l1.327-.663a.467.467 0 01.626.626l-.663 1.327a.5.5 0 01-.447.276h-.436a.5.5 0 01-.125-.016l-3.357 3.479 1.33 1.331c.058.057.1.123.128.194a2.499 2.499 0 013.377 3.31l-1.786-1.786a.576.576 0 00-.814 0l-.364.364a.576.576 0 000 .814l1.786 1.786a2.5 2.5 0 01-3.31-3.377.574.574 0 01-.194-.127l-1.31-1.31-1.039 1.076.15.15a.5.5 0 11-.708.706l-.174-.174a.525.525 0 01-.02.247l-.107.317a2 2 0 01-.483.782l-1.8 1.8a.525.525 0 01-.742 0l-.688-.69a.525.525 0 010-.742l1.799-1.799a2 2 0 01.782-.483l.317-.106a.524.524 0 01.247-.02l-.194-.195a.5.5 0 01.707-.707l.161.161 1.08-1.036-1.368-1.367a.578.578 0 01-.091-.12 2.5 2.5 0 01-3.35-3.322l1.785 1.785c.225.225.59.225.814 0l.364-.363a.576.576 0 000-.814L7.42 6.243z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default BreakdownIcon;