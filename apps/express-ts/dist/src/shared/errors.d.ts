export declare abstract class CustomError extends Error {
    readonly HttpStatus: number;
    constructor(msg: string, httpStatus: number);
}
export declare class ParamMissingError extends CustomError {
    static readonly Msg = "One or more of the required parameters was missing.";
    static readonly HttpStatus: number;
    constructor();
}
export declare class UserNotFoundError extends CustomError {
    static readonly Msg = "A user with the given id does not exists in the database.";
    static readonly HttpStatus: number;
    constructor();
}
//# sourceMappingURL=errors.d.ts.map