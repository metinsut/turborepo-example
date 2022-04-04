import {
  CatPanel,
  CatPanelContent,
  CatPanelHeader,
  CatTab,
  CatTabs,
  CatTypography
} from 'catamaran/core';
import EditIcon from 'catamaran/icons/Edit';
import React, { useState } from 'react';

const Tabs = () => {
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChange1 = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue1(newValue);
  };
  const handleChange2 = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue2(newValue);
  };
  const handleChange3 = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue3(newValue);
  };

  return (
    <div className="grid gap-16 mt16">
      <CatPanel>
        <CatPanelHeader title="Menu Example" />
        <CatPanelContent>
          <CatTabs menu onChange={handleChange} value={value}>
            <CatTab icon={<EditIcon fontSize="small" />} iconPosition="start" label="Updates" />
            <CatTab label="Icon Buttons" />
            <CatTab disabled label="Disable" />
            <CatTab label="Icons" />
          </CatTabs>
        </CatPanelContent>
      </CatPanel>
      <div className="grid gap-16 p16">
        <CatTypography>Menu No Background</CatTypography>
        <CatTabs menu onChange={handleChange1} value={value1}>
          <CatTab icon={<EditIcon fontSize="small" />} iconPosition="start" label="Updates" />
          <CatTab label="Icon Buttons" />
          <CatTab disabled label="Disabled" />
          <CatTab label="Icons" />
        </CatTabs>
      </div>
      <CatPanel>
        <CatPanelHeader title="Tabs" />
        <CatPanelContent>
          <CatTabs onChange={handleChange2} value={value2}>
            <CatTab icon={<EditIcon fontSize="small" />} iconPosition="start" label="Updates" />
            <CatTab label="Icon " />
            <CatTab disabled label="Disable" />
            <CatTab label="Icons" />
          </CatTabs>
        </CatPanelContent>
      </CatPanel>
      <CatPanel>
        <CatPanelHeader title="Colored Tabs" />
        <CatPanelContent>
          <CatTabs onChange={handleChange3} value={value3}>
            <CatTab color="blue" label="Blue" />
            <CatTab color="red" label="Red" />
            <CatTab color="orange" label="Orange" />
            <CatTab color="yellow" label="Yellow" />
          </CatTabs>
        </CatPanelContent>
      </CatPanel>
    </div>
  );
};

export default Tabs;
