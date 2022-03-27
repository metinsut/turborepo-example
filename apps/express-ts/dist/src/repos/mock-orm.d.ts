/**
 * Fetch the json from the file.
 *
 * @returns
 */
declare function openDb(): Promise<Record<string, any>>;
/**
 * Update the file.
 *
 * @param db
 * @returns
 */
declare function saveDb(db: Record<string, any>): Promise<void>;
declare const _default: {
    readonly openDb: typeof openDb;
    readonly saveDb: typeof saveDb;
};
export default _default;
//# sourceMappingURL=mock-orm.d.ts.map