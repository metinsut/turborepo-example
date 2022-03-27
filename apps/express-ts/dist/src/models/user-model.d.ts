export interface IUser {
    id: number;
    name: string;
    email: string;
}
/**
 * Get a new User object.
 *
 * @returns
 */
declare function getNew(name: string, email: string): IUser;
/**
 * Copy a user object.
 *
 * @param user
 * @returns
 */
declare function copy(user: IUser): IUser;
declare const _default: {
    new: typeof getNew;
    copy: typeof copy;
};
export default _default;
//# sourceMappingURL=user-model.d.ts.map