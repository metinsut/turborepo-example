import { CatChip } from 'catamaran/core';
import { DefinitionPlanTypes } from 'store/slices/asset/filter/types';
import { Trans, useTranslation } from 'react-i18next';
import { removeDefinitionNoPlan } from 'store/slices/asset/filter/slice';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  modal?: boolean;
  planType?: DefinitionPlanTypes;
}

const DefinitionNoPlanChip = ({ modal, planType }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatChip
        className="mr4"
        label={
          <Trans
            components={{ italic: <i /> }}
            i18nKey="assets.assetFilter.not_have_plans"
            t={t}
            values={{ type: t(`assets.protection.${planType}_field`) }}
          />
        }
        onDelete={() => dispatch(removeDefinitionNoPlan(planType))}
      />
    </div>
  );
};

export default DefinitionNoPlanChip;
