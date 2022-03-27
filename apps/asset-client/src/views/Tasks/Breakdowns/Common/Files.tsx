import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar
} from 'catamaran/core';
import FileIcon from 'catamaran/icons/File';

const Files = () => (
  <CatDataCard color="darkGrey" transparentBackground>
    <CatSidebar>
      <CatEmptyIcon />
      <CatCenterIcon component={FileIcon} />
      <CatEmptyIcon />
    </CatSidebar>
    <CatMainContent />
  </CatDataCard>
);

export default Files;
