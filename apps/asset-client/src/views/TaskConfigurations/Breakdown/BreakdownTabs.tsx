import { BREAKDOWN } from 'routes/constant-route';
import { CatPaper, CatTab, CatTabPanel, CatTabs } from 'catamaran/core';
import { styled } from 'catamaran/core/mui';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import { useTranslation } from 'react-i18next';
import Autoflows from './Autoflows/Autoflows';
import BreakdownCosts from './BreakdownCosts/BreakdownCosts';
import BreakdownTypes from './BreakdownTypes/BreakdownTypes';
import CategorySelectorWithQuery, { useMainCategory } from 'components/Category/CategorySelectorWithQuery';
import React, { useEffect } from 'react';
import Substatuses from './Substatuses/Substatuses';

const StyledTabPaper = styled(CatPaper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: 'auto',
  justifyContent: 'space-between',
  marginBottom: '8px',
  padding: theme.spacing(0.5),
  width: '100%'
}));

const StyledCatTabs = styled(CatTabs)(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: theme.palette.lightGrey.main
}));

type Props = {
  activeTabIndex: number;
};

const tabs = ['substatuses', 'autoflows', 'breakdown_types', 'breakdown_costs'];

function BreakdownTabs({ activeTabIndex }: Props) {
  const { t } = useTranslation();
  const queries = useQuery();
  const baseCategorySelectorUrl = `${BREAKDOWN}?tab=${queries.get('tab')}`;

  const history = useHistory();

  const mainCategoryId = useMainCategory(baseCategorySelectorUrl);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    history.push(`${BREAKDOWN}?tab=${tabs[newValue]}&main-category=${mainCategoryId}`);
  };

  if (!mainCategoryId) {
    return null;
  }

  return (
    <div>
      <StyledTabPaper>
        <StyledCatTabs onChange={handleTabChange} value={activeTabIndex} variant="fullWidth">
          <CatTab label={t('task_configuration.breakdown_tabs.substatuses')} />
          <CatTab disabled label={t('task_configuration.breakdown_tabs.autoflows')} />
          <CatTab label={t('task_configuration.breakdown_tabs.breakdown_types')} />
          <CatTab label={t('task_configuration.breakdown_tabs.breakdown_costs')} />
        </StyledCatTabs>
        <div style={{ width: '25%' }}>
          <CategorySelectorWithQuery
            baseUrl={baseCategorySelectorUrl}
            selectedMainCategoryId={mainCategoryId}
          />
        </div>
      </StyledTabPaper>
      <CatTabPanel index={0} value={activeTabIndex}>
        <Substatuses mainCategoryId={mainCategoryId} />
      </CatTabPanel>
      <CatTabPanel index={1} value={activeTabIndex}>
        <Autoflows />
      </CatTabPanel>
      <CatTabPanel index={2} value={activeTabIndex}>
        <BreakdownTypes mainCategoryId={mainCategoryId} />
      </CatTabPanel>
      <CatTabPanel index={3} value={activeTabIndex}>
        <BreakdownCosts mainCategoryId={mainCategoryId} />
      </CatTabPanel>
    </div>
  );
}

export const useActiveTab = () => {
  const history = useHistory();
  const queries = useQuery();

  const currentTab = tabs.findIndex((value) => value === queries.get('tab'));
  const activeTab = currentTab !== -1 ? currentTab : 0;

  useEffect(() => {
    if (currentTab === -1) {
      history.replace(`${BREAKDOWN}?tab=${tabs[0]}`);
    }
  });

  return activeTab;
};

export default BreakdownTabs;
