import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccordionPanel from 'catamaran/core/AccordionPanel';
import BranchFilter from './BranchFilter';
import BrandFilter from './BrandModel/BrandFilter';
import CategoryFilter from './CategoryFilter';
import CodeFilter from './CodeFilter';
import CollapsableButton from 'components/CollapsableButton';
import CreatedByFilter from './CreatedByFilter';
import CustodyFilter from './CustodyFilter';
import DateOfCreationFilter from './DateOfCreationFilter';
import DateOfPurchaseFilter from './DateOfPurchaseFilter';
import InfoIcon from 'catamaran/icons/Info';
import LocationFilter from './LocationFilter/LocationFilter';
import ModelFilter from './BrandModel/ModelFilter';
import PurchasedFirmFilter from './PurchasedFirmFilter';
import StatusFilter from './StatusFilter/StatusFilter';

type Props = {
  drawerOpen: boolean;
};

function InformationFilter(props: Props) {
  const { drawerOpen } = props;
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <AccordionPanel
        defaultExpanded
        icon={<InfoIcon color="darkGrey" hoverable={false} />}
        title={t('assets.assetFilter.information')}
      >
        <div className="grid">
          <BrandFilter />
          <ModelFilter />
          <CategoryFilter />
          <CodeFilter />
          <BranchFilter />
          <LocationFilter />
          <CustodyFilter />
          <CollapsableButton open={open} setOpen={setOpen}>
            <StatusFilter />
            <PurchasedFirmFilter />
            {drawerOpen && <DateOfPurchaseFilter />}
            <CreatedByFilter />
            {drawerOpen && <DateOfCreationFilter />}
          </CollapsableButton>
        </div>
      </AccordionPanel>
    </>
  );
}

export default InformationFilter;
