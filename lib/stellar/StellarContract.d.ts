import { SorobanRpc } from 'stellar-sdk';
import { INetwork } from './config';
import type { Identity } from './types';
export declare class StellarContract {
    private server;
    private contract;
    private account;
    static create: (network: INetwork, account?: string) => Promise<StellarContract>;
    identity: (did: string) => Promise<Identity>;
    changeOwner: (did: string, currentOwner: string, newOwner: string) => Promise<SorobanRpc.Api.SendTransactionResponse>;
}
