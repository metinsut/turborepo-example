import { Box } from 'catamaran/core';
import { Firm } from 'store/slices/contracts/types';
import { Grid, Skeleton, Typography } from 'catamaran/core/mui';
import { SectionWrapperProps, withSectionWrapper } from '../withSectionWrapper';
import { getFirm, saveFirm } from 'store/slices/contracts/actions';
import { isObjectNullOrEmpty } from 'utils/index';
import { selectFirm, selectInitialFirm } from 'store/slices/contracts/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import Edit from './Edit';
import HomeIcon from 'catamaran/icons/Home';
import React, { useEffect, useMemo } from 'react';
import Readonly from './Readonly';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

type Props = SectionWrapperProps & {
  className?: string;
  contractId?: string;
  disabled: boolean;
  isActive: boolean;
  onActivate: (active: boolean) => void;
};

function FirmInformation(props: Props) {
  const { className, contractId, disabled, isActive, onActivate } = props;
  const dispatch = useTypedDispatch();

  const firm = useTypedSelector(selectFirm);
  const initialFirm = useTypedSelector(selectInitialFirm);

  const mode = useMemo(() => (isObjectNullOrEmpty(initialFirm) ? 'add' : 'edit'), [initialFirm]);

  const [firmLoading, firmLoadingDispatch] = useLoading<Firm>();
  useEffect(() => {
    const fetchFirm = async () => {
      if (contractId) {
        await firmLoadingDispatch(getFirm(contractId));
      }
    };
    fetchFirm();
  }, [contractId, firmLoadingDispatch]);

  const handleSetEditMode = () => onActivate(true);
  const handleCloseEditMode = () => {
    onActivate(false);
  };
  const handleSave = async (firmToSave: Firm) => {
    const finalFirm = await dispatch(saveFirm(contractId, firmToSave));

    return finalFirm;
  };

  const { t } = useTranslation();
  let content = null;
  if (firmLoading) {
    content = (
      <Box>
        <Box borderRadius="3px" mb={2}>
          <Skeleton height="20px" variant="rectangular" width="450px" />
        </Box>
        <Box borderRadius="8px">
          <Skeleton height="20px" variant="rectangular" width="120px" />
        </Box>
      </Box>
    );
  } else if (isActive) {
    content = <Edit firm={firm} mode={mode} onGoBack={handleCloseEditMode} onSave={handleSave} />;
  } else {
    content = <Readonly firm={firm} mode={mode} onAddButtonClick={handleSetEditMode} />;
  }

  return (
    <>
      <div className="divider-horizontal ml40" />
      <Grid
        className={clsx(className, disabled ? 'opacity-3 pointer-events-none' : '')}
        container
        direction="row"
      >
        <Grid alignItems="center" container direction="row">
          <HomeIcon className="opacity-8" color="darkGrey" contained={false} hoverable={false} />
          <Typography className="opacity-8 ml16" variant="subtitle1">
            {t('contracts.edit.firm_contact_header')}
          </Typography>
        </Grid>
        <Box ml={5} width="100%">
          {content}
        </Box>
      </Grid>
    </>
  );
}

export default withSectionWrapper(FirmInformation);
