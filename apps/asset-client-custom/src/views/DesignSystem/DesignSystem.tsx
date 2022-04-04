import { CatTab, CatTabPanel, CatTabs } from 'catamaran/core';
import { DESIGNSYSTEM_SHOWCASE } from 'routes/constant-route';
import { Paper } from 'catamaran/core/mui';
import { useHistory } from 'react-router';
import { useQuery } from 'hooks/useQuery';
import AccordionPanels from './tabs/AccordionPanels';
import Autocompletes from './tabs/Autocompletes';
import Buttons from './tabs/Buttons';
import Calendar from './tabs/Calendar';
import CategoryItems from './tabs/CategoryItems';
import Chips from './tabs/Chips';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import DatePickers from './tabs/DatePickers';
import DialogCheck from './tabs/DialogCheck';
import Dialogs from './tabs/Dialogs';
import IconButtons from './tabs/IconButtons';
import Icons from './tabs/Icons';
import KeyboardSections from './tabs/KeyboardSections';
import Menus from './tabs/Menus';
import Panels from './tabs/Panels';
import PeriodSelectors from './tabs/PeriodSelectors';
import Popover from './tabs/Popover';
import React from 'react';
import SelectComponent from './tabs/SelectComponent';
import SelectableButtons from './tabs/SelectableButtons';
import Snackbars from './tabs/Snackbars';
import StatusCard from './tabs/StatusCard';
import Tabs from './tabs/Tabs';
import TextFields from './tabs/TextFields';
import ToggleCards from './tabs/ToggleCards';

function DesignSystem() {
  const history = useHistory();
  const queries = useQuery();

  const currentTab = queries.get('tab');
  const value = currentTab ? +currentTab : 0;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    history.replace(`${DESIGNSYSTEM_SHOWCASE}?tab=${newValue}`);
  };

  return (
    <ContentLayout pageHeader="Catamaran Design System" pageTitle="Catamaran Design System">
      <Paper className="p8">
        <CatTabs onChange={handleChange} value={value} variant="scrollable">
          <CatTab label="Buttons" />
          <CatTab label="Icon Buttons" />
          <CatTab label="Icons" />
          <CatTab label="Text Field" />
          <CatTab label="Select Component" />
          <CatTab label="Autocompletes" />
          <CatTab label="Period Selectors" />
          <CatTab label="Selectable Buttons" />
          <CatTab label="Snackbars" />
          <CatTab label="Accordion Panels" />
          <CatTab label="Toggle Card" />
          <CatTab label="Dialogs" />
          <CatTab label="Dialog Check" />
          <CatTab label="Date Picker" />
          <CatTab label="Chips" />
          <CatTab label="Panels" />
          <CatTab label="Tabs" />
          <CatTab label="Menus" />
          <CatTab label="Popover" />
          <CatTab label="Status Card" />
          <CatTab label="Calendar" />
          <CatTab label="Keyboard Section" />
          <CatTab label="Category Item" />
        </CatTabs>
      </Paper>
      <CatTabPanel index={0} value={value}>
        <Buttons />
      </CatTabPanel>
      <CatTabPanel index={1} value={value}>
        <IconButtons />
      </CatTabPanel>
      <CatTabPanel index={2} value={value}>
        <Icons />
      </CatTabPanel>
      <CatTabPanel index={3} value={value}>
        <TextFields />
      </CatTabPanel>
      <CatTabPanel index={4} value={value}>
        <SelectComponent />
      </CatTabPanel>
      <CatTabPanel index={5} value={value}>
        <Autocompletes />
      </CatTabPanel>
      <CatTabPanel index={6} value={value}>
        <PeriodSelectors />
      </CatTabPanel>
      <CatTabPanel index={7} value={value}>
        <SelectableButtons />
      </CatTabPanel>
      <CatTabPanel index={8} value={value}>
        <Snackbars />
      </CatTabPanel>
      <CatTabPanel index={9} value={value}>
        <AccordionPanels />
      </CatTabPanel>
      <CatTabPanel index={10} value={value}>
        <ToggleCards />
      </CatTabPanel>
      <CatTabPanel index={11} value={value}>
        <Dialogs />
      </CatTabPanel>
      <CatTabPanel index={12} value={value}>
        <DialogCheck />
      </CatTabPanel>
      <CatTabPanel index={13} value={value}>
        <DatePickers />
      </CatTabPanel>
      <CatTabPanel index={14} value={value}>
        <Chips />
      </CatTabPanel>
      <CatTabPanel index={15} value={value}>
        <Panels />
      </CatTabPanel>
      <CatTabPanel index={16} value={value}>
        <Tabs />
      </CatTabPanel>
      <CatTabPanel index={17} value={value}>
        <Menus />
      </CatTabPanel>
      <CatTabPanel index={18} value={value}>
        <Popover />
      </CatTabPanel>
      <CatTabPanel index={19} value={value}>
        <StatusCard />
      </CatTabPanel>
      <CatTabPanel index={20} value={value}>
        <Calendar />
      </CatTabPanel>
      <CatTabPanel index={21} value={value}>
        <KeyboardSections />
      </CatTabPanel>
      <CatTabPanel index={22} value={value}>
        <CategoryItems />
      </CatTabPanel>
    </ContentLayout>
  );
}

export default DesignSystem;
