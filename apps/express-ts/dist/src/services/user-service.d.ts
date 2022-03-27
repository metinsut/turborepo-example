import { IUser } from '../models/user-model';
/**
 * Get all users.
 *
 * @returns
 */
declare function getAll(): Promise<IUser[]>;
/**
 * Add one user.
 *
 * @param user
 * @returns
 */
declare function addOne(user: IUser): Promise<void>;
/**
 * Update one user.
 *
 * @param user
 * @returns
 */
declare function updateOne(user: IUser): Promise<void>;
/**
 * Delete a user by their id.
 *
 * @param id
 * @returns
 */
declare function deleteOne(id: number): Promise<void>;
declare const _default: {
    readonly getAll: typeof getAll;
    readonly addOne: typeof addOne;
    readonly updateOne: typeof updateOne;
    readonly delete: typeof deleteOne;
};
export default _default;
//# sourceMappingURL=user-service.d.ts.map