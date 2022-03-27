import { CatPaper, CatTypography } from 'catamaran/core';
import { Modal, Slide } from 'catamaran/core/mui';
import { SearchResultType } from 'store/slices/asset/search/type';
import { Trans, useTranslation } from 'react-i18next';
import { forwardRef, useState } from 'react';
import { searchAsset } from 'store/slices/asset/search/actions';
import { useDebounce } from 'react-use';
import { useLoading } from 'hooks';
import FlashIcon from 'catamaran/icons/Flash';
import InputField from './InputField';
import LighthouseIcon from 'catamaran/icons/Lighthouse';
import SearchIcon from 'catamaran/icons/Search';
import SearchResult from './SearchResult';

type Props = {
  onClose?: () => void;
  onAssetSelect: (assetId: string) => Promise<void>;
  open?: boolean;
};

const AssetSearchModal = (props: Props, ref: React.Ref<any>) => {
  const { onClose, open, onAssetSelect } = props;
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResultType[]>([]);
  const [searchLoading, searchLoadingDispatch] = useLoading<SearchResultType[]>();

  useDebounce(
    async () => {
      const result = await searchLoadingDispatch(searchAsset(searchText));
      setSearchResult(result);
    },
    300,
    [searchText]
  );

  const handleChange = (inputText: string) => {
    setSearchText(inputText);
  };

  const itemFound = searchResult.length > 0;

  return (
    <Modal
      closeAfterTransition
      onClose={onClose}
      open={open}
      ref={ref}
      sx={{ alignContent: 'start', display: 'grid', height: '620px', justifyContent: 'center' }}
    >
      <Slide direction="up" in={open}>
        <div
          className="grid align-content-start p32 gap-24 radius-16 bg-lightGrey"
          style={{ marginTop: '10vh', minHeight: '176px', width: '424px' }}
        >
          <div className="grid gap-16">
            <div className="flex gap-8 align-items-center">
              <FlashIcon color="yellow" contained={false} hoverable={false} />
              <CatTypography variant="h2">{t('layout.content_layout.search.title')}</CatTypography>
            </div>
            <CatPaper className="grid gap-8 p8">
              <CatTypography className="opacity-8" variant="body1">
                {t('layout.content_layout.search.searchable_fields')}
              </CatTypography>
              <CatPaper className="grid gap-8 p8 bg-lightGrey" style={{ borderRadius: '8px' }}>
                <div className="flex gap-8 align-items-center">
                  <LighthouseIcon fontSize="small" />
                  <CatTypography className="opacity-8" variant="body2">
                    {t('layout.content_layout.search.auto_generated_code')}
                  </CatTypography>
                </div>
                <div className="divider-horizontal pl24" />
                <div className="flex gap-8 align-items-center">
                  <SearchIcon fontSize="small" />
                  <CatTypography className="opacity-8" variant="body2">
                    <Trans i18nKey="layout.content_layout.search.rest_of_fields" t={t} />
                  </CatTypography>
                </div>
              </CatPaper>
            </CatPaper>
            <InputField
              found={itemFound}
              loading={searchLoading}
              onChange={handleChange}
              searchText={searchText}
            />
          </div>
          <SearchResult onAssetSelect={onAssetSelect} searchResult={searchResult} />
        </div>
      </Slide>
    </Modal>
  );
};

export default forwardRef(AssetSearchModal);
