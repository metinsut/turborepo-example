import { CancelButton, ConfirmButton } from 'catamaran/core/Button';
import {
  CatKeyboardButton,
  CatKeyboardSection,
  CatPanel,
  CatPanelContent,
  CatPanelHeader,
  CatToggleButton
} from 'catamaran/core';
import { showDeleteSuccessSnackbar, showSaveSuccessSnackbar } from 'store/slices/application';
import { useDialogState, useFormState, useTypedDispatch } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';

function KeyboardSections() {
  const { isOpen, togglePopup } = useDialogState();
  const formHelper = useFormState({ title: '' });
  const dispatch = useTypedDispatch();

  const handleEnter = async () => {
    togglePopup(false);
    await dispatch(showSaveSuccessSnackbar());
  };
  const handleEscape = async () => {
    togglePopup(false);
    await dispatch(showDeleteSuccessSnackbar());
  };
  return (
    <CatPanel className="mt16">
      <CatPanelHeader title="Keyboard Focus Trap" />
      <CatPanelContent className="grid gap-10">
        <CatToggleButton
          color="green"
          icon={<CheckIcon />}
          onClick={() => togglePopup(!isOpen)}
          selected={isOpen}
          size="medium"
          title="Click me"
        />
        {isOpen && (
          <CatKeyboardSection onEnter={handleEnter} onEscape={handleEscape} open={isOpen}>
            <div className="grid gap-16">
              You can put anything you want in this area.
              <CatamaranTextField formHelper={formHelper} mode="editAndConfirm" name="title" />
              <CatamaranTextField formHelper={formHelper} mode="editAndConfirm" name="title" />
              <div className="grid grid-auto-flow-column gap-16">
                <CatKeyboardButton component={CancelButton} keyboardKey="escape" />
                <CatKeyboardButton component={ConfirmButton} keyboardKey="enter" />
              </div>
            </div>
          </CatKeyboardSection>
        )}
      </CatPanelContent>
    </CatPanel>
  );
}

export default KeyboardSections;
