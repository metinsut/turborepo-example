import { CatTypography } from 'catamaran/core';
import { Collapse } from 'catamaran/core/mui';
import { SectionMode } from 'store/slices/asset/detail/types';
import { isArrayNullOrEmpty } from 'utils';
import { useDynamicFieldSection } from '../DynamicItems/useDynamicFieldSection';
import { useTranslation } from 'react-i18next';
import SearchIcon from 'catamaran/icons/Search';

type Props = {
  isEditing: boolean;
  seeMoreOpen: boolean;
  onEditClick: () => void;
  sectionMode: SectionMode;
};

const IdentificationItems = (props: Props) => {
  const { sectionMode, onEditClick, isEditing, seeMoreOpen } = props;

  const { t } = useTranslation();
  const { assetFormFields, dynamicFieldSectionElement } = useDynamicFieldSection(
    'identification',
    sectionMode,
    onEditClick
  );

  if (isArrayNullOrEmpty(assetFormFields)) {
    return null;
  }

  return (
    <div className="grid gap-8">
      <Collapse in={isEditing || seeMoreOpen}>
        <div className="flex align-items-center gap-4">
          <SearchIcon fontSize="small" />
          <CatTypography variant="body1">
            {t('assets.asset_edit.identification_title')}
          </CatTypography>
        </div>
      </Collapse>
      <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <>{dynamicFieldSectionElement}</>
      </div>
    </div>
  );
};

export default IdentificationItems;
