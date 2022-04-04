import { CatButtonProps, CatTooltip } from 'catamaran/core';
import { styled } from 'catamaran/core/mui';
import CatButton from 'catamaran/core/Button';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';

export type AddButtonProps = CatButtonProps & {
  tooltipText?: string | React.ReactNode;
};

const StyledButton = styled(CatButton)(() => ({
  height: '32px',
  width: '100%'
}));

function AddButton(
  { color = 'blue', size = 'large', tooltipText, ...rest }: AddButtonProps,
  ref: React.Ref<any>
) {
  const addButton = (
    <StyledButton color={color} ref={ref} size={size} {...rest}>
      <PlusIcon />
    </StyledButton>
  );
  return (
    <>
      {tooltipText ? (
        <CatTooltip arrow title={tooltipText}>
          <span>{addButton}</span>
        </CatTooltip>
      ) : (
        addButton
      )}
    </>
  );
}

export default React.forwardRef(AddButton);
