import DatesFilter from './Dates/Dates';
import PermissionsFilter from './Permissions/Permissions';
import RoleFilter from './Roles/RoleFilter';
import StatusFilter from './Status/StatusFilter';
import TopInputsFilter from './TopInputs/TopInputsFilter';
import classes from '../../Users.module.scss';

interface Props {
  drawerOpen?: boolean;
}

const FilterBody = ({ drawerOpen }: Props) => (
  <div className={classes.filter_body}>
    <TopInputsFilter />
    <div className="divider-horizontal my16" />
    <StatusFilter />
    <div className="divider-horizontal my16" />
    <RoleFilter />
    <div className="divider-horizontal my16" />
    <PermissionsFilter />
    <div className="divider-horizontal my16" />
    {drawerOpen && <DatesFilter />}
  </div>
);

export default FilterBody;
