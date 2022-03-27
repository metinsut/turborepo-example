import { Box } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import EditHeader from 'components/Sections/EditHeader';
import PersonIcon from 'catamaran/icons/Person';
import PersonalInformationContent from './PersonalInformationContent';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  mode?: DisplayType;
  onCancel?: () => void;
  onGoBack?: () => void;
  onConfirm?: () => void;
  onNext?: () => void;
};

function EditMode(props: Props) {
  const classes = useStyles();
  const { className, mode, onCancel, onGoBack, onConfirm, onNext } = props;

  const { t } = useTranslation();

  const handleConfirm = async () => {
    await onConfirm();
    onNext();
  };

  const handleCancel = async () => {
    await onCancel();
    onGoBack();
  };

  return (
    <Box className={clsx(classes.root, className)}>
      <Box mb={2}>
        <EditHeader
          descriptionText={t('users.modal.personal_information.description')}
          headerIcon={<PersonIcon contained={false} hoverable={false} opacity={0.8} />}
          headerText={t('users.modal.personal_information.title')}
        />
      </Box>
      <PersonalInformationContent
        mode={mode}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onGoBack={onGoBack}
      />
    </Box>
  );
}

export default EditMode;
