import { CatCardIconButton, CatCenterIcon, CatDataCard, CatSidebar } from 'catamaran/core';
import { EmptyIcon } from 'catamaran/core/DataCard';
import EditIcon from 'catamaran/icons/Edit';
import LoadingIcon from 'catamaran/icons/Loading';
import MultiCardContent from './MultiCardContent';
import PersonCardSkeleton from './PersonCardSkeleton';
import PersonIcon from 'catamaran/icons/Person';
import React from 'react';
import SingleCardContent from './SingleCardContent';
import TrashIcon from 'catamaran/icons/Trash';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Props = {
  className?: string;
  cardTitle: string | React.ReactElement;
  editable?: boolean;
  loading?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  personIds: string[];
  removable?: boolean;
  transparentBackground?: boolean;
};

function PersonCard({
  className,
  cardTitle,
  editable = true,
  loading,
  onEdit,
  onDelete,
  personIds,
  removable,
  transparentBackground
}: Props) {
  const [deleteLoading, asyncDeleteLoading] = useLoadingWithoutDispatch<any>();
  const handleDelete = async () => {
    await asyncDeleteLoading(onDelete());
  };

  if (loading) {
    return <PersonCardSkeleton />;
  }

  return (
    <CatDataCard
      className={className}
      color="darkGrey"
      transparentBackground={transparentBackground}
    >
      <CatSidebar>
        {editable ? (
          <CatCardIconButton onClick={onEdit}>
            <EditIcon color="lightBlue" />
          </CatCardIconButton>
        ) : (
          <EmptyIcon />
        )}
        <CatCenterIcon component={PersonIcon} />
        {removable ? (
          <CatCardIconButton loading={deleteLoading} onClick={handleDelete}>
            {deleteLoading ? <LoadingIcon color="lightGrey" /> : <TrashIcon color="red" />}
          </CatCardIconButton>
        ) : (
          <EmptyIcon />
        )}
      </CatSidebar>
      {personIds.length > 1 ? (
        <MultiCardContent cardTitle={cardTitle} personIds={personIds} />
      ) : (
        <SingleCardContent cardTitle={cardTitle} personId={personIds[0]} />
      )}
    </CatDataCard>
  );
}

export default PersonCard;
