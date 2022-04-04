import { CatMenuItem, CatSelect } from 'catamaran/core';
import { PartsPolicyType } from 'store/slices/contracts/types';
import { Typography } from 'catamaran/core/mui';
import { partPolicies } from 'store/slices/contracts/data';
import { updatePartPolicyType } from 'store/slices/contracts/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import PartsPolicyItemIcon from './PartsPolicyItemIcon';

type Props = {
  className?: string;
  partPolicyType: PartsPolicyType;
};

function PartsPolicyTypeSelector(props: Props) {
  const { className, partPolicyType } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleChange = (event: any) => {
    const type = event.target.value;
    dispatch(updatePartPolicyType(type));
  };

  const renderType = partPolicyType ?? 'none';

  return (
    <CatSelect
      className={className}
      displayEmpty
      fullWidth
      label="ddfd"
      onChange={handleChange}
      renderValue={(selected) =>
        selected
          ? t(`contracts.edit.parts.types.${renderType}`)
          : t('contracts.edit.parts.spare_parts_policy')
      }
      value={renderType}
    >
      <CatMenuItem disabled key="" value="">
        {t('contracts.edit.parts.spare_parts_policy')}
      </CatMenuItem>
      {partPolicies.map((pp) => (
        <CatMenuItem key={pp} value={pp}>
          <PartsPolicyItemIcon fontSize="small" partsPolicy={pp} />
          <Typography component="p" variant="body2">
            {t(`contracts.edit.parts.types.${pp}`)}
          </Typography>
        </CatMenuItem>
      ))}
    </CatSelect>
  );
}

export default PartsPolicyTypeSelector;
