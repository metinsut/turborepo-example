import {
  Box,
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatIconButton,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import CategoryIcon from 'catamaran/icons/Category';
import InvalidFieldIcon from 'catamaran/icons/InvalidField';
import LighthouseIcon from 'catamaran/icons/Lighthouse';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import WarningIcon from 'catamaran/icons/Warning';
import clsx from 'clsx';
import theme from 'catamaran/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  onEdit: () => void;
};

function NotAssigned(props: Props) {
  const classes = useStyles();
  const { className, onEdit } = props;

  const { t } = useTranslation();

  return (
    <CatDataCard
      className={clsx(className, classes.root)}
      color={(hovered: boolean) => (hovered ? 'blue' : 'red')}
      dashedBorder
      transparentBackground
    >
      {(hovered) => (
        <>
          {!hovered && (
            <Box
              color="error.main"
              height="12px"
              ml="-9px"
              mt="48px"
              position="absolute"
              zIndex={1}
            >
              <InvalidFieldIcon fontSize="small" />
            </Box>
          )}
          <CatSidebar>
            <CatEmptyIcon />
            <CatCenterIcon component={CategoryIcon} />
            <CatEmptyIcon />
          </CatSidebar>
          <CatMainContent onClick={onEdit}>
            {!hovered ? (
              <Box flex flexDirection="column" justifyContent="center" pt="7px">
                <Box alignItems="center" color={theme.palette.red.main} flex>
                  <WarningIcon color="red" fontSize="small" hoverable={false} />
                  <Box width={8} />
                  <CatTypography color="inherit" variant="subtitle1">
                    <Trans
                      components={{ bold: <b /> }}
                      i18nKey="assets.asset_edit.add_an_asset_category_title"
                      t={t}
                    />
                  </CatTypography>
                </Box>
                <Box height={9} />
                <Box alignItems="center" flex>
                  <LighthouseIcon fontSize="small" />
                  <Box width={8} />
                  <CatTypography variant="body2">
                    {t('assets.asset_edit.add_an_asset_category_description')}
                  </CatTypography>
                </Box>
              </Box>
            ) : (
              <Box alignItems="center" color={theme.palette.blue.main} display="flex" height={1}>
                <CatIconButton>
                  <PlusIcon color="blue" />
                </CatIconButton>
                <Box width={8} />
                <CatTypography color="inherit" variant="subtitle1">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="assets.asset_edit.click_to_assign_category"
                    t={t}
                  />
                </CatTypography>
              </Box>
            )}
          </CatMainContent>
        </>
      )}
    </CatDataCard>
  );
}

export default NotAssigned;
