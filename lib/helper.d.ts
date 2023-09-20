/// <reference types="node" />
/// <reference types="node" />
import crypto from 'crypto';
export declare function toDer(key: Buffer): Buffer;
export declare function toPublicKey(key: string): crypto.KeyObject;
export declare function splitIdentifier(did: string): {
    networkId: number;
    address: string;
};
