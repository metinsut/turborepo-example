/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, CatButton, CatCheckbox, CatTypography } from 'catamaran/core';
import { LINKEXPIRED, REGISTERSECONDPAGE } from 'routes/constant-route';
import { Link } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { checkInvitationTokenValid } from 'store/slices/users/details/actions';
import { useDialogState, useTypedDispatch } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import ChevronRIcon from 'catamaran/icons/ChevronR';
import LoadingIcon from 'catamaran/icons/Loading';
import React, { useEffect, useState } from 'react';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import classes from './Invitation.module.scss';
import clsx from 'clsx';

interface Props {
  className?: string;
}

const RegisterFirstPage = (props: Props) => {
  const { className } = props;

  const dispatch = useTypedDispatch();
  const queries = useQuery();
  const [isLoading, setLoading] = useState(true);

  const { t } = useTranslation();
  const history = useHistory();

  const token = queries.get('Token');
  const userId = queries.get('UserId');
  const resetCode = queries.get('ResetCode');
  const identityUserId = queries.get('IdentityUserId');
  const returnUrl = queries.get('ReturnUrl');
  useEffect(() => {
    const checkInvitationToken = async () => {
      try {
        const isValid = await dispatch(checkInvitationTokenValid(token));
        if (!isValid) {
          history.push(LINKEXPIRED);
        }
      } catch (error) {
        history.push(LINKEXPIRED);
      } finally {
        setLoading(false);
      }
    };
    checkInvitationToken();
  }, [dispatch, history, token]);

  const handleNextClick = () => {
    const registerSecondPageUrl = `${REGISTERSECONDPAGE}?UserId=${userId}&Token=${token}&ResetCode=${resetCode}&IdentityUserId=${identityUserId}&ReturnUrl=${returnUrl}`;
    history.push(registerSecondPageUrl);
  };
  const [termsAgreed, setTermsAgreed] = useState(false);
  const checkTermsAgreed = () => {
    setTermsAgreed((prev) => !prev);
  };
  const { isOpen: isTermsOpen, togglePopup: toggleTermsPopup } = useDialogState();
  const handleTermsLinkClick = () => {
    toggleTermsPopup(true);
  };

  const handleTermsModalClose = () => {
    toggleTermsPopup(false);
  };
  return (
    <div className={clsx(className, classes.invitation)}>
      {isLoading && (
        <Box center flex>
          <LoadingIcon fontSize="large" style={{ padding: '1px' }} />
        </Box>
      )}
      {!isLoading && (
        <>
          <div className={classes.title}>
            <p className="text-xLarge opacity-8">{t('session.register')}</p>
          </div>
          <CatTypography className="opacity-6" variant="body1">
            {t('session.register_info')}
          </CatTypography>
          <div className={classes.action_area}>
            <div className="flex bg-darkgrey-o-1 radius-24 align-items-center w-inherit">
              <label className="flex align-items-center" htmlFor="terms">
                <CatCheckbox
                  checked={termsAgreed}
                  id="terms"
                  onClick={checkTermsAgreed}
                  paddingSize="medium"
                />
                <CatTypography className="opacity-8 mr8" variant="body2">
                  <Trans
                    components={{
                      a: <Link href="#" onClick={handleTermsLinkClick} />
                    }}
                    i18nKey="session.terms_link"
                    t={t}
                  />
                </CatTypography>
              </label>
            </div>
            <CatButton
              color="blue"
              disabled={!termsAgreed}
              endIcon={<ChevronRIcon />}
              onClick={handleNextClick}
              size="large"
            >
              {t('common.next')}
            </CatButton>
          </div>
        </>
      )}
      {isTermsOpen && (
        <TermsAndConditionsModal onClose={handleTermsModalClose} open={isTermsOpen} />
      )}
    </div>
  );
};

export default RegisterFirstPage;
