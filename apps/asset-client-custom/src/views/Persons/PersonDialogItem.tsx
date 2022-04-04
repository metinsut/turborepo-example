import { Box, CatTypography } from 'catamaran/core';
import { ListItem, Theme, makeStyles } from 'catamaran/core/mui';
import { Person } from 'store/slices/persons';
import { useTranslation } from 'react-i18next';
import AvatarItem from './PersonSelectorItem/AvatarItem';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    marginRight: theme.spacing(1)
  },
  boldText: {
    fontWeight: 'bold'
  },
  checkOverlay: {
    background: `${theme.palette.greenGradient[800]}`
  },
  defaultCheckOverlay: {
    borderRadius: theme.spacing(2),
    height: theme.spacing(4),
    position: 'absolute',
    top: '11px',
    width: theme.spacing(4)
  },
  defaultOverlayIcon: {
    fontSize: 'large',
    height: 'auto',
    position: 'absolute',
    width: 'auto'
  },
  disabledCheckOverlay: {
    background: `${theme.palette.greenGradient[300]}`
  },
  disabledOverlayIcon: {
    backgroundColor: 'transparent !important',
    color: `${theme.palette.green.main} ! important`
  },
  lightOpacity: {
    opacity: '0.4'
  },
  mediumOpacity: {
    opacity: '0.6'
  },
  overlayIcon: {
    color: theme.palette.lightGrey.main
  },
  overlayNone: {
    display: 'none'
  },
  root: {}
}));

type Props = {
  className?: string;
  onClick?: (selectedPerson: Person) => void;
  person: Person;
  selected: boolean;
  disabled?: boolean;
};

function PersonDialogItem(props: Props, ref: React.Ref<any>) {
  const classes = useStyles();
  const { className, onClick, person, selected, disabled = false } = props;

  const { t } = useTranslation();

  const handleClick = () => {
    onClick(person);
  };
  return (
    <ListItem
      button
      className={clsx({
        [className]: true,
        [classes.lightOpacity]: disabled,
        [classes.root]: true
      })}
      disabled={disabled}
      disableGutters
      onClick={handleClick}
      ref={ref}
    >
      <Box center flex flexDirection="row" marginLeft="4px">
        <Box>
          <AvatarItem className={classes.avatar} person={person} size="large" />
          <Box
            center
            className={clsx({
              [classes.defaultCheckOverlay]: true,
              [classes.checkOverlay]: selected,
              [classes.disabledCheckOverlay]: disabled,
              [classes.overlayNone]: !selected && !disabled
            })}
          >
            <CheckIcon
              className={clsx({
                [classes.defaultOverlayIcon]: true,
                [classes.overlayIcon]: selected,
                [classes.disabledOverlayIcon]: disabled
              })}
              contained={false}
              hoverable={false}
            />
          </Box>
        </Box>
        <div className="grid">
          <CatTypography
            className={clsx({
              [classes.mediumOpacity]: !selected,
              [classes.boldText]: selected,
              'three-dot': true
            })}
            variant="h6"
          >
            {`${person.firstName} ${person.lastName}`}
          </CatTypography>
          <CatTypography
            className={clsx({
              [classes.lightOpacity]: !selected,
              'three-dot': true
            })}
            variant="body1"
          >
            {t(`users.roles.${person.role}`)}
          </CatTypography>
        </div>
      </Box>
    </ListItem>
  );
}

export default React.forwardRef(PersonDialogItem);
