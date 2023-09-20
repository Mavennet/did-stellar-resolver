import { type Server, xdr, Account, SorobanRpc } from 'soroban-client';
export declare const getContractValue: (client: Server, account: Account, operation: any) => Promise<xdr.ScVal>;
export declare const sendTransaction: (client: Server, account: Account, operation: any) => Promise<SorobanRpc.SendTransactionResponse>;
