import {
  Box,
  CatDialogContent,
  CatDialogTitle,
  CatMenuItem,
  CatSelect,
  CatTypography
} from 'catamaran/core';
import { selectAllBranches } from 'store/slices/branches';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks';
import BranchIcon from 'catamaran/icons/Branch';

type Props = {
  branchId: string;
  handleChange: (event: any) => void;
};

function BranchDialog(props: Props) {
  const { branchId, handleChange } = props;

  const { t } = useTranslation();
  const branches = useTypedSelector(selectAllBranches);

  return (
    <>
      <CatDialogTitle iconComponent={BranchIcon} title={t('branches.wizard_select_branch')} />
      <CatDialogContent>
        <Box flex flexDirection="column">
          <CatTypography variant="body1">
            {t('assets.asset_edit.branch_select_desc_1')}
          </CatTypography>
          <Box height={24} />
          <CatTypography variant="body1">
            {t('assets.asset_edit.branch_select_desc_2')}
          </CatTypography>
          <Box height={24} />
          <CatSelect displayEmpty fullWidth onChange={handleChange} value={branchId ?? ''}>
            <CatMenuItem disabled key="" value="">
              {t('common.dropdown_generic_hint')}
            </CatMenuItem>
            {branches.map((b) => (
              <CatMenuItem key={b.id} value={b.id}>
                {b.name}
              </CatMenuItem>
            ))}
          </CatSelect>
        </Box>
      </CatDialogContent>
    </>
  );
}

export default BranchDialog;
