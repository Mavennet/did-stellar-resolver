import { SorobanRpc, xdr, Account } from 'stellar-sdk';
export declare const getContractValue: (client: SorobanRpc.Server, account: Account, operation: any) => Promise<xdr.ScVal>;
export declare const sendTransaction: (client: SorobanRpc.Server, account: Account, operation: any) => Promise<SorobanRpc.Api.SendTransactionResponse>;
