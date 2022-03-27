/* eslint-disable react/no-danger */
import { CatDialog, CatDialogContent, CatDialogTitle } from 'catamaran/core';
import { TermCondition } from 'store/slices/users/details/types';
import { getTermsAndConditions } from 'store/slices/users/details/actions';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import LighthouseLogo from 'catamaran/icons/LighthouseLogo';
import React, { useEffect, useState } from 'react';

type Props = {
  onClose?: () => void;
  open: boolean;
};

function TermsAndConditionsModal({ onClose, open }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [termsContent, setTermsContent] = useState<TermCondition>({ text: '' });

  useEffect(() => {
    async function fetchData() {
      const content = await dispatch(getTermsAndConditions());
      setTermsContent(content);
    }

    fetchData();
  }, [dispatch]);

  return (
    <CatDialog enableBackdropClickClose enableEscapeClose onClose={onClose} open={open}>
      <CatDialogTitle
        closable
        iconComponent={LighthouseLogo}
        title={t('session.terms_and_conditions.title')}
      />
      <CatDialogContent>
        <div dangerouslySetInnerHTML={{ __html: termsContent.text }} />
      </CatDialogContent>
    </CatDialog>
  );
}

export default TermsAndConditionsModal;
