import { Box } from 'catamaran/core';
import { DisplayType } from 'utils';
import { SectionType } from '../helpers';
import { Theme, makeStyles } from 'catamaran/core/mui';
import DisplayMode from './DisplayMode';
import EditMode from './EditMode';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  disabled: {
    opacity: 0.3,
    pointerEvents: 'none'
  },
  root: {
    margin: theme.spacing(2, 0, 0, 5)
  }
}));

type Props = {
  className?: string;
  activeSection: SectionType;
  disabled: boolean;
  editVisible: boolean;
  isActive: boolean;
  loading?: boolean;
  mode: DisplayType;
  onActivate: (active: boolean, cancel: boolean) => void;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

function AssetRoles(props: Props) {
  const classes = useStyles();
  const {
    className,
    activeSection,
    disabled,
    isActive,
    editVisible,
    loading,
    mode,
    onActivate,
    onCancel,
    onConfirm
  } = props;

  const handleGoBack = () => onActivate(false, true);
  const handleNext = () => onActivate(false, false);
  const handleEdit = () => onActivate(true, false);

  return (
    <Box
      className={clsx({
        [classes.root]: true,
        [className]: true,
        [classes.disabled]: disabled
      })}
    >
      {isActive ? (
        <EditMode
          mode={mode}
          onCancel={onCancel}
          onConfirm={onConfirm}
          onGoBack={handleGoBack}
          onNext={handleNext}
        />
      ) : (
        <DisplayMode
          activeSection={activeSection}
          editVisible={editVisible}
          loading={loading}
          onEditClick={handleEdit}
        />
      )}
    </Box>
  );
}

export default AssetRoles;
