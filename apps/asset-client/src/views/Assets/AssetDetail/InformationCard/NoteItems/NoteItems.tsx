import { Asset, SectionMode } from 'store/slices/asset/detail/types';
import { CatTypography } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import CopyIcon from 'catamaran/icons/Copy';
import NotesItem from './NotesItem';

type Props = {
  formHelper?: FormHelper<Asset>;
  onEditClick?: () => void;
  sectionMode: SectionMode;
};

const NoteItems = (props: Props) => {
  const { sectionMode, formHelper, onEditClick } = props;
  const { t } = useTranslation();

  return (
    <div className="grid gap-8">
      <div className="flex align-items-center gap-4">
        <CopyIcon className="mr4" fontSize="small" />
        <CatTypography variant="body1">{t('assets.asset_edit.notes_title')}</CatTypography>
      </div>
      <NotesItem formHelper={formHelper} mode={sectionMode} onEditClick={onEditClick} />
    </div>
  );
};

export default NoteItems;
