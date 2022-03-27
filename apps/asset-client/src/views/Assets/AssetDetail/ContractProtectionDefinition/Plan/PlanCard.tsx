import {
  Box,
  CatCardIconButton,
  CatCenterIcon,
  CatCornerContent,
  CatDataCard,
  CatMainContent,
  CatSidebar
} from 'catamaran/core';
import { Typography } from 'catamaran/core/mui';
import { disassociatePlan } from 'store/slices/plans/actions';
import { getPlanIconComponent } from 'views/Plans/PlanTypeIcon';
import { selectPlanById } from 'store/slices/plans/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AssignmentDetails from './AssignmentDetails';
import ContractDetail from './ContractDetail';
import EditIcon from 'catamaran/icons/Edit';
import PlanDisassociateDialog from 'views/Plans/PlanDisassociateDialog';
import PlanPageModal from 'views/Plans/PlanPageModal';
import React, { useState } from 'react';
import UnlinkIcon from 'catamaran/icons/Unlink';
import theme from 'catamaran/theme';

type Props = {
  className?: string;
  planId: string;
};

function PlanCard(props: Props) {
  const { className, planId } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const plan = useTypedSelector((state) => selectPlanById(state, planId));

  const [disassociateDialogOpen, setDisassociateDialogOpen] = useState(false);

  const handleDisassociate = async () => {
    await dispatch(disassociatePlan(planId));
  };

  const handleDisassociateDialogClose = () => {
    setDisassociateDialogOpen(false);
  };

  const handleDisassociateDialogOpen = () => {
    setDisassociateDialogOpen(true);
  };

  const [detailOpen, setDetailOpen] = React.useState(false);
  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const handleDetailOpen = () => {
    setDetailOpen(true);
  };

  if (!plan) {
    return null;
  }

  return (
    <>
      <CatDataCard className={className} color="blue" minHeight="117px">
        {(hover) => (
          <>
            <CatSidebar>
              <CatCardIconButton onClick={handleDetailOpen}>
                <EditIcon color="lightBlue" />
              </CatCardIconButton>
              <CatCenterIcon component={getPlanIconComponent(plan.type)} />
              <CatCardIconButton onClick={handleDisassociateDialogOpen}>
                <UnlinkIcon color="red" />
              </CatCardIconButton>
            </CatSidebar>
            <CatMainContent
              col
              color={theme.palette.blue.main}
              flex
              justifyContent="space-between"
              minWidth={0}
            >
              <Box col flex>
                <Typography
                  className="three-dot"
                  color={!hover ? 'inherit' : 'initial'}
                  variant="h2"
                >
                  {plan.title}
                </Typography>
                <Typography style={{ opacity: 0.8 }} variant="body1">
                  {t('plans.item.type_field_2', { type: t(`plans.types.${plan?.type}`) })}
                </Typography>
              </Box>
              <AssignmentDetails planId={planId} />
              <CatCornerContent>
                <ContractDetail contractId={plan?.contractId} />
              </CatCornerContent>
            </CatMainContent>
          </>
        )}
      </CatDataCard>
      <PlanPageModal id={plan.id} onClose={handleDetailClose} open={detailOpen} />
      <PlanDisassociateDialog
        onCancel={handleDisassociateDialogClose}
        onDisassociate={handleDisassociate}
        open={disassociateDialogOpen}
      />
    </>
  );
}

export default PlanCard;
