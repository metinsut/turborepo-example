import { CatTypography, useLocalizationHelpers } from 'catamaran/core';
import { FORMBUILDER } from 'routes/constant-route';
import { Form } from 'store/slices/assetConfiguration/forms/types';
import { Paper, Typography, styled } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { selectMainCategoryById } from 'store/slices/session';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from 'hooks';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import EditIcon from 'catamaran/icons/Edit';

const StyledPaper = styled(Paper)(() => ({
  '& .fade-in': {
    opacity: 0,
    transition: 'all 0.30s ease-out',
    width: '0px'
  },
  '&:hover': {
    '& .fade-in': {
      opacity: 1,
      width: '24px'
    },
    opacity: 1
  },
  opacity: 0.8,
  transition: 'opacity 0.30s ease-out'
}));

type Props = {
  form: Form;
};

function FormItem(props: Props) {
  const { form } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const { formatDateAndTime } = useLocalizationHelpers();

  const mainCategory = useTypedSelector((state) =>
    selectMainCategoryById(state, form.mainCategoryId)
  );

  const handleClick = () => {
    history.push(`${FORMBUILDER}?formId=${form.id}`);
  };

  if (!mainCategory) {
    return null;
  }

  return (
    <StyledPaper
      className="flex mt8 px24 radius-16 cursor-pointer"
      onClick={handleClick}
      style={{ minHeight: '72px' }}
    >
      <div className="flex gap-8 align-items-center w-full">
        <div className="fade-in">
          <EditIcon fontSize="medium" />
        </div>
        <div className="flex justify-content-between w-full py16">
          <div className="grid justify-content-center align-items-start">
            <Typography className="opacity-8 flex" component="span" variant="body2">
              <Trans
                components={{
                  marginElement: <div className="mr4" />,
                  wrapper: <div className="fade-in" />
                }}
                i18nKey="categories.forms.asset_form_template_for"
                t={t}
              />
            </Typography>
            <CatTypography variant="subtitle1">{mainCategory.name}</CatTypography>
          </div>
          <div className="grid justify-content-center align-items-end">
            {form.updatedDate && (
              <CatTypography className="opacity-8" variant="caption">
                <Trans
                  i18nKey="categories.forms.last_edited"
                  t={t}
                  values={{ date: formatDateAndTime(form.updatedDate) }}
                />
              </CatTypography>
            )}
            {form.updatedByUser && (
              <CatTypography className="text-right" variant="body2">
                {`${form.updatedByUser?.firstName} ${form.updatedByUser?.lastName}`}
              </CatTypography>
            )}
          </div>
        </div>
        <div className="fade-in">
          <AvatarItem person={form.updatedByUser} size="medium" />
        </div>
      </div>
    </StyledPaper>
  );
}

export default FormItem;
