import { CatTypography } from 'catamaran/core';
import clsx from 'clsx';

export type Colors = 'green' | 'orange' | 'red' | 'yellow' | 'grey' | 'darkGrey';

type Props = {
  color: Colors;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  iconContent?: React.ReactNode;
  onClick?: () => void;
};

const StatusCard = (props: Props) => {
  const { color, title, description, iconContent, onClick } = props;
  return (
    <div
      className={clsx(
        'status-card',
        `bg-gradient-${color}-o-8`,
        'radius-16',
        'grid',
        'grid-auto-flow-column',
        'justify-content-between',
        'align-items-center',
        'gap-8',
        'cursor-pointer',
        'border-1',
        'border-solid',
        `border-main-${color}-o-8`
      )}
      onClick={onClick}
    >
      <div className="relative z-1 pl16">
        <CatTypography
          className={clsx('status-title', 'three-dot', { 'c-white': color === 'darkGrey' })}
          variant="subtitle1"
        >
          {title}
        </CatTypography>
        <CatTypography className={clsx('three-dot', 'status-desc')} variant="caption">
          {description}
        </CatTypography>
      </div>
      <div
        className={clsx(
          'status-icon-content',
          'relative',
          'h-inherit',
          'grid',
          'align-items-center',
          'z-2',
          'bg-darkgray-o-8',
          'radius-16',
          'p8'
        )}
      >
        {iconContent}
      </div>
    </div>
  );
};

export { StatusCard };
