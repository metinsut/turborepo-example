import { Box, CatToggleCard, CatToggleCardCheckbox, CatToggleCardChip } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { WorkType } from 'store/slices/common/types';
import { selectMainCategoryById } from 'store/slices/session';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CategoryIcon from 'catamaran/icons/Category';
import InfoIcon from 'catamaran/icons/Info';
import React from 'react';
import WarningIcon from 'catamaran/icons/Warning';
import WorkTypeIcon from 'views/Contracts/Metrics/DowntimeRules/WorkType/Icon';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  categoryId: string;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  workType: WorkType;
};

function WorkTypeCard(props: Props) {
  const classes = useStyles();
  const { categoryId, className, onClick, selected, workType } = props;

  const { t } = useTranslation();
  const category = useTypedSelector((state) => selectMainCategoryById(state, categoryId));

  if (!category || !workType) {
    return null;
  }

  const EndIcon = selected ? InfoIcon : WarningIcon;
  const workTypeResource = t(`contracts.edit.metrics.downTimeRules.work_types.${workType}`);
  const workTypeTitle = t('users.departments.work_type_card.work_type_chip', {
    workType: workTypeResource
  });

  return (
    <CatToggleCard
      className={clsx(classes.root, className)}
      onClick={onClick}
      selected={selected}
      style={{ height: 56, width: 516 }}
    >
      <Box alignItems="center" flex width="100%">
        <CatToggleCardCheckbox checked={selected} />
        <Box width="8px" />
        <CategoryIcon />
        <Box maxWidth="35%" ml={1}>
          <CatToggleCardChip reverseColors={selected} text={category?.name} />
        </Box>
        <Box
          height="16px"
          mx={2}
          style={{
            backgroundColor: selected ? '#F3F5F6' : '#494949',
            opacity: 0.2
          }}
          width="1px"
        />
        <WorkTypeIcon workType={workType} />
        <Box maxWidth="30%" ml={1}>
          <CatToggleCardChip filled reverseColors={selected} text={workTypeTitle} />
        </Box>
        <Box flex flexGrow={1} />
        <EndIcon
          alwaysHovered
          style={{
            backgroundColor: 'rgba(73, 73, 73, 0.1)'
          }}
        />
      </Box>
    </CatToggleCard>
  );
}

export default WorkTypeCard;
