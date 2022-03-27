import {
  Box,
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import CategoryIcon from 'catamaran/icons/Category';
import InvalidFieldIcon from 'catamaran/icons/InvalidField';
import LockIcon from 'catamaran/icons/Lock';
import React from 'react';
import WarningIcon from 'catamaran/icons/Warning';
import clsx from 'clsx';
import theme from 'catamaran/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
};

function NotAssignedDisabled(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const { t } = useTranslation();

  return (
    <CatDataCard
      className={clsx(className, classes.root)}
      color="red"
      disabled
      transparentBackground
    >
      <>
        <Box color="error.main" height="12px" ml="-9px" mt="48px" position="absolute" zIndex={1}>
          <InvalidFieldIcon fontSize="small" />
        </Box>
        <CatSidebar>
          <CatEmptyIcon />
          <CatCenterIcon component={CategoryIcon} />
          <CatEmptyIcon />
        </CatSidebar>
        <CatMainContent>
          <Box flex flexDirection="column" justifyContent="center" pt="7px">
            <Box alignItems="center" color={theme.palette.red.main} flex>
              <WarningIcon color="red" fontSize="small" hoverable={false} />
              <Box width={8} />
              <CatTypography color="inherit" variant="subtitle1">
                <Trans
                  components={{ bold: <b /> }}
                  i18nKey="assets.asset_edit.category_not_selected_title"
                  t={t}
                />
              </CatTypography>
            </Box>
            <Box height={9} />
            <Box alignItems="center" flex>
              <LockIcon color="darkGrey" contained={false} fontSize="small" hoverable={false} />
              <Box width={8} />
              <CatTypography variant="body2">
                <Trans
                  components={{ bold: <b /> }}
                  i18nKey="assets.asset_edit.category_not_selected_desc"
                  t={t}
                />
              </CatTypography>
            </Box>
          </Box>
        </CatMainContent>
      </>
    </CatDataCard>
  );
}

export default NotAssignedDisabled;
