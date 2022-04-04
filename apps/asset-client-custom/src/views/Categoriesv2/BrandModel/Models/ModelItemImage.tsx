import { Fade } from 'catamaran/core/mui';
import { SwitchTransition } from 'react-transition-group';
import { fetchRequiredModelIdRemoved } from 'store/slices/modelsv2/slice';
import { selectFetchRequiredModelId } from 'store/slices/modelsv2/selectors';
import { useCallback } from 'react';
import { useGetImage } from 'hooks/useGetImage';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import LoadingIcon from 'catamaran/icons/Loading';

type Props = {
  modelId: string;
  photoPath: string;
};

function ModelItemImage({ modelId, photoPath }: Props) {
  const dispatch = useTypedDispatch();
  const fetchRequiredModelId = useTypedSelector(selectFetchRequiredModelId);
  const fetchRequired = modelId === fetchRequiredModelId;

  const handleImageFetched = useCallback(() => {
    dispatch(fetchRequiredModelIdRemoved());
  }, [dispatch]);

  const { imageUrl, imageLoading } = useGetImage(photoPath, fetchRequired, handleImageFetched);

  return (
    imageUrl && (
      <div className="grid align-content-center">
        <SwitchTransition>
          <Fade key={imageLoading.toString()}>
            {imageLoading ? (
              <span>
                <LoadingIcon />
              </span>
            ) : (
              <img
                alt={imageUrl}
                src={imageUrl}
                style={{
                  height: '32px',
                  width: '32px'
                }}
              />
            )}
          </Fade>
        </SwitchTransition>
      </div>
    )
  );
}

export default ModelItemImage;
