import {
  CatCheckbox,
  CatIconButton,
  CatMenu,
  CatMenuDivider,
  CatMenuItem,
  CatPanel,
  CatPanelContent,
  CatPanelHeader,
  CatRadio,
  CatSelect,
  CatTooltip,
  CatTypography
} from 'catamaran/core';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useState } from 'react';
import EllipsisIcon from 'catamaran/icons/Ellipsis';
import InfoIcon from 'catamaran/icons/Info';
import PlusIcon from 'catamaran/icons/Plus';

const Menus = () => {
  const [checked, setChecked] = useState([]);
  const checkList = ['Apple', 'Banana', 'Tea', 'Coffee'];
  const handleCheck = (val: string) => {
    let updatedList = [...checked];
    if (!checked.includes(val)) {
      updatedList = [...checked, val];
    } else {
      updatedList.splice(checked.indexOf(val), 1);
    }
    setChecked(updatedList);
  };

  const [radio, setRadio] = useState(null);

  const [selected, setSelected] = useState('');
  const selectList = ['English', 'Turkish', 'Arabic'];
  const handleSelectChange = (e: any) => {
    setSelected(e.target.value);
  };

  const popupState = usePopupState({ popupId: 'menus', variant: 'popover' });
  const popupState1 = usePopupState({ popupId: 'menus1', variant: 'popover' });
  const popupState2 = usePopupState({ popupId: 'menus2', variant: 'popover' });
  const popupState3 = usePopupState({ popupId: 'menus3', variant: 'popover' });
  const popupState4 = usePopupState({ popupId: 'menus4', variant: 'popover' });
  const popupState5 = usePopupState({ popupId: 'menus5', variant: 'popover' });
  const popupState6 = usePopupState({ popupId: 'menus6', variant: 'popover' });
  const popupState7 = usePopupState({ popupId: 'menus7', variant: 'popover' });

  return (
    <div className="mt16 grid gap-16">
      <CatPanel>
        <CatPanelHeader title="No exact width -> Default max width is 560px" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatMenu
            {...bindMenu(popupState)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
          >
            <CatMenuItem>
              <PlusIcon className="opacity-3" color="green" fontSize="small" />
              <CatTypography className="opacity-3 three-dot" variant="body2">
                Sample asjdashd akjsdhsakj dsadhsakjhd kjsahdsa dkhsajhdkjashdkjsahd
                sakjhdkjahdkjsahdkjsahdkjsahd aasdsdas
              </CatTypography>
              <CatTooltip arrow title="Tooltip">
                <div>
                  <InfoIcon
                    className="cursor-pointer"
                    color="darkGrey"
                    contained
                    fontSize="small"
                  />
                </div>
              </CatTooltip>
            </CatMenuItem>
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography variant="body2">My account</CatTypography>
              <CatTooltip arrow title="Tooltip">
                <div>
                  <InfoIcon
                    className="cursor-pointer"
                    color="darkGrey"
                    contained
                    fontSize="small"
                  />
                </div>
              </CatTooltip>
            </CatMenuItem>
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography variant="body2">My account</CatTypography>
            </CatMenuItem>
          </CatMenu>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="Fixed width 250px" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState1)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatMenu
            {...bindMenu(popupState1)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
            width="250px"
          >
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography className="three-dot" variant="body2">
                Max 250 px width example lorem ipsum lorem
              </CatTypography>
            </CatMenuItem>
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography className="three-dot" variant="body2">
                My account
              </CatTypography>
            </CatMenuItem>
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography className="three-dot" variant="body2">
                My account
              </CatTypography>
            </CatMenuItem>
          </CatMenu>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="No Icon example" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState2)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatMenu
            {...bindMenu(popupState2)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
          >
            <CatMenuItem>
              <CatTypography variant="body2">No icon example</CatTypography>
            </CatMenuItem>
            <CatMenuItem>
              <CatTypography variant="body2">My account</CatTypography>
            </CatMenuItem>
            <CatMenuItem>
              <CatTypography variant="body2">My account</CatTypography>
            </CatMenuItem>
          </CatMenu>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="dense True:  <CatMenuItem dense> ~ Small variant " />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState3)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatMenu
            {...bindMenu(popupState3)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
          >
            <CatMenuItem dense>
              <CatTypography variant="body2">Small Variant</CatTypography>
            </CatMenuItem>
            <CatMenuItem dense>
              <CatTypography variant="body2">Small Variant</CatTypography>
            </CatMenuItem>
            <CatMenuItem dense>
              <CatTypography variant="body2">Small Variant</CatTypography>
            </CatMenuItem>
            <CatMenuItem dense>
              <CatTypography variant="body2">Small Variant</CatTypography>
            </CatMenuItem>
            <CatMenuItem dense>
              <CatTypography variant="body2">Small Variant</CatTypography>
            </CatMenuItem>
          </CatMenu>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="Menu Divider example;  <CatMenuDivider />" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState4)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatMenu
            {...bindMenu(popupState4)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
          >
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography className="three-dot" variant="body2">
                Sample example
              </CatTypography>
              <CatTooltip arrow title="Tooltip">
                <div>
                  <InfoIcon
                    className="cursor-pointer"
                    color="darkGrey"
                    contained
                    fontSize="small"
                  />
                </div>
              </CatTooltip>
            </CatMenuItem>
            <CatMenuDivider />
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography variant="body2">My account</CatTypography>
            </CatMenuItem>
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography variant="body2">My account</CatTypography>
            </CatMenuItem>
          </CatMenu>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="Checkbox Example" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState5)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatMenu
            {...bindMenu(popupState5)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
          >
            {checkList.map((item, index) => (
              <CatMenuItem
                key={index as number}
                onClick={() => handleCheck(item)}
                selected={checked.includes(item)}
              >
                <CatCheckbox checked={checked.includes(item)} paddingSize="none" />
                <CatTypography variant="body2">{item}</CatTypography>
              </CatMenuItem>
            ))}
          </CatMenu>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="Radio Example" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState6)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatMenu
            {...bindMenu(popupState6)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
          >
            <CatMenuItem onClick={() => setRadio(1)} selected={radio === 1}>
              <CatRadio checked={radio === 1} zeroPadding />
              <CatTypography variant="body2">
                {radio === 1 ? 'Selected' : 'Unselected'}
              </CatTypography>
            </CatMenuItem>
            <CatMenuItem onClick={() => setRadio(2)} selected={radio === 2}>
              <CatRadio checked={radio === 2} zeroPadding />
              <CatTypography variant="body2">
                {radio === 2 ? 'Selected' : 'Unselected'}
              </CatTypography>
            </CatMenuItem>
            <CatMenuItem onClick={() => setRadio(3)} selected={radio === 3}>
              <CatRadio checked={radio === 3} zeroPadding />
              <CatTypography variant="body2">
                {radio === 3 ? 'Selected' : 'Unselected'}
              </CatTypography>
            </CatMenuItem>
          </CatMenu>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="Select Example" />
        <CatPanelContent>
          <CatSelect
            className="w-half"
            label="Application Language / Uygulama Dili / لغة التطبيق"
            onChange={handleSelectChange}
            value={selected}
          >
            {selectList.map((list) => (
              <CatMenuItem key={list} value={list}>
                {list}
              </CatMenuItem>
            ))}
          </CatSelect>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="Disable Example" />
        <CatPanelContent>
          <CatIconButton {...bindTrigger(popupState7)}>
            <EllipsisIcon alwaysHovered color="darkGrey" contained />
          </CatIconButton>
          <CatMenu
            {...bindMenu(popupState7)}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }}
          >
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography className="three-dot" variant="body2">
                Sample One
              </CatTypography>
            </CatMenuItem>
            <CatMenuItem>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography variant="body2">My account</CatTypography>
            </CatMenuItem>
            <CatMenuItem disabled>
              <PlusIcon color="green" fontSize="small" />
              <CatTypography variant="body2">Disable</CatTypography>
            </CatMenuItem>
          </CatMenu>
        </CatPanelContent>
      </CatPanel>
    </div>
  );
};

export default Menus;
