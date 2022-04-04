import { CatDialog } from 'catamaran/core';
import { InviteDialogType } from '../types';
import { InviteUserResponse } from 'store/slices/users/details/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import ErrorDialog from './ErrorDialog';
import GeneralDialog from './GeneralDialog';
import React, { useMemo, useState } from 'react';
import SuccessDialog from './SuccessDialog';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2, 4)
  },
  root: {}
}));

type Props = {
  className?: string;
  inviteResults: InviteUserResponse;
  onClose: () => void;
  open: boolean;
};

function InviteResultDialog(props: Props) {
  const classes = useStyles();
  const { className, inviteResults, onClose, open } = props;

  const [openDialog, setOpenDialog] = useState<InviteDialogType>('general');

  const handleChangeDialog = (dialogType: InviteDialogType) => {
    setOpenDialog(dialogType);
  };

  const content = useMemo(() => {
    switch (openDialog) {
      case 'success':
        return (
          <SuccessDialog
            onClose={() => handleChangeDialog('general')}
            successResults={inviteResults.successUsers}
          />
        );
      case 'error':
        return (
          <ErrorDialog
            errorResults={inviteResults.errorUsers}
            onClose={() => handleChangeDialog('general')}
          />
        );
      default:
        return (
          <GeneralDialog
            inviteResults={inviteResults}
            onChangeDialog={handleChangeDialog}
            onClose={onClose}
          />
        );
    }
  }, [inviteResults, onClose, openDialog]);

  return (
    <CatDialog
      className={clsx(classes.root, className)}
      fullWidth
      open={open}
      PaperProps={{
        className: classes.paper
      }}
    >
      {content}
    </CatDialog>
  );
}

export default InviteResultDialog;
