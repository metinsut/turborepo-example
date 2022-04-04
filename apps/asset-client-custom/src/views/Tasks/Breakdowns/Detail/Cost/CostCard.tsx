import { BreakdownCost } from 'store/slices/breakdown/common/types';
import {
  CatCardIconButton,
  CatCenterIcon,
  CatDataCard,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { useState } from 'react';
import AddOrEditCostDialog from './AddOrEditCostDialog';
import CostIcon from 'catamaran/icons/Cost';
import DeleteDialog from './DeleteDialog';
import EditIcon from 'catamaran/icons/Edit';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  breakdownId: string;
  breakdownCost: BreakdownCost;
};

const CostCard = ({ breakdownId, breakdownCost }: Props) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const toggleDeleteDialog = (open: boolean) => {
    setDeleteDialogOpen(open);
  };

  const onEdit = () => {
    setEditDialogOpen(true);
  };
  const onDelete = () => {
    toggleDeleteDialog(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      <CatDataCard color="darkGrey" minWidth="auto" transparentBackground>
        <CatSidebar>
          <CatCardIconButton onClick={onEdit}>
            <EditIcon color="lightBlue" />
          </CatCardIconButton>
          <CatCenterIcon component={CostIcon} />
          <CatCardIconButton onClick={() => onDelete()}>
            <TrashIcon color="red" />
          </CatCardIconButton>
        </CatSidebar>
        <CatMainContent className="grid align-content-between">
          <div>
            <CatTypography variant="subtitle1">{breakdownCost.explanation}</CatTypography>
            <CatTypography className="opacity-8" variant="body1">
              {breakdownCost.costType}
            </CatTypography>
          </div>
          <CatTypography className="flex align-items-center" variant="h2">
            {`$ ${breakdownCost.amount.toFixed(2)}`}
          </CatTypography>
        </CatMainContent>
      </CatDataCard>
      <AddOrEditCostDialog
        breakdownCost={breakdownCost}
        breakdownId={breakdownId}
        onClose={handleClose}
        open={editDialogOpen}
      />
      <DeleteDialog
        breakdownCostId={breakdownCost.id}
        breakdownId={breakdownId}
        onToggle={toggleDeleteDialog}
        open={deleteDialogOpen}
      />
    </>
  );
};

export default CostCard;
