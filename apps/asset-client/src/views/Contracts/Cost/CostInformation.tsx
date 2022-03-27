import { Box } from 'catamaran/core';
import { Cost } from 'store/slices/contracts/types';
import { Grid, Skeleton, Typography } from 'catamaran/core/mui';
import { SectionWrapperProps, withSectionWrapper } from '../withSectionWrapper';
import { getCost, saveCost } from 'store/slices/contracts/actions';
import { selectCost } from 'store/slices/contracts/selectors';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CostIcon from 'catamaran/icons/Cost';
import Edit from './Edit/Edit';
import Readonly from './Readonly/Readonly';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

type Props = SectionWrapperProps & {
  className?: string;
  contractId?: string;
  disabled: boolean;
  isActive: boolean;
  onActivate: (active: boolean) => void;
};

function CostInformation(props: Props) {
  const { className, contractId, disabled, isActive, onActivate, sectionProps } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const cost = useTypedSelector(selectCost);

  const [costLoading, costLoadingDispatch] = useLoading<Cost>();
  useEffect(() => {
    if (contractId) {
      costLoadingDispatch(getCost(contractId));
    }
  }, [contractId, costLoadingDispatch]);

  const handleSetEditMode = () => onActivate(true);
  const handleCloseEditMode = () => onActivate(false);
  const handleSave = async (costToSave: Cost) => {
    const finalCost = await dispatch(saveCost(contractId, costToSave));

    return finalCost;
  };

  let content = null;
  if (costLoading) {
    content = (
      <Box>
        <Box borderRadius="3px" mb={2} mt={2}>
          <Skeleton height="60px" variant="rectangular" width="300px" />
        </Box>
        <Box borderRadius="8px">
          <Skeleton height="20px" variant="rectangular" width="120px" />
        </Box>
      </Box>
    );
  } else if (isActive) {
    content = (
      <Edit
        cost={cost}
        onGoBack={handleCloseEditMode}
        onSave={handleSave}
        sectionProps={sectionProps}
      />
    );
  } else {
    content = <Readonly cost={cost} onAddButtonClick={handleSetEditMode} />;
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
          <CostIcon className="opacity-8" color="darkGrey" contained={false} hoverable={false} />
          <Typography className="opacity-8 ml16" variant="subtitle1">
            {t('contracts.edit.cost_title')}
          </Typography>
        </Grid>
        <Box ml={5} width="100%">
          {content}
        </Box>
      </Grid>
    </>
  );
}

export default withSectionWrapper(CostInformation);
