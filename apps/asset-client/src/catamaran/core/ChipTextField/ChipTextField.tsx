import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { maxEmailCount } from 'store/slices/users/details/data';
import { showSnackbarMessage } from 'store/slices/application';
import { useFormState, useTypedDispatch } from 'hooks';
import { useTranslation } from 'react-i18next';
import EditableTextField from 'components/CatamaranTextField/EditableTextField';
import EmailChip from './EmailChip';
import React from 'react';
import TabIndicator from './TabIndicator';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  inputRoot: {
    '& .startAdornmentContainer': {
      marginTop: '-6px !important'
    },
    '& textarea': {
      height: '24px !important',
      marginTop: '4px !important',
      width: 'fit-content'
    },
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    height: 'unset'
  },
  root: {
    '& .MuiTextField-root': {
      height: 'unset'
    },
    width: '100%'
  }
}));

type Props = {
  className?: string;
  emails?: string[];
  onChange?: (emails: string[]) => void;
};

function ChipTextField(props: Props) {
  const classes = useStyles();
  const { className, emails, onChange } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const formHelperEmails = useFormState({ email: '' });
  const fieldValue = formHelperEmails.formState.values.email;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentText = formHelperEmails.formState.values.email.trim();
    if ((event.key === 'Tab' || event.key === 'Enter') && !!currentText) {
      event.preventDefault();
      if (!emails.includes(currentText)) {
        onChange([...emails, currentText]);
      } else {
        showDuplicateSnackbar();
      }
      formHelperEmails.clear();
    } else if (event.key === 'Backspace' && !currentText && emails.length > 0) {
      onChange(emails.slice(0, emails.length - 1));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = event.target.value;
    const seperatorRegex = /,|\n|\t|\r\n|;/;
    const hasSeperators = text.match(seperatorRegex);

    if (hasSeperators) {
      const splitText = text.split(seperatorRegex);
      const filtered = splitText.filter((t) => !!t);

      const allMails = [...emails, ...filtered];
      const uniqueEmails = [...Array.from(new Set(allMails))];

      const filteredMailCount = allMails.length - uniqueEmails.length;

      onChange(uniqueEmails);
      formHelperEmails.clear();

      if (filteredMailCount > 0) {
        showDuplicateSnackbar(filteredMailCount);
      }
    }
  };

  const handleEmailDelete = (email: string) => {
    onChange(emails.filter((e) => e !== email));
  };

  const showDuplicateSnackbar = (count?: number) => {
    const message = t('users.modal.add_or_invite_users.invite_user_section.duplicate_snackbar', {
      count
    });
    dispatch(showSnackbarMessage(message, 'info'));
  };

  const startAdornments = emails.map((email, index) => (
    <EmailChip
      error={index >= maxEmailCount}
      key={email}
      onDelete={() => handleEmailDelete(email)}
      text={email}
    />
  ));

  return (
    <EditableTextField
      className={clsx(classes.root, className)}
      formHelper={formHelperEmails}
      InputProps={{
        className: classes.inputRoot,
        endAdornment: !!fieldValue && <TabIndicator />,
        startAdornment: startAdornments
      }}
      multiline
      name="email"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default ChipTextField;
