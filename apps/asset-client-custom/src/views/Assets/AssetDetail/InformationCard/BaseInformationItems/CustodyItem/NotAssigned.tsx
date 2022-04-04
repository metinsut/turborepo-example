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
import PersonIcon from 'catamaran/icons/Person';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
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
      color={(hovered: boolean) => (hovered ? 'blue' : 'darkGrey')}
      dashedBorder
      transparentBackground
    >
      {(hovered) => (
        <>
          <CatSidebar>
            <CatEmptyIcon />
            <CatCenterIcon component={PersonIcon} />
            <CatEmptyIcon />
          </CatSidebar>
          <CatMainContent onClick={onEdit}>
            {!hovered ? (
              <Box alignItems="center" display="flex" height={1}>
                <CatTypography color="inherit" variant="subtitle1">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="assets.asset_edit.custody_not_selected_title"
                    t={t}
                  />
                </CatTypography>
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
                    i18nKey="assets.asset_edit.click_to_assign_custody"
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
