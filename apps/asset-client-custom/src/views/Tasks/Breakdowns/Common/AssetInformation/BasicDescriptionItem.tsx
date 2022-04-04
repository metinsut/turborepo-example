import { CatTypography } from 'catamaran/core';
import React from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  description?: string;
  title?: string;
};

function BasicDescriptionItem({ className, description, title }: Props) {
  return (
    <div className={clsx(className, 'grid ml8 w-full h-40 align-items-center')}>
      <CatTypography className="opacity-6" variant="caption">
        {title}
      </CatTypography>
      <CatTypography className="three-dot" variant="body1">
        {description}
      </CatTypography>
    </div>
  );
}

export default BasicDescriptionItem;
