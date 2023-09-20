"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolver = void 0;
const StellarContract_1 = require("./stellar/StellarContract");
const helper_1 = require("./helper");
const config_1 = require("./stellar/config");
const getResolver = () => {
    return new StllrDIDResolver().build();
};
exports.getResolver = getResolver;
class StllrDIDResolver {
    async resolve(did, parsed, _unused, options) {
        if (parsed.method !== 'stllr') {
            throw new Error('Unsupported DID method');
        }
        const { address, networkId } = (0, helper_1.splitIdentifier)(did);
        const network = (0, config_1.getNetwork)(networkId);
        const contract = await StellarContract_1.StellarContract.create(network);
        const { owner } = await contract.identity(address);
        const publicKeyJwk = (0, helper_1.toPublicKey)(owner.toString()).export({ format: 'jwk' });
        const didDocument = {
            '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
            id: did,
            verificationMethod: [
                {
                    id: `${did}#controller`,
                    type: 'JsonWebKey2020',
                    controller: `did:stllr:${owner.toString()}`,
                    publicKeyJwk: {
                        kty: 'OKP',
                        crv: 'Ed25519',
                        x: publicKeyJwk.x
                    }
                }
            ],
            assertionMethod: [`${did}#controller`],
            authentication: [`${did}#controller`]
        };
        return {
            didDocumentMetadata: {},
            didResolutionMetadata: { contentType: 'application/did+ld+json' },
            didDocument
        };
    }
    build() {
        return {
            stllr: this.resolve.bind(this)
        };
    }
}
//# sourceMappingURL=resolver.js.map