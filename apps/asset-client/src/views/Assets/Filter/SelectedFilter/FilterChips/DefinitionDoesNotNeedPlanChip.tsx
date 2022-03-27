import { CatChip } from 'catamaran/core';
import { DefinitionPlanTypes } from 'store/slices/asset/filter/types';
import { Trans, useTranslation } from 'react-i18next';
import { removeDefinitionDoesNotNeedPlan } from 'store/slices/asset/filter/slice';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  modal?: boolean;
  planType?: DefinitionPlanTypes;
}

const DefinitionDoesNotNeedPlanChip = ({ modal, planType }: Props) => {
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
            i18nKey="assets.assetFilter.not_need_plans"
            t={t}
            values={{ type: t(`assets.protection.${planType}_field`) }}
          />
        }
        onDelete={() => dispatch(removeDefinitionDoesNotNeedPlan(planType))}
      />
    </div>
  );
};

export default DefinitionDoesNotNeedPlanChip;
