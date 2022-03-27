import { DialogLegacy } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { Typography, colors, styled } from 'catamaran/core/mui';
import { selectLocationLevelById } from 'store/slices/location/locationLevels/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { withDialogWrapper } from 'hooks';
import BottomBar from 'components/BottomBar';
import DisplayOnlyLocationManagement from './DisplayOnlyLocationManagement';
import React from 'react';

const StyledBottomBar = styled(BottomBar)(() => ({
  bottom: '30px',
  position: 'fixed',
  right: '9%',
  width: '84%'
}));

type Props = {
  className?: string;
  locationLevelId?: string;
  open: boolean;
  onGoBack?: () => void;
  onDelete?: () => void;
};

function LocationLevelDeleteDialog(props: Props) {
  const { className, locationLevelId, open, onGoBack, onDelete } = props;

  const { t } = useTranslation();

  const locationLevel = useTypedSelector((state) =>
    selectLocationLevelById(state, locationLevelId)
  );

  return (
    <DialogLegacy
      className={className}
      fullWidth
      maxWidth="lg"
      open={open}
      PaperProps={{
        style: {
          backgroundColor: colors.grey[300],
          borderRadius: 10
        }
      }}
    >
      <DisplayOnlyLocationManagement selectedLocationLevelId={locationLevelId} />
      <StyledBottomBar
        isDeleteDisabled={false}
        onDelete={onDelete}
        onGoBack={onGoBack}
        textElement={
          <Typography variant="body2">
            <Trans
              components={{ bold: <b /> }}
              i18nKey="locationLevels.delete_dialog_message"
              t={t}
              values={{ name: locationLevel.name }}
            />
          </Typography>
        }
      />
    </DialogLegacy>
  );
}

export default withDialogWrapper(LocationLevelDeleteDialog);
