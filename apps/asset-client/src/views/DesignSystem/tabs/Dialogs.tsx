import {
  CatButton,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogIconButton,
  CatDialogTitle,
  CatPaper
} from 'catamaran/core';
import { ConfirmButton, GoBackButton } from 'catamaran/core/Button';
import { showAddSuccessSnackbar, showDeleteSuccessSnackbar } from 'store/slices/application';
import { useFormState, useTypedDispatch, withDialogWrapper } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import CheckIcon from 'catamaran/icons/Check';
import InfoIcon from 'catamaran/icons/Info';
import PersonIcon from 'catamaran/icons/Person';
import PlusIcon from 'catamaran/icons/Plus';
import React, { useState } from 'react';

const Dialogs = () => {
  const dispatch = useTypedDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    dispatch(showDeleteSuccessSnackbar());
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSuccess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(showAddSuccessSnackbar());
    setOpen(false);
  };

  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    dispatch(showDeleteSuccessSnackbar());
    setOpen2(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleSuccess2 = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(showAddSuccessSnackbar());
    setOpen2(false);
  };

  const [open3, setOpen3] = useState(false);

  const handleClose3 = () => {
    dispatch(showDeleteSuccessSnackbar());
    setOpen3(false);
  };
  const handleOpen3 = () => {
    setOpen3(true);
  };
  const handleSuccess3 = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(showAddSuccessSnackbar());
    setOpen3(false);
  };

  return (
    <CatPaper className="p16 mt16">
      <CatButton color="green" endIcon={<CheckIcon />} onClick={handleOpen} size="large">
        With Actions
      </CatButton>
      <CatButton
        className="ml8"
        color="red"
        endIcon={<CheckIcon />}
        onClick={handleOpen2}
        size="large"
      >
        Closable
      </CatButton>
      <CatButton
        className="ml8"
        color="blue"
        endIcon={<PersonIcon />}
        onClick={handleOpen3}
        size="large"
      >
        Mixed
      </CatButton>
      <Dialog1 handleClose={handleClose} handleSuccess={handleSuccess} open={open} />
      <Dialog2 handleClose={handleClose2} handleSuccess={handleSuccess2} open={open2} />
      <Dialog3 handleClose={handleClose3} handleSuccess={handleSuccess3} open={open3} />
    </CatPaper>
  );
};

function DefaultDialog(props: any) {
  const { open, handleClose, TransitionProps, handleSuccess } = props;
  const formHelper = useFormState({ title: '' });
  return (
    <CatDialog
      onAction={handleSuccess}
      onClose={handleClose}
      open={open}
      TransitionProps={TransitionProps}
    >
      <CatDialogTitle iconComponent={InfoIcon} title="This is dialog modal title" />
      <CatDialogContent>
        You can put anything you want in this area.
        <CatamaranTextField formHelper={formHelper} mode="editOnly" name="title" />
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={ConfirmButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

function DialogWithNoAction(props: any) {
  const { open, handleClose, TransitionProps, handleSuccess } = props;
  return (
    <CatDialog
      onAction={handleSuccess}
      onClose={handleClose}
      open={open}
      TransitionProps={TransitionProps}
    >
      <CatDialogTitle
        actionArea={
          <>
            <CatDialogIconButton variant="action">
              <PlusIcon color="blue" />
            </CatDialogIconButton>
          </>
        }
        closable
        iconComponent={InfoIcon}
        title="This is dialog modal title"
      />
      <CatDialogContent>You can press Esc to close, Enter to confirm</CatDialogContent>
    </CatDialog>
  );
}

function DialogWithMultiAction(props: any) {
  const { open, handleClose, TransitionProps, handleSuccess } = props;
  const formHelper = useFormState({ title: '' });
  return (
    <CatDialog
      onAction={handleSuccess}
      onClose={handleClose}
      open={open}
      TransitionProps={TransitionProps}
    >
      <CatDialogTitle closable iconComponent={InfoIcon} title="This is dialog modal title" />
      <CatDialogContent>
        You can put anything you want in this area.
        <CatamaranTextField formHelper={formHelper} mode="editOnly" name="title" />
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={ConfirmButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

const Dialog1 = withDialogWrapper(DefaultDialog);
const Dialog2 = withDialogWrapper(DialogWithNoAction);
const Dialog3 = withDialogWrapper(DialogWithMultiAction);
export default Dialogs;
