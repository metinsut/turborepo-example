import { Box, CatKeyboardButton } from 'catamaran/core';
import {
  CancelButton,
  CloseButton,
  ConfirmButton,
  RevertButton,
  SaveButton
} from 'catamaran/core/Button';
import { DisplayType } from 'utils';
import theme from 'catamaran/theme';

type Props = {
  className?: string;
  isCancelDisabled?: boolean;
  isConfirmDisabled?: boolean;
  isGoBackDisabled?: boolean;
  mode?: DisplayType;
  touched: boolean;
};

function KeyboardSectionBottomButtons({
  className,
  isCancelDisabled,
  isConfirmDisabled,
  isGoBackDisabled,
  mode,
  touched
}: Props) {
  return (
    <Box alignItems="center" className={className} display="flex" mt={2}>
      {!touched && mode === 'add' && (
        <CatKeyboardButton
          component={CancelButton}
          disabled={isGoBackDisabled}
          keyboardKey="escape"
        />
      )}
      {!touched && mode === 'edit' && (
        <CatKeyboardButton
          component={CloseButton}
          disabled={isGoBackDisabled}
          keyboardKey="escape"
        />
      )}
      {touched && (
        <CatKeyboardButton
          component={mode === 'add' ? CancelButton : RevertButton}
          disabled={isCancelDisabled}
          keyboardKey="escape"
        />
      )}
      <Box
        height={16}
        mx={2}
        style={{
          borderLeft: `1px solid ${theme.palette.darkGrey[300]}`
        }}
      />
      <CatKeyboardButton
        component={mode === 'add' ? SaveButton : ConfirmButton}
        disabled={isConfirmDisabled || !touched}
        keyboardKey="enter"
      />
    </Box>
  );
}

export default KeyboardSectionBottomButtons;
