import { Box, CatMainContent, CatTypography } from 'catamaran/core';
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
  root: {
    maxWidth: 'calc(100% - 32px)'
  }
}));

type Props = MainContentProps & {
  personId: string;
  cardTitle: string | React.ReactElement;
};

function SingleCardContent(props: Props) {
  const classes = useStyles();
  const { className, personId, cardTitle, ...rest } = props;

  const { t } = useTranslation();
  const person = useTypedSelector((state) => selectPersonById(state, personId));

  if (!person) {
    return null;
  }

  return (
    <CatMainContent
      className={clsx(classes.root, className)}
      flex
      flexDirection="row"
      justifyContent="space-between"
      {...rest}
    >
      <Box className="overflow-hidden" flex flexDirection="column" justifyContent="space-between">
        <div className="grid">
          <CatTypography
            className="opacity-5 three-dot"
            style={{
              color: theme.palette.darkGrey.main
            }}
            variant="body1"
          >
            {cardTitle}
          </CatTypography>
          <Box height={4} />
          <CatTypography className="three-dot" variant="body1">
            {`${person.firstName} ${person.lastName}`}
          </CatTypography>
          {person.role && (
            <CatTypography className="opacity-8 three-dot" variant="body2">
              {t(`users.roles.${person.role}`)}
            </CatTypography>
          )}
        </div>
        <Box flex flexDirection="column">
          <CatTypography className="opacity-8 three-dot" variant="caption">
            {person.phoneNumber}
          </CatTypography>
          <CatTypography className="opacity-8 three-dot" variant="caption">
            {person.email}
          </CatTypography>
        </Box>
      </Box>
      <AvatarItem person={person} size="xLarge" />
    </CatMainContent>
  );
}

export default SingleCardContent;
