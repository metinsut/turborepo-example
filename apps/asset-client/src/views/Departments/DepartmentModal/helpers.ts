import { DisplayType } from 'utils';

export type SectionType = '' | 'basicInfo' | 'category' | 'workType';

export function decideNextSection(
  activeSection: SectionType,
  selectedSection: SectionType,
  isActivated: boolean,
  isCancel: boolean,
  isClose: boolean,
  mode: DisplayType,
  onClose: () => void
) {
  if (isActivated) {
    return selectedSection;
  }

  if (mode === 'add' && activeSection === 'category' && isCancel && isClose) {
    onClose();
    return undefined;
  }

  return '';
}
