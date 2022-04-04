import { getImage } from 'store/slices/images';
import { useEffect, useState } from 'react';
import useLoading from './useLoading';

export const useGetImage = (
  photoPath: string,
  fetchRequired: boolean = false,
  onImageFetched: () => void = undefined
) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoading, imageLoadingDispatch] = useLoading();

  useEffect(() => {
    const fetchImage = async () => {
      if (photoPath) {
        const image = (await imageLoadingDispatch(getImage(photoPath))) as string;
        setImageUrl(image);
      }
    };

    fetchImage();
  }, [imageLoadingDispatch, photoPath]);

  // Custom Fetch logic with an external flag
  useEffect(() => {
    const fetchImageIfRequired = async () => {
      if (fetchRequired) {
        let image = '';
        // If photoPath is present, fetch most recent image with api call
        // If photoPath is deleted, clear local image url
        if (photoPath) {
          image = (await imageLoadingDispatch(getImage(photoPath))) as string;
        }

        // After fetch operations are done, clear fetch required flag w/ fn callback
        onImageFetched?.();
        setImageUrl(image);
      }
    };

    fetchImageIfRequired();
  }, [fetchRequired, imageLoadingDispatch, imageUrl, photoPath, onImageFetched]);

  return { imageLoading, imageUrl };
};
