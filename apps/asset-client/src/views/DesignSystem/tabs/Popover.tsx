import { CancelButton, ConfirmButton } from 'catamaran/core/Button';
import {
  CatIconButton,
  CatKeyboardButton,
  CatKeyboardSection,
  CatPanel,
  CatPanelContent,
  CatPanelHeader,
  CatPopover,
  CatTypography
} from 'catamaran/core';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { showSaveSuccessSnackbar, showSnackbarMessage } from 'store/slices/application';
import { useFormState, useTypedDispatch } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import EllipsisIcon from 'catamaran/icons/Ellipsis';

const Popover = () => {
  const dispatch = useTypedDispatch();
  const formHelper = useFormState({ title: '' });

  const handleEnter = async () => {
    popupState2.close();
    await dispatch(showSaveSuccessSnackbar());
  };

  const handleEscape = async () => {
    popupState2.close();
    await dispatch(showSnackbarMessage('Escaped', 'warning'));
  };

  const popupState = usePopupState({ popupId: 'popover0', variant: 'popover' });
  const popupState1 = usePopupState({ popupId: 'popover1', variant: 'popover' });
  const popupState2 = usePopupState({ popupId: 'popover2', variant: 'popover' });

  return (
    <div className="mt16 grid gap-16">
      <CatPanel>
        <CatPanelHeader title="Popover default ~ width:auto, maxWidth:560px" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatPopover
            {...bindPopover(popupState)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
          >
            <div className="p16">
              <CatTypography>
                Popover Content alksdmasmdl asdkasldkas daslkdaslşkd askd alsşkdlş askdas
                aasdkasjdaslk aksjd asd sadsad
              </CatTypography>
            </div>
          </CatPopover>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="Popover fixed width ~ width:250px" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState1)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatPopover
            {...bindPopover(popupState1)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
            width="250px"
          >
            <div className="p16">
              <CatTypography>
                Popover Content alksdmasmdl asdkasldkas daslkdaslşkd askd alsşkdlş askdas
                aasdkasjdaslk aksjd asd sadsad
              </CatTypography>
            </div>
          </CatPopover>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="Popover Listen Keyboard" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState2)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatPopover
            {...bindPopover(popupState2)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            onClose={() => {
              bindPopover(popupState2).onClose();
              handleEscape();
            }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
          >
            <CatKeyboardSection
              onEnter={handleEnter}
              onEscape={handleEscape}
              open={popupState2.isOpen}
            >
              <div className="grid gap-16 px16">
                <CatTypography>Add a New Category</CatTypography>
                <CatamaranTextField formHelper={formHelper} mode="editAndConfirm" name="title" />
                <CatamaranTextField formHelper={formHelper} mode="editAndConfirm" name="title" />
                <div className="grid grid-auto-flow-column gap-16">
                  <CatKeyboardButton component={CancelButton} keyboardKey="escape" />
                  <CatKeyboardButton component={ConfirmButton} keyboardKey="enter" />
                </div>
              </div>
            </CatKeyboardSection>
          </CatPopover>
        </CatPanelContent>
      </CatPanel>
    </div>
  );
};

export default Popover;
