import { type Server, xdr } from 'soroban-client';
export declare const sendContractTransaction: (client: any, account: any, operation: any, params: any) => Promise<any>;
export declare const getContractValue: (client: Server, account: any, operation: any) => Promise<xdr.ScVal>;
