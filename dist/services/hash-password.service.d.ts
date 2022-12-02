export interface PasswordHasher<T = string> {
    hashPassword(password: T): Promise<T>;
    comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}
export declare class BcryptHasher implements PasswordHasher<string> {
    private readonly rounds;
    constructor(rounds: number);
    hashPassword(password: string): Promise<string>;
    comparePassword(providedPass: string, storedPass: string): Promise<boolean>;
}
