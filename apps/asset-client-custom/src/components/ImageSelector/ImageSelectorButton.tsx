import { CatIconButton } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { getImage } from 'store/slices/images';
import { useTypedDispatch } from 'hooks';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from 'catamaran/icons/Edit';
import ImageSelectorDialog from './ImageSelectorDialog';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import clsx from 'clsx';
import useHover from 'hooks/useHover';

const useStyles = makeStyles((theme: Theme) => ({
  buttonBig: {
    height: theme.spacing(5),
    width: theme.spacing(7)
  },
  buttonSmall: {
    height: theme.spacing(3),
    width: theme.spacing(4)
  },
  cameraIcon: {
    paddingTop: theme.spacing(0.3)
  },
  editIcon: {
    color: theme.palette.common.white,
    opacity: 0.9,
    position: 'absolute',
    zIndex: 100
  },
  filter: {
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: theme.spacing(0.5),
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 99
  },
  image: {
    borderRadius: theme.spacing(1),
    objectFit: 'contain'
  },
  lowerOpacity: {
    opacity: 0.5
  },
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(1.5),
    marginLeft: theme.spacing(1)
  }
}));

type Props = {
  className?: string;
  fetchRequired: boolean;
  hoverOnParent?: boolean;
  imageFile?: File;
  itemName: string;
  onConfirm?: (file: File) => void;
  onDelete?: () => Promise<void>;
  photoPath: string;
  setFetchRequired: Dispatch<SetStateAction<boolean>>;
  source: 'file' | 'path';
  useHoverOnSelf?: boolean;
  useBigIcon?: boolean;
};

function ImageSelectorButton(props: Props) {
  const classes = useStyles();
  const {
    className,
    fetchRequired,
    hoverOnParent,
    imageFile,
    itemName,
    onConfirm,
    onDelete,
    photoPath,
    setFetchRequired,
    source,
    useHoverOnSelf,
    useBigIcon
  } = props;

  const dispatch = useTypedDispatch();

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      if (photoPath && fetchRequired) {
        const image = (await dispatch(getImage(photoPath))) as string;
        setImageUrl(image);
        setFetchRequired(false);
      }
    };

    fetchImage();
  }, [dispatch, fetchRequired, photoPath, setFetchRequired, source]);

  useEffect(() => {
    if (source === 'file' && imageFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile, source]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoverOnSelf, hoverProps] = useHover();

  const hover = useHoverOnSelf ? hoverOnSelf : hoverOnParent;
  const showButton = imageUrl || (!imageUrl && hover) || useHoverOnSelf;

  const handleConfirm = (file: File) => {
    if (onConfirm) {
      onConfirm(file);
    }

    setDialogOpen(false);
  };

  const handleDelete = async () => {
    await onDelete?.();

    setImageUrl('');
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <ImageSelectorDialog
        imageUrl={imageUrl}
        itemName={itemName}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        open={dialogOpen}
      />
      {showButton && (
        <CatIconButton
          className={clsx(classes.root, className)}
          onClick={() => setDialogOpen(true)}
          {...hoverProps}
        >
          {imageUrl ? (
            <>
              {hover && (
                <>
                  <EditIcon className={classes.editIcon} fontSize="medium" id="test" />
                  <div className={classes.filter} />
                </>
              )}
              <img
                alt=""
                className={clsx({
                  [classes.image]: true,
                  [classes.buttonBig]: useBigIcon,
                  [classes.buttonSmall]: !useBigIcon,
                  [classes.lowerOpacity]: hover
                })}
                src={imageUrl}
              />
            </>
          ) : (
            <CameraAltIcon
              className={clsx({
                [classes.cameraIcon]: true,
                [classes.buttonBig]: useBigIcon,
                [classes.buttonSmall]: !useBigIcon
              })}
              color="primary"
              fontSize="small"
            />
          )}
        </CatIconButton>
      )}
    </div>
  );
}

export default ImageSelectorButton;
