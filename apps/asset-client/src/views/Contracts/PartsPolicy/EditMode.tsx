import { Box, CatKeyboardSection } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Grid, Typography } from 'catamaran/core/mui';
import { PartsPolicy } from 'store/slices/contracts/types';
import { dequal } from 'dequal';
import { selectInitialPartsPolicy } from 'store/slices/contracts/selectors';
import { updatePartsPolicy } from 'store/slices/contracts/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import InfoIcon from 'catamaran/icons/Info';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import Parts from './Parts';
import PartsPolicyItemIcon from './PartsPolicyItemIcon';
import PartsPolicyTypeSelector from './PartsPolicyTypeSelector';
import theme from 'catamaran/theme';

type Props = {
  onGoBack: () => void;
  onSave: (partsPolicy: PartsPolicy) => Promise<PartsPolicy>;
  partsPolicy?: PartsPolicy;
  mode?: DisplayType;
};

function EditMode(props: Props) {
  const { onGoBack, onSave, partsPolicy, mode } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const initialPartsPolicy = useTypedSelector(selectInitialPartsPolicy) ?? {};

  const changed = !dequal(partsPolicy, initialPartsPolicy);

  const handleCancel = async () => {
    dispatch(updatePartsPolicy(initialPartsPolicy));
    onGoBack();
  };

  const handleSave = async () => {
    await onSave(partsPolicy);
    onGoBack();
  };

  return (
    <CatKeyboardSection onEnter={handleSave} onEscape={handleCancel} open>
      <>
        <Box mb={2}>
          <Typography variant="body2">{t('contracts.edit.parts.desc')}</Typography>
        </Box>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <PartsPolicyTypeSelector partPolicyType={partsPolicy.partPolicyType} />
          </Grid>
          <Grid item xs={6}>
            {partsPolicy.partPolicyType && partsPolicy.partPolicyType !== 'none' && (
              <Box
                alignItems="center"
                bg={theme.palette.lightGrey.main}
                borderRadius="8px"
                display="flex"
                flexDirection="row"
                width={369}
              >
                <Box p={1}>
                  <PartsPolicyItemIcon partsPolicy={partsPolicy.partPolicyType} />
                </Box>
                <Box flex>
                  <Typography noWrap style={{ opacity: '80%' }} variant="body1">
                    {t(`contracts.edit.parts.types_short.${partsPolicy.partPolicyType}`)}
                  </Typography>
                </Box>
                <Box ml={1}>
                  <InfoIcon color="darkGrey" contained fontSize="small" hoverable={false} />
                </Box>
                <Box flexWrap="wrap" ml={1}>
                  <Typography style={{ opacity: '&0%' }} variant="caption">
                    {t(`contracts.edit.parts.type_descriptions.${partsPolicy.partPolicyType}`)}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
        {(partsPolicy?.partPolicyType === 'somePartsNotIncluded' ||
          partsPolicy?.partPolicyType === 'somePartsIncluded') && (
          <Parts partsPolicy={partsPolicy} />
        )}
        <KeyboardSectionBottomButtons
          isConfirmDisabled={!partsPolicy.partPolicyType}
          mode={mode}
          touched={changed}
        />
      </>
    </CatKeyboardSection>
  );
}

export default EditMode;
