import { CancelButton, ConfirmButton, GoBackButton } from 'catamaran/core/Button';
import { CatKeyboardButton, CatPaper } from 'catamaran/core';
import { METRICSCONFIGURATION_LIST } from 'routes/constant-route';
import { updateMetric } from 'store/slices/metricsConfiguration/detail/action';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoading } from 'hooks';

type Props = {
  mainCategoryId: string;
  metricChanged: boolean;
  metricValid: boolean;
};

function StickyBottomBar({ metricChanged, mainCategoryId, metricValid }: Props) {
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.push(`${METRICSCONFIGURATION_LIST}?main-category=${mainCategoryId}`);
  }, [history, mainCategoryId]);

  const [saveLoading, saveLoadingDispatch] = useLoading();
  const handleSaveChanges = async () => {
    await saveLoadingDispatch(updateMetric());
    handleGoBack();
  };

  const goBackDisabled = metricChanged;
  const cancelDisabled = !metricChanged || saveLoading;

  return (
    <>
      <CatPaper className="sticky-bottombar">
        <div className="flex align-items-center">
          <CatKeyboardButton
            component={GoBackButton}
            disabled={goBackDisabled}
            keyboardKey={goBackDisabled ? 'none' : 'escape'}
          />
        </div>
        <div className="flex align-items-center">
          <CatKeyboardButton
            component={CancelButton}
            disabled={cancelDisabled}
            keyboardKey={cancelDisabled ? 'none' : 'escape'}
          />
          <div className="divider-vertical" />
          <ConfirmButton
            disabled={!metricChanged || !metricValid}
            loading={saveLoading}
            onClick={handleSaveChanges}
          />
        </div>
      </CatPaper>
    </>
  );
}

export default StickyBottomBar;
