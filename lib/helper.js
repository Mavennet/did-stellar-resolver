"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitIdentifier = exports.toPublicKey = exports.toDer = void 0;
const soroban_client_1 = require("soroban-client");
const crypto_1 = __importDefault(require("crypto"));
function toDer(key) {
    const oid = Buffer.from([0x06, 0x03, 0x2b, 0x65, 0x70]);
    const elements = Buffer.concat([
        Buffer.concat([
            Buffer.from([0x30]),
            Buffer.from([oid.length]),
            oid
        ]),
        Buffer.concat([
            Buffer.from([0x03]),
            Buffer.from([key.length + 1]),
            Buffer.from([0x00]),
            key
        ])
    ]);
    const der = Buffer.concat([
        Buffer.from([0x30]),
        Buffer.from([elements.length]),
        elements
    ]);
    return der;
}
exports.toDer = toDer;
function toPublicKey(key) {
    const keyBuffer = soroban_client_1.StrKey.decodeEd25519PublicKey(key);
    const der = toDer(keyBuffer);
    return crypto_1.default.createPublicKey({
        format: 'der',
        type: 'spki',
        key: der
    });
}
exports.toPublicKey = toPublicKey;
function splitIdentifier(did) {
    const didComponents = did.split(':');
    let protocol, didMethod, networkId, address;
    protocol = didComponents[0];
    didMethod = didComponents[1];
    if (didComponents.length >= 4) {
        networkId = parseInt(didComponents[2]);
        address = didComponents[3];
    }
    else {
        networkId = 2;
        address = didComponents[2];
    }
    if (protocol !== 'did') {
        throw new Error('Not a DID');
    }
    if (didMethod !== 'stllr') {
        throw new Error('Unsupported DID method');
    }
    return { networkId, address };
}
exports.splitIdentifier = splitIdentifier;
//# sourceMappingURL=helper.js.map