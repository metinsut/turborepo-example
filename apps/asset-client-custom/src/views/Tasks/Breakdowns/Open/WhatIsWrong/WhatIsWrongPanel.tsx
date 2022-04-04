import { CatPanel, CatPanelContent, CatPanelHeader } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { OpenBreakdown } from 'store/slices/breakdown/open/types';
import { Priority as PriorityType } from 'store/slices/breakdown/common/types';
import { Trans, useTranslation } from 'react-i18next';
import { selectPriority } from 'store/slices/breakdown/open/selector';
import { setPriority } from 'store/slices/breakdown/open/slice';
import { useCallback } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DefinitionItem from './DefinitionItem';
import Files from '../../Common/Files';
import Photos from '../../Common/Photos';
import Priority from '../../Common/Priority/Priority';
import RequestedPersonnel from './RequestedPersonnel';
import Usability from './Usability';
import clsx from 'clsx';
import styles from '../Breakdowns.module.scss';

type Props = {
  formHelper?: FormHelper<OpenBreakdown>;
  isUserAuthorized?: boolean;
  branchId: string;
};

function WhatIsWrongPanel({ branchId, formHelper, isUserAuthorized = false }: Props) {
  const { t } = useTranslation();

  const dispatch = useTypedDispatch();
  const priority = useTypedSelector(selectPriority);
  const handlePriorityChange = useCallback(
    (type: PriorityType) => {
      dispatch(setPriority(type));
    },
    [dispatch]
  );
  return (
    <CatPanel className={styles.panel_wrapper}>
      <CatPanelHeader
        title={<Trans i18nKey="tasks.breakdowns.open_breakdown.what_is_wrong_header" t={t} />}
      />
      <CatPanelContent className={clsx(styles.panel_content, 'grid gap-8 mt16-minus')}>
        <DefinitionItem formHelper={formHelper} />
        <Usability formHelper={formHelper} />
        <div className={clsx(!isUserAuthorized && styles.panel_wrapper)}>
          <Photos />
        </div>
        {isUserAuthorized && <RequestedPersonnel branchId={branchId} />}
        <div className={clsx(!isUserAuthorized && styles.panel_wrapper)}>
          <Files />
        </div>
        {isUserAuthorized && (
          <Priority onPriorityChange={handlePriorityChange} priority={priority} />
        )}
      </CatPanelContent>
    </CatPanel>
  );
}

export default WhatIsWrongPanel;
