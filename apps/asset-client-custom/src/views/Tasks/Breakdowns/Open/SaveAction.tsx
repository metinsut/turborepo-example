import { CatKeyboardButton, CatPaper } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { MYREQUESTSLIST, TASKLIST } from 'routes/constant-route';
import { OpenBreakdown } from 'store/slices/breakdown/open/types';
import { createBreakdown, reopenMyRequest } from 'store/slices/breakdown/open/action';
import { useHistory } from 'react-router';
import { useLoading } from 'hooks';
import { useQuery } from 'hooks/useQuery';
import { useTranslation } from 'react-i18next';
import CatButton, { CancelButton } from 'catamaran/core/Button';
import PostIcon from 'catamaran/icons/Post';

type Props = {
  formHelper?: FormHelper<OpenBreakdown>;
  isUserAuthorized?: boolean;
};

const SaveAction = ({ isUserAuthorized = false, formHelper }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();

  const query = useQuery();
  const taskId = query.get('taskId');

  const [createBreakdownLoading, createBreakdownDispatch] = useLoading<void>({
    initialState: false
  });

  const SaveAction = async () => {
    if (taskId) {
      await createBreakdownDispatch(reopenMyRequest(taskId));
    } else {
      await createBreakdownDispatch(createBreakdown());
    }

    if (isUserAuthorized) {
      history.push(TASKLIST);
    } else {
      history.push(MYREQUESTSLIST);
    }
  };

  const isFormValid = formHelper.formState.isValid;

  return (
    <>
      <CatPaper className="fixed-container bot-8 grid gap-8 grid-auto-flow-column align-items-center justify-content-end opacity-9 p8">
        <CatKeyboardButton component={CancelButton} keyboardKey="escape" />
        <div className="divider-vertical" />
        <CatButton
          color="green"
          disabled={!isFormValid}
          endIcon={<PostIcon />}
          loading={createBreakdownLoading}
          onClick={SaveAction}
          size="large"
        >
          {t('tasks.breakdowns.open_breakdown.send_request')}
        </CatButton>
      </CatPaper>
    </>
  );
};

export default SaveAction;
