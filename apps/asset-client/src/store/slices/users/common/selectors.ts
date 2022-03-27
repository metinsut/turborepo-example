import { userRoles } from './data';

// TODO alt satırdaki ? işaretli yeri değiştirmemiz gerekiyor useFindObjectsChangedFields'i düzelt.
const selectUserRoleById = (id: string) => userRoles.find((role) => role.id === id);

export { selectUserRoleById };
