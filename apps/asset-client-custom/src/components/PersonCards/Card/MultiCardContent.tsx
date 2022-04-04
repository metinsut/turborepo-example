import { Box, CatAvatarGroup, CatMainContent, CatTypography } from 'catamaran/core';
import { Props as MainContentProps } from 'catamaran/core/DataCard/components/MainContent';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectPersonById } from 'store/slices/persons';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import React from 'react';
import clsx from 'clsx';
import theme from 'catamaran/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = MainContentProps & {
  personIds: string[];
  cardTitle: string | React.ReactElement;
};

function MultiCardContent(props: Props) {
  const classes = useStyles();
  const { className, personIds, cardTitle, ...rest } = props;

  const { t } = useTranslation();

  return (
    <CatMainContent className={clsx(classes.root, className)} flex flexDirection="column" {...rest}>
      <CatTypography
        style={{
          color: theme.palette.darkGrey.main,
          opacity: 0.5
        }}
        variant="subtitle1"
      >
        {cardTitle}
      </CatTypography>
      <Box height={4} />
      <Box alignItems="center" flex>
        <CatAvatarGroup>
          {personIds.map((personId) => (
            <PersonItem key={personId} personId={personId} size="medium" />
          ))}
        </CatAvatarGroup>
        <Box width={4} />
        <CatTypography variant="body1">
          <i>
            {personIds.length} {t('assets.asset_edit.person_selected_multi')}
          </i>
        </CatTypography>
      </Box>
    </CatMainContent>
  );
}

function PersonItem(props: { personId: string; size: 'small' | 'medium' | 'large' | 'xLarge' }) {
  const { personId, size } = props;

  const person = useTypedSelector((state) => selectPersonById(state, personId));

  return <AvatarItem person={person} size={size} />;
}

export default MultiCardContent;
