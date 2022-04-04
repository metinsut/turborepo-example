import {
  Box,
  CatCardIconButton,
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar
} from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import PersonIcon from 'catamaran/icons/Person';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import clsx from 'clsx';

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
      color={(hover: boolean) => (hover ? 'blue' : 'darkGrey')}
      dashedBorder
      transparentBackground
    >
      {(hovered: boolean, color: string) => (
        <>
          <CatSidebar>
            <CatEmptyIcon />
            <CatCenterIcon component={PersonIcon} />
            <CatEmptyIcon />
          </CatSidebar>
          <CatMainContent onClick={onEdit}>
            <Box
              alignItems="flex-start"
              col
              color={hovered ? color : 'darkGrey.main'}
              flex
              height={1}
              justifyContent="center"
              opacity={0.8}
              width={1}
            >
              <Box alignItems="center" display="flex" justifyContent="space-between" width={1}>
                <Box>
                  {hovered ? (
                    <Typography color="inherit" variant="subtitle1">
                      <Trans
                        components={{ bold: <b /> }}
                        i18nKey="assets.asset_edit.click_to_assign_custody"
                        t={t}
                      />
                    </Typography>
                  ) : (
                    <Typography color="inherit" variant="subtitle1">
                      <Trans
                        components={{ bold: <b /> }}
                        i18nKey="assets.asset_edit.custody_not_selected_title"
                        t={t}
                      />
                    </Typography>
                  )}
                </Box>
                <CatCardIconButton>
                  <PlusIcon color="blue" />
                </CatCardIconButton>
              </Box>
            </Box>
          </CatMainContent>
        </>
      )}
    </CatDataCard>
  );
}

export default NotAssigned;
