import { Box, CatKeyboardSection } from 'catamaran/core';
import { CATEGORIES } from 'routes/constant-route';
import { Department } from 'store/slices/users/departments/types';
import { DisplayType } from 'utils';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { checkDepartmentCategory } from 'store/slices/users/departments/slice';
import { selectAllMainCategories } from 'store/slices/session';
import { useHistory } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import Category2Icon from 'catamaran/icons/Category2';
import CategoryCard from './CategoryCard';
import EditHeader from 'components/Sections/EditHeader';
import InfoIcon from 'catamaran/icons/Info';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import React from 'react';
import WarningIcon from 'catamaran/icons/Warning';
import clsx from 'clsx';
import theme from 'catamaran/theme';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.blue.main,
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  root: {}
}));

type Props = {
  className?: string;
  department: Department;
  sectionMode: DisplayType;
  onCancel?: () => void;
  onGoBack?: () => void;
  onConfirm?: () => void;
  onNext?: () => void;
  touched: boolean;
};

function EditMode(props: Props) {
  const classes = useStyles();
  const { className, department, onCancel, onGoBack, onConfirm, onNext, sectionMode, touched } =
    props;

  const mainCategories = useTypedSelector(selectAllMainCategories);
  const dispatch = useTypedDispatch();
  const history = useHistory();

  const { t } = useTranslation();
  const handleCancel = async () => {
    await onCancel();
    onGoBack();
  };

  const handleConfirm = async () => {
    await onConfirm();
    onNext();
  };

  const handleCategoryClick = (categoryId: string) => {
    dispatch(checkDepartmentCategory(categoryId));
  };

  const navigateToCategories = () => {
    history.push(CATEGORIES);
  };

  const confirmDisabled = !department.mainCategories || department.mainCategories.length === 0;

  return (
    <CatKeyboardSection onEnter={handleConfirm} onEscape={handleCancel} open>
      <Box className={clsx(classes.root, className)}>
        <Box mb={2}>
          <EditHeader
            descriptionText={
              <Trans
                components={{ bold: <b /> }}
                i18nKey="users.departments.edit.category.description"
                t={t}
              />
            }
            headerIcon={<Category2Icon color="darkGrey" contained={false} hoverable={false} />}
            headerText={t('users.departments.edit.category.header')}
          />
        </Box>
        <Box flex flexWrap="wrap" mb={2}>
          {mainCategories.map((c) => (
            <Box key={c.id} mb={2} mr={2}>
              <CategoryCard
                categoryId={c.id}
                onClick={() => handleCategoryClick(c.id)}
                selected={!!department.mainCategories.find((i) => i.mainCategoryId === c.id)}
              />
            </Box>
          ))}
        </Box>
        <Box
          mx={4}
          p={2}
          style={{
            border: '1px solid rgba(73, 73, 73, 0.1)',
            borderRadius: '16px'
          }}
        >
          <Box alignItems="center" flex mb={2}>
            <WarningIcon color="orange" fontSize="small" hoverable={false} />
            <Box ml={1}>
              <Typography style={{ color: theme.palette.orange[800] }} variant="body2">
                <Trans
                  components={{ bold: <b /> }}
                  i18nKey="users.departments.edit.category.breakdown_warning"
                  t={t}
                />
              </Typography>
            </Box>
          </Box>
          <Box alignItems="center" flex>
            <InfoIcon color="darkGrey" fontSize="small" hoverable={false} />
            <Box ml={1}>
              <Typography variant="body2">
                <Trans
                  components={{
                    href: <span className={classes.link} onClick={navigateToCategories} />
                  }}
                  i18nKey="users.departments.edit.category.cant_see_categories"
                  t={t}
                />
              </Typography>
            </Box>
          </Box>
        </Box>

        <KeyboardSectionBottomButtons
          isConfirmDisabled={confirmDisabled}
          mode={sectionMode}
          touched={touched}
        />
      </Box>
    </CatKeyboardSection>
  );
}

export default EditMode;
