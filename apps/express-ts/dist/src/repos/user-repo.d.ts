import { IUser } from '../models/user-model';
/**
 * Get one user.
 *
 * @param email
 * @returns
 */
declare function getOne(email: string): Promise<IUser | null>;
/**
 * See if a user with the given id exists.
 *
 * @param id
 */
declare function persists(id: number): Promise<boolean>;
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
declare function add(user: IUser): Promise<void>;
/**
 * Update a user.
 *
 * @param user
 * @returns
 */
declare function update(user: IUser): Promise<void>;
/**
 * Delete one user.
 *
 * @param id
 * @returns
 */
declare function deleteOne(id: number): Promise<void>;
declare const _default: {
    readonly getOne: typeof getOne;
    readonly persists: typeof persists;
    readonly getAll: typeof getAll;
    readonly add: typeof add;
    readonly update: typeof update;
    readonly delete: typeof deleteOne;
};
export default _default;
//# sourceMappingURL=user-repo.d.ts.map