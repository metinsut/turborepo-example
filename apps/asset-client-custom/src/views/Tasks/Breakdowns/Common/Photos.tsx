import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar
} from 'catamaran/core';
import PhotoIcon from 'catamaran/icons/Photo';

const Photos = () => (
  <CatDataCard color="darkGrey" transparentBackground>
    <CatSidebar>
      <CatEmptyIcon />
      <CatCenterIcon component={PhotoIcon} />
      <CatEmptyIcon />
    </CatSidebar>
    <CatMainContent />
  </CatDataCard>
);

export default Photos;
