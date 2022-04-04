import { Box, CatButton } from 'catamaran/core';
import { DisplayType } from 'utils';
import { PartsPolicy } from 'store/slices/contracts/types';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import CloseIcon from 'catamaran/icons/Close';
import DisplayPartItem from './DisplayPartItem';
import EditIcon from 'catamaran/icons/Edit';
import PartsPolicyItemIcon from './PartsPolicyItemIcon';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import styles from './PartsPolicy.module.scss';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  partsPolicy?: PartsPolicy;
  onAddButtonClick: () => void;
  mode?: DisplayType;
};

function DisplayMode(props: Props) {
  const classes = useStyles();
  const { partsPolicy, onAddButtonClick, mode } = props;

  const { t } = useTranslation();

  return mode === 'add' ? (
    <>
      <Box alignItems="center" className="opacity-8" display="flex" mb={1}>
        <CloseIcon fontSize="large" />
        <Typography variant="subtitle1">{t('contracts.edit.no_info_added_yet')}</Typography>
      </Box>
      <CatButton color="green" endIcon={<PlusIcon />} onClick={onAddButtonClick} size="small">
        {t('common.add')}
      </CatButton>
    </>
  ) : (
    <>
      <div className="flex grid-auto-flow-column gap-8 my16">
        <Typography className="opacity-6" variant="body1">
          {t('contracts.edit.parts.spare_parts_policy')}
        </Typography>
        <Typography className="opacity-8" variant="subtitle1">
          <Trans
            i18nKey={`contracts.edit.parts.type_descriptions_short.${partsPolicy.partPolicyType}`}
            t={t}
          />
        </Typography>
      </div>
      <div className={styles.wrapper}>
        <PartsPolicyItemIcon fontSize="small" partsPolicy={partsPolicy.partPolicyType} />
        <Box ml={1}>
          <Typography className="opacity-6" variant="body1">
            {t(`contracts.edit.parts.types.${partsPolicy.partPolicyType}`)}
          </Typography>
        </Box>
        {partsPolicy.partList?.map((part, index) => (
          <DisplayPartItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            number={index + 1}
            part={part}
          />
        ))}
      </div>
      <CatButton color="blue" endIcon={<EditIcon />} onClick={onAddButtonClick} size="small">
        {t('common.edit')}
      </CatButton>
    </>
  );
}

export default DisplayMode;
