import { CatTypography } from 'catamaran/core';
import { CloseIconButton } from '../Button';
import { DialogIconButton } from './DialogIconButton';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import React from 'react';

interface Props {
  title: React.ReactNode;
  iconComponent: React.ComponentType<IconBaseProps>;
  actionArea?: React.ReactNode;
  closable?: boolean;
}

const DialogTitle = ({ title, actionArea, iconComponent: Icon, closable = false }: Props) => (
  <>
    <div className="dialog-title">
      <div className="dialog-title-left">
        <Icon color="darkGrey" contained={false} fontSize="medium" hoverable={false} />
      </div>
      <div className="dialog-title-center">
        <CatTypography variant="h2">{title}</CatTypography>
      </div>
      <div className="dialog-title-right">
        {actionArea}
        {closable && (
          <>
            {actionArea && <div className="divider-vertical" />}
            <DialogIconButton component={CloseIconButton} variant="close" />
          </>
        )}
      </div>
    </div>
    <div className="divider-horizontal mx32" />
  </>
);

export { DialogTitle };
