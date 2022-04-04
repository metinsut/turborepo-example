import { CatTypography } from 'catamaran/core';
import { Collapse, Fade } from '@mui/material';
import { SearchResultType } from 'store/slices/asset/search/type';
import { TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import AssetCard from './AssetCard';

type Props = {
  searchResult: SearchResultType[];
  onAssetSelect: (assetId: string) => Promise<void>;
};

const SearchResult = (props: Props) => {
  const { searchResult, onAssetSelect } = props;
  const { t } = useTranslation();

  return (
    <div className="grid overflow-y-auto" style={{ paddingRight: '80px' }}>
      <Fade className="absolute mt16-minus" in={searchResult.length > 0}>
        <CatTypography variant="body2">{t('layout.content_layout.search.asset')}</CatTypography>
      </Fade>
      <TransitionGroup className="grid gap-8">
        {searchResult.map((searchItem) => (
          <Collapse key={searchItem.id}>
            <AssetCard key={searchItem.id} onAssetSelect={onAssetSelect} searchItem={searchItem} />
          </Collapse>
        ))}
      </TransitionGroup>
      {/* {searchResult.length === 0 && <div style={{ height: '80px' }} />} */}
    </div>
  );
};

export default SearchResult;
