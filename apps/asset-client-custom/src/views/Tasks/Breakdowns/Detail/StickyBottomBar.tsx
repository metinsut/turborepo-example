import { CatKeyboardButton, CatPaper } from 'catamaran/core';
import { GoBackButton } from 'catamaran/core/Button';

function StickyBottomBar() {
  return (
    <>
      <CatPaper className="sticky-bottombar">
        <CatKeyboardButton component={GoBackButton} keyboardKey="escape" />
      </CatPaper>
    </>
  );
}

export default StickyBottomBar;
