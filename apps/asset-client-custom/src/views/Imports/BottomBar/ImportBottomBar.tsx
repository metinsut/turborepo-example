import { ImportState } from 'store/slices/imports/types';
import { Paper, Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import StatusConfirmed from './StatusConfirmed';
import StatusDefault from './StatusDefault';
import StatusFinished from './StatusFinished';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  CatButton: {
    margin: theme.spacing(0, 1)
  },
  bottomBarGrid: {
    height: '100%'
  },
  bottomBarText: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1)
  },
  root: {
    borderRadius: theme.spacing(4),
    height: '3rem',
    width: '100%'
  }
}));

type Props = {
  className?: string;
  importState?: ImportState;
  onCancel?: (stayOpen: boolean) => void;
  onFinish?: () => void;
  onMinimize?: () => void;
  onUpload?: () => void;
  onUploadAgain?: () => void;
};

function ImportBottomBar(props: Props) {
  const classes = useStyles();
  const { className, onCancel, onMinimize, onFinish, onUpload, onUploadAgain, importState } = props;

  let bottomBarElement;
  if (importState === 'confirmed') {
    bottomBarElement = <StatusConfirmed onMinimize={onMinimize} />;
  } else if (importState === 'finished') {
    bottomBarElement = <StatusFinished onFinish={onFinish} onUploadAgain={onUploadAgain} />;
  } else {
    bottomBarElement = (
      <StatusDefault
        importState={importState}
        onCancel={onCancel}
        onMinimize={onMinimize}
        onUpload={onUpload}
      />
    );
  }

  return <Paper className={clsx(className, classes.root)}>{bottomBarElement}</Paper>;
}

export default ImportBottomBar;
