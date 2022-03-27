import './transition.css';
import { CATEGORYONBOARDINGMODALREAD, loadFromLocalStorage } from 'helpers/localStorage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CatIconButton, CatPaper } from 'catamaran/core';
import { selectExpandedCategoryIds } from 'store/slices/categoriesv2/selectors';
import { styled } from 'catamaran/core/mui';
import { useDialogState, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import CategoryGroup from './CategoryGroup/CategoryGroup';
import ContentLayout from 'components/ContentLayout/ContentLayout';
import ExportIcon from 'catamaran/icons/Export';
import ImportIcon from 'catamaran/icons/Import';
import InfoIcon from 'catamaran/icons/Info';
import OnboardingModal from './OnboardingModal/OnboardingModal';
import React, { useEffect, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import SearchIcon from 'catamaran/icons/Search';

const StyledActionPaper = styled(CatPaper)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  height: '48px',
  justifyContent: 'space-between',
  marginBottom: '8px',
  padding: theme.spacing(1),
  width: '100%'
}));

function Categories() {
  const { t } = useTranslation();
  const { isOpen, togglePopup } = useDialogState();

  const expandedCategoryIds = useTypedSelector(selectExpandedCategoryIds);

  const scrollContainerRef = React.useRef(null);
  const scrollToRight = React.useCallback(() => {
    (scrollContainerRef.current as any).scrollToRight();
  }, []);

  React.useEffect(() => {
    // Scroll right by default
    scrollToRight();
  }, [scrollToRight]);

  const isTheModalShown = useMemo(() => loadFromLocalStorage(CATEGORYONBOARDINGMODALREAD), []);
  useEffect(() => {
    if (!isTheModalShown) {
      togglePopup();
    }
  }, [isTheModalShown, togglePopup]);

  const handleExpand = () => {
    setTimeout(() => {
      scrollToRight();
    }, 10);
  };

  return (
    <ContentLayout
      pageBreadcrumbs={[
        {
          text: t('asset_configurations.asset_configuration')
        },
        {
          text: t('asset_configurations.categories.category_list_title')
        }
      ]}
      pageHeader={t('asset_configurations.categories.category_list_title')}
      pageTitle={t('asset_configurations.categories.categories')}
    >
      <StyledActionPaper>
        <CatIconButton onClick={() => togglePopup(true)}>
          <InfoIcon color="darkGrey" />
        </CatIconButton>
        <div className="flex align-items-center">
          <CatIconButton className="mr8">
            <ImportIcon color="blue" />
          </CatIconButton>
          <CatIconButton>
            <ExportIcon color="blue" />
          </CatIconButton>
          <div className="divider-vertical" />
          <CatIconButton>
            <SearchIcon color="blue" />
          </CatIconButton>
        </div>
      </StyledActionPaper>
      <Scrollbars
        autoHeight
        autoHeightMax={Number.MAX_VALUE}
        autoHide
        hideTracksWhenNotNeeded
        ref={scrollContainerRef}
      >
        <TransitionGroup
          className="grid grid-auto-flow-column gap-8 justify-content-start"
          style={{
            height: 'calc(100vh - var(--page-space-categories))'
          }}
        >
          {expandedCategoryIds.map((id, index) => (
            <CSSTransition classNames="category_group" key={index.toString()} timeout={1000}>
              <CategoryGroup key={id} level={index} onExpand={handleExpand} parentCategoryId={id} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Scrollbars>
      <OnboardingModal onClose={() => togglePopup(false)} open={isOpen} />
    </ContentLayout>
  );
}

export default Categories;
