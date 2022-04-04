import {
  CatCenterIcon,
  CatDataCard,
  CatIconButton,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { EmptyIcon } from 'catamaran/core/DataCard';
import { PagedRequestOptions, PagedResult } from 'store/common';
import { Person } from 'store/slices/persons';
import { Trans, useTranslation } from 'react-i18next';
import { useDialogState } from 'hooks';
import PersonIcon from 'catamaran/icons/Person';
import PersonSelectorDialog from 'views/Persons/PersonSelectorDialog';
import PlusIcon from 'catamaran/icons/Plus';

type Props = {
  assistantPersonnelIds: string[];
  fetchPersons: (options: PagedRequestOptions, searchText?: string) => Promise<PagedResult<Person>>;
  onResponsiblePersonnelIdChange: (personId: string) => void;
};

const ResponsibleNotAssigned = (props: Props) => {
  const { assistantPersonnelIds, fetchPersons, onResponsiblePersonnelIdChange } = props;
  const { t } = useTranslation();

  const { isOpen: selectOpen, togglePopup: toggleSelectDialog } = useDialogState();
  const closeDialog = () => {
    toggleSelectDialog(false);
  };

  const openDialog = () => {
    toggleSelectDialog(true);
  };

  const handleDialogConfirm = async (personIds: Person[]) => {
    await onResponsiblePersonnelIdChange(personIds[0]?.id ?? undefined);
  };

  return (
    <>
      <CatDataCard color="blue" minWidth="auto">
        <CatSidebar>
          <EmptyIcon />
          <CatCenterIcon component={PersonIcon} />
          <EmptyIcon />
        </CatSidebar>
        <CatMainContent className="p8 grid" onClick={openDialog}>
          <CatTypography variant="subtitle1">
            {t('tasks.breakdowns.open_breakdown.who_is_handle_it.responsible_person')}
          </CatTypography>
          <CatTypography className="font-italic opacity-8">
            {t('tasks.breakdowns.open_breakdown.who_is_handle_it.all_staff')}
          </CatTypography>
          <div className="flex align-items-center align-self-end gap-8">
            <CatIconButton>
              <PlusIcon color="blue" />
            </CatIconButton>
            <CatTypography className="opacity-8" variant="subtitle1">
              <Trans
                i18nKey="tasks.breakdowns.open_breakdown.who_is_handle_it.click_add_responsible_person"
                t={t}
              />
            </CatTypography>
          </div>
        </CatMainContent>
      </CatDataCard>
      <PersonSelectorDialog
        allowEmptySelection
        defaultSelectedPersons={[]}
        description={
          <Trans
            i18nKey="tasks.breakdowns.open_breakdown.who_is_handle_it.responsible_person_assign"
            t={t}
          />
        }
        disabledPersonIds={assistantPersonnelIds}
        fetchPersons={fetchPersons}
        onClose={closeDialog}
        onConfirm={handleDialogConfirm}
        open={selectOpen}
        title={t('tasks.breakdowns.open_breakdown.who_is_handle_it.responsible_person')}
      />
    </>
  );
};

export default ResponsibleNotAssigned;
