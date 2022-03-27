import { UserFilter } from 'store/slices/users/filter/types';
import { useFormState } from 'hooks';
import Branch from './Branch';
import Department from './Department';
import FirstName from './FirstName';
import JobTitle from './JobTitle';
import LastName from './LastName';
import classes from '../../../Users.module.scss';
import userFilterValidator from 'helpers/validations/User/UserFilterValidator';

const TopInputsFilter = () => {
  const user: UserFilter = {};
  const formHelper = useFormState(user, userFilterValidator);

  return (
    <div className={classes.filter_top_input}>
      <JobTitle />
      <FirstName formHelper={formHelper} />
      <LastName formHelper={formHelper} />
      <Branch />
      <Department />
    </div>
  );
};

export default TopInputsFilter;
