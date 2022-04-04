import {
  Box,
  CatButton,
  CatIconButton,
  CatKeyboardIconButton,
  CatTypography
} from 'catamaran/core';
import { Divider, Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { clearFilter } from 'store/slices/asset/filter/slice';
import { getCriteriaCount } from 'store/slices/asset/filter/actions';
import { selectDraftFilter } from 'store/slices/asset/filter/selectors';
import { useDeepCompareEffect } from 'react-use';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import BookmarkIcon from 'catamaran/icons/Bookmark';
import CancelIcon from '../../../catamaran/icons/Cancel';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import FilterIcon from 'catamaran/icons/Filter';
import Node from 'components/Node';
import React, { useState } from 'react';
import SaveFilterDialog from './SaveFilterDialog';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    borderRadius: '16px 16px 0px 0px',
    boxShadow: '0px 2px 4px 0px rgba(73, 73, 73, 0.1)',
    height: '56px',
    opacity: 0.9,
    paddingLeft: '16px',
    paddingRight: '12px',
    width: '100%',
    zIndex: 1
  },
  saveFilterButton: {
    marginRight: '8px',
    width: 130
  },
  title: {
    marginLeft: '8px',
    opacity: '0.8'
  }
}));

type Props = {
  className?: string;
  saveFilterOpen: boolean;
  toggleSaveFilter: () => void;
};

function FilterDrawerHeader(props: Props) {
  const classes = useStyles();
  const { className, saveFilterOpen, toggleSaveFilter } = props;
  const { t } = useTranslation();

  const dispatch = useTypedDispatch();
  const [criteriaCount, setCriteriaCount] = useState(0);

  const draftFilter = useTypedSelector(selectDraftFilter);

  useDeepCompareEffect(() => {
    setCriteriaCount(getCriteriaCount(draftFilter));
  }, [draftFilter]);

  const isFilterEdited = criteriaCount > 0;

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  return (
    <Box className={clsx(classes.root, className)} flex>
      <Box flex flexGrow={1}>
        <FilterIcon color="darkGrey" contained={false} hoverable={false} />
        <CatTypography className={classes.title} variant="h2">
          {t('assets.assetFilter.title')}
        </CatTypography>
      </Box>
      <SaveFilterDialog open={saveFilterOpen} toggle={toggleSaveFilter} />
      <Box flex justifySelf="flex-end">
        {isFilterEdited && (
          <Box center flex>
            <CatButton
              className={classes.saveFilterButton}
              color="blue"
              endIcon={<BookmarkIcon />}
              onClick={toggleSaveFilter}
              size="small"
            >
              {t('assets.assetFilter.save_filter')}
            </CatButton>
            <ArrowRightIcon className="mr8" fontSize="small" />
            <Node
              className="mr8 h-full"
              value={
                <Trans
                  components={{ bold: <b /> }}
                  count={criteriaCount}
                  i18nKey="assets.assetFilter.filtered_field_count"
                  t={t}
                />
              }
            />
            <CatIconButton className="mr8" onClick={handleClearFilter}>
              <FilterCancelIcon color="red" />
            </CatIconButton>
            <Divider className="divider mr8" flexItem orientation="vertical" />
          </Box>
        )}
        <CatKeyboardIconButton keyboardKey="escape">
          <CancelIcon color="darkGrey" contained hoverable={false} />
        </CatKeyboardIconButton>
      </Box>
    </Box>
  );
}

export default FilterDrawerHeader;
