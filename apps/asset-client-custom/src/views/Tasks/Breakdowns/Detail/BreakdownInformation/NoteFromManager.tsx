import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import TitleIcon from 'catamaran/icons/Title';

type Props = {
  noteFromManager?: string;
};

const NoteFromManager = (props: Props) => {
  const { noteFromManager } = props;
  const { t } = useTranslation();

  return (
    <div className="grid gap-8 grid-column-full">
      <div className="flex align-items-center gap-8">
        <InfoCautionIcon />
        <CatTypography variant="subtitle1">
          {t('tasks.detail.breakdown_information.note_from_manager.title')}
        </CatTypography>
      </div>
      <CatDataCard color="darkGrey" transparentBackground>
        <CatSidebar>
          <CatEmptyIcon />
          <CatCenterIcon component={TitleIcon} />
          <CatEmptyIcon />
        </CatSidebar>
        <CatMainContent>
          <CatTypography variant="body1">
            {t('tasks.detail.breakdown_information.note_from_manager.desc')}
          </CatTypography>
          <CatTypography className="opacity-8" variant="body1">
            {noteFromManager}
          </CatTypography>
        </CatMainContent>
      </CatDataCard>
    </div>
  );
};

export default NoteFromManager;
