import { Box } from 'catamaran/core';
import { Grid, Skeleton, Typography } from 'catamaran/core/mui';
import { PartsPolicy } from 'store/slices/contracts/types';
import { SectionWrapperProps, withSectionWrapper } from '../withSectionWrapper';
import { getPartsPolicy, savePartsPolicy } from 'store/slices/contracts/actions';
import { isObjectNullOrEmpty } from 'utils/index';
import { selectInitialPartsPolicy, selectPartsPolicy } from 'store/slices/contracts/selectors';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DisplayMode from './DisplayMode';
import EditMode from './EditMode';
import PartsPolicyIcon from 'catamaran/icons/PartsPolicy';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

type Props = SectionWrapperProps & {
  className?: string;
  contractId?: string;
  disabled: boolean;
  isActive: boolean;
  onActivate: (active: boolean) => void;
};

function PartsPolicyInformation(props: Props) {
  const { className, contractId, disabled, isActive, onActivate } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const partsPolicy = useTypedSelector(selectPartsPolicy) ?? {};
  const initialPartsPolicy = useTypedSelector(selectInitialPartsPolicy);
  const mode = useMemo(
    () => (isObjectNullOrEmpty(initialPartsPolicy) ? 'add' : 'edit'),
    [initialPartsPolicy]
  );

  const [partsPolicyLoading, partsPolicyLoadingDispatch] = useLoading<PartsPolicy>();

  useEffect(() => {
    if (contractId) {
      partsPolicyLoadingDispatch(getPartsPolicy(contractId));
    }
  }, [contractId, partsPolicyLoadingDispatch]);

  const handleSetEditMode = () => onActivate(true);
  const handleCloseEditMode = () => onActivate(false);

  const handleSave = async (policy: PartsPolicy) => {
    const finalPartsPolicy = await dispatch(savePartsPolicy(contractId, policy));
    return finalPartsPolicy;
  };

  let content = null;
  if (partsPolicyLoading) {
    content = (
      <Box>
        <Box borderRadius="3px" mb={2}>
          <Skeleton height="60px" variant="rectangular" width="450px" />
        </Box>
        <Box borderRadius="8px">
          <Skeleton height="20px" variant="rectangular" width="120px" />
        </Box>
      </Box>
    );
  } else if (isActive) {
    content = (
      <EditMode
        mode={mode}
        onGoBack={handleCloseEditMode}
        onSave={handleSave}
        partsPolicy={partsPolicy}
      />
    );
  } else {
    content = (
      <DisplayMode mode={mode} onAddButtonClick={handleSetEditMode} partsPolicy={partsPolicy} />
    );
  }

  return (
    <>
      <div className="divider-horizontal ml40" />
      <Grid
        className={clsx(className, disabled ? 'opacity-3 pointer-events-none' : '')}
        container
        direction="row"
      >
        <Box alignItems="center" flex>
          <PartsPolicyIcon
            className="opacity-8"
            color="darkGrey"
            contained={false}
            hoverable={false}
          />
          <Typography className="opacity-8 ml16" variant="subtitle1">
            {t('contracts.edit.parts.title')}
          </Typography>
        </Box>
        <Box ml={5} width="100%">
          {content}
        </Box>
      </Grid>
    </>
  );
}

export default withSectionWrapper(PartsPolicyInformation);
