import { Box, CatButton, CatTypography } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Firm } from 'store/slices/contracts/types';
import { useTranslation } from 'react-i18next';
import CloseIcon from 'catamaran/icons/Close';
import EditIcon from 'catamaran/icons/Edit';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import styles from './Firm.module.scss';

type Props = {
  firm?: Firm;
  onAddButtonClick: () => void;
  mode?: DisplayType;
};

function Readonly(props: Props) {
  const { firm, onAddButtonClick, mode } = props;
  const { t } = useTranslation();

  return mode === 'add' ? (
    <>
      <Box alignItems="center" className="opacity-8" display="flex" mb={1}>
        <CloseIcon fontSize="large" />
        <CatTypography variant="subtitle1">{t('contracts.edit.no_info_added_yet')}</CatTypography>
      </Box>
      <CatButton color="green" endIcon={<PlusIcon />} onClick={onAddButtonClick} size="small">
        {t('common.add')}
      </CatButton>
    </>
  ) : (
    <>
      <div className={styles.wrapper}>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.firm_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {firm.firmName}
          </CatTypography>
        </Box>
        <Box className="opacity-1" px={2}>
          |
        </Box>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.contact_person_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {firm.contactPerson}
          </CatTypography>
        </Box>
        <Box className="opacity-1" px={2}>
          |
        </Box>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.phone_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {firm.phone}
          </CatTypography>
        </Box>
        <Box className="opacity-1" px={2}>
          |
        </Box>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.email_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {firm.email}
          </CatTypography>
        </Box>
      </div>
      <CatButton color="blue" endIcon={<EditIcon />} onClick={onAddButtonClick} size="small">
        {t('common.edit')}
      </CatButton>
    </>
  );
}

export default Readonly;
