import type { Identity } from './types';
export declare class StellarContract {
    private readonly server;
    private readonly contract;
    private account;
    constructor(network: string);
    getAccount(): Promise<void>;
    identity(did: string): Promise<Identity>;
}
