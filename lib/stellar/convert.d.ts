import { type xdr } from 'stellar-sdk';
import type { Identity } from './types';
export declare function scvalToString(value: xdr.ScVal): string | undefined;
export declare function scValToIdentity(value: xdr.ScVal): Identity;
