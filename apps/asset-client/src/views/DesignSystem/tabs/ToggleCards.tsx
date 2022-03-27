import { Box, CatToggleCard, CatToggleCardCheckbox } from 'catamaran/core';
import { Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { getDepartments } from 'store/slices/users/departments/actions';
import { selectAllBranches } from 'store/slices/branches';
import { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import { userRoles } from 'store/slices/users/common/data';
import AllBranchesOptionCard from 'components/Branch/BranchCard/AllBranchesOptionCard';
import BranchCard from 'components/Branch/BranchCard/BranchCard';
import CategoryCard from 'views/Departments/DepartmentModal/Categories/CategoryCard';
import DepartmentCard from 'views/Departments/DepartmentCard/DepartmentCard';
import EditIcon from 'catamaran/icons/Edit';
import InfoIcon from 'catamaran/icons/Info';
import RoleCard from 'views/Users/UserModal/AssetRoles/RoleCard/RoleCard';
import WorkTypeCard from 'views/Departments/DepartmentModal/WorkTypes/WorkTypeCard';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
};

function ToggleCards(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const [toggleState, setToggleState] = useState(false);
  const [depSelected1, setDepSelected1] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [categorySelected2, setCategorySelected2] = useState(false);
  const [categorySelected3, setCategorySelected3] = useState(false);
  const [workSelected, setWorkSelected] = useState(false);
  const [branchSelected, setBranchSelected] = useState(false);
  const [branchAllSelected, setBranchAllSelected] = useState(false);
  const [branchOptionSelected, setBranchOptionSelected] = useState(false);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const branches = useTypedSelector(selectAllBranches);
  return (
    <Paper className={clsx(classes.root, className)}>
      <Box flex>
        <CatToggleCard
          onClick={() => setToggleState(!toggleState)}
          selected={toggleState}
          style={{ height: 100, width: 200 }}
        >
          <Box alignItems="center" flex justifyContent="space-between">
            <InfoIcon />
            <CatToggleCardCheckbox checked={toggleState} />
            <Typography>Normal toggle button</Typography>
          </Box>
        </CatToggleCard>
        <CatToggleCard
          onClick={() => {
            /* route to edit page */
          }}
          style={{ height: 100, width: 200 }}
        >
          {(hovered: boolean) => (
            <Box flex justifyContent="space-between" width="100%">
              <Typography>Editable Item</Typography>
              {hovered && (
                <EditIcon
                  alwaysHovered
                  style={{
                    backgroundColor: 'rgba(73, 73, 73, 0.1)'
                  }}
                />
              )}
            </Box>
          )}
        </CatToggleCard>
        <CatToggleCard disabled style={{ height: 100, width: 200 }}>
          <Box flex justifyContent="space-between" width="100%">
            <Typography>Disabled Item</Typography>
          </Box>
        </CatToggleCard>
      </Box>
      <Box flex>
        <DepartmentCard
          departmentId="2385f64-5717-4562-b3fc-2c963f66afa6"
          onClick={() => setDepSelected1(!depSelected1)}
          selected={depSelected1}
        />
        <DepartmentCard
          departmentId="2385f64-5717-4562-b3fc-2c963f66afa6"
          editable
          onClick={() => {
            /* route to edit page */
          }}
        />
        <DepartmentCard departmentId="00a85f64-5717-4562-b3fc-2c963f66afa6" />
      </Box>
      <Box flex>
        <CategoryCard
          categoryId="1"
          onClick={() => setCategorySelected(!categorySelected)}
          selected={categorySelected}
        />
        <CategoryCard
          categoryId="2"
          onClick={() => setCategorySelected2(!categorySelected2)}
          selected={categorySelected2}
        />
        <CategoryCard
          categoryId="3"
          onClick={() => setCategorySelected3(!categorySelected3)}
          selected={categorySelected3}
        />
      </Box>
      <Box>
        <WorkTypeCard
          categoryId="2"
          onClick={() => setWorkSelected(!workSelected)}
          selected={workSelected}
          workType="maintenance"
        />
      </Box>
      <Box>
        {userRoles.map((role: any) => (
          <RoleCard key={role.id} roleType={role} />
        ))}
      </Box>
      <Box>
        <BranchCard
          branchId={branches[0]?.id ?? undefined}
          onClick={() => setBranchSelected(!branchSelected)}
          selected={branchSelected}
          userCount={290}
        />
        <BranchCard
          onClick={() => setBranchAllSelected(!branchAllSelected)}
          selectAll
          selected={branchAllSelected}
        />
      </Box>
      <Box>
        <AllBranchesOptionCard
          branchCount={12}
          onClick={() => setBranchOptionSelected(!branchOptionSelected)}
          selected={branchOptionSelected}
        />
      </Box>
    </Paper>
  );
}

export default ToggleCards;
