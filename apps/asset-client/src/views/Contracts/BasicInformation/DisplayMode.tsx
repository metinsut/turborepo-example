import { Box, CatButton, CatTypography, useLocalizationHelpers } from 'catamaran/core';
import { Contract } from 'store/slices/contracts/types';
import { selectMainCategoryById } from 'store/slices/session';
import { selectMultipleBranchesByIds } from 'store/slices/branches';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ContractIcon from '../ContractIcon';
import EditIcon from 'catamaran/icons/Edit';
import TitleIcon from 'catamaran/icons/Title';

type Props = {
  contract?: Contract;
  onEditClick?: () => void;
};

function DisplayMode(props: Props) {
  const { contract, onEditClick } = props;

  const { t } = useTranslation();
  const { formatDate } = useLocalizationHelpers();
  const contractTypeResource = contract ? t(`contracts.types.${contract.type}`) : '';

  const branches = useTypedSelector((state) =>
    selectMultipleBranchesByIds(state, contract.branchIds)
  );

  const mainCategory = useTypedSelector((state) =>
    selectMainCategoryById(state, contract.mainCategoryId)
  );

  const branchString = useMemo(() => {
    switch (branches.length) {
      case 0:
        return '';
      case 1:
        return branches[0]?.name ?? '';
      default:
        return t('contracts.edit.branch_selected_desc', { count: branches.length });
    }
  }, [branches, t]);

  return (
    <>
      <Box alignItems="center" display="flex" mb={2}>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.branch_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {branchString}
          </CatTypography>
        </Box>
        <Box className="opacity-1" px={2}>
          |
        </Box>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.main_category_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {mainCategory?.name}
          </CatTypography>
        </Box>
      </Box>
      <Box alignItems="center" flex mb={2} ml={-5}>
        <TitleIcon
          color="darkGrey"
          contained={false}
          hoverable={false}
          style={{ opacity: '80%' }}
        />
        <Box ml={2}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {t('contracts.edit.basic_information_header')}
          </CatTypography>
        </Box>
      </Box>
      <Box alignItems="center" display="flex" mb={2}>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.title_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography variant="subtitle1">{contract.title}</CatTypography>
        </Box>
        <Box className="opacity-1" px={2}>
          |
        </Box>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.type_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {contractTypeResource}
          </CatTypography>
        </Box>
        <Box ml={1}>
          <ContractIcon contractType={contract.type} fontSize="small" />
        </Box>
      </Box>
      <Box alignItems="center" display="flex" mb={2}>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.start_date_display_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {formatDate(contract.startDate)}
          </CatTypography>
        </Box>
        <Box className="opacity-1" px={2}>
          |
        </Box>
        <CatTypography className="opacity-6" variant="body1">
          {t('contracts.edit.end_date_display_field')}
        </CatTypography>
        <Box ml={1}>
          <CatTypography className="opacity-8" variant="subtitle1">
            {formatDate(contract.endDate)}
          </CatTypography>
        </Box>
      </Box>
      <CatButton color="blue" endIcon={<EditIcon />} onClick={onEditClick} size="small">
        {t('common.edit')}
      </CatButton>
    </>
  );
}

export default DisplayMode;
