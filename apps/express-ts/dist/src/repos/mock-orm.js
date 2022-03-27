"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonfile_1 = tslib_1.__importDefault(require("jsonfile"));
const dbFilePath = 'src/repos/database.json';
/**
 * Fetch the json from the file.
 *
 * @returns
 */
function openDb() {
    return jsonfile_1.default.readFile(dbFilePath);
}
/**
 * Update the file.
 *
 * @param db
 * @returns
 */
function saveDb(db) {
    return jsonfile_1.default.writeFile(dbFilePath, db);
}
// Export default
exports.default = {
    openDb,
    saveDb,
};
