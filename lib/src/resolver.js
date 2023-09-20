"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolver = void 0;
const StellarContract_1 = require("./StellarContract");
const soroban_client_1 = require("soroban-client");
const getResolver = () => {
    return new StllrDIDResolver();
};
exports.getResolver = getResolver;
class StllrDIDResolver {
    async resolve(did, parsed, didResolver, options) {
        if (did.split(':')[1] !== 'stllr') {
            throw new Error('Unsupported DID method');
        }
        if (did.split(':')[2] === undefined) {
            throw new Error('Invalid DID');
        }
        const account = did.split(':')[2];
        const contract = new StellarContract_1.StellarContract('standalone');
        await contract.getAccount();
        const { owner } = await contract.identity(account);
        soroban_client_1.StrKey.decodeEd25519PublicKey(owner.toString());
        const didDocument = {
            '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
            id: did,
            verificationMethod: [
                {
                    id: `${did}`,
                    type: 'JsonWebKey2020',
                    controller: `did:stllr:${owner.toString()}`,
                    publicKeyJwk: {
                        kty: 'OKP',
                        crv: 'Ed25519',
                        x: '9GXjPGGvmRq9F6Ng5dQQ_s31mfhxrcNZxRGONrmH30k'
                    }
                }
            ]
        };
        return {
            didResolutionMetadata: { contentType: 'application/did+ld+json' },
            didDocument,
            didDocumentMetadata: {}
        };
    }
}
//# sourceMappingURL=resolver.js.map