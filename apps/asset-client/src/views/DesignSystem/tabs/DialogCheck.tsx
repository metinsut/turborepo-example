import { CatDialogCheckBox, CatDialogCheckItem, CatPaper } from 'catamaran/core';
import { useState } from 'react';

const checkBoxArray = [
  { checked: false, id: '1', text: 'title1' },
  { checked: false, id: '2', text: 'title2' },
  { checked: true, id: '3', text: 'title3' }
];

const DialogCheck = () => {
  const [state, setState] = useState<any>(checkBoxArray);
  const handleCheckBoxClick = (id: any) => {
    setState((prevState: any) => {
      const changedItem = prevState.find((item: any) => item.id === id);
      changedItem.checked = changedItem.checked === false;
      return [...prevState];
    });
  };
  return (
    <CatPaper className="p16 mt16">
      <div className="p16 grid gap-16" style={{ width: '560px' }}>
        <CatDialogCheckItem text="test1" />
        <CatDialogCheckItem text="test2" />
        <CatDialogCheckItem text="test3" valid />
      </div>
      <div className="p16 grid gap-16" style={{ width: '560px' }}>
        {state.map((item: any) => (
          <CatDialogCheckBox
            checked={item.checked}
            index={item.id}
            key={item.id}
            onClick={() => handleCheckBoxClick(item.id)}
            text={item.text}
          />
        ))}
      </div>
    </CatPaper>
  );
};

export default DialogCheck;
