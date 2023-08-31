import type {
  DIDDocument,
  DIDResolutionOptions,
  DIDResolutionResult,
  DIDResolver,
  ParsedDID,
  Resolvable
} from 'did-resolver'
import { StellarContract } from './StellarContract'
import { splitIdentifier, toPublicKey } from './helper'
import { getNetwork } from './config'

const getResolver = (): Record<string, DIDResolver> => {
  return new StllrDIDResolver().build()
}

class StllrDIDResolver {
  async resolve(
    did: string,
    parsed: ParsedDID,
    _unused: Resolvable,
    options: DIDResolutionOptions
  ): Promise<DIDResolutionResult> {
    if (parsed.method !== 'stllr') {
      throw new Error('Unsupported DID method')
    }

    const { address, networkId } = splitIdentifier(did)

    const network = getNetwork(networkId)

    const contract = new StellarContract(network)

    const { owner } = await contract.identity(address)

    const publicKeyJwk = toPublicKey(owner.toString()).export({ format: 'jwk' })

    const didDocument: DIDDocument = {
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
    }

    return {
      didDocumentMetadata: {},
      didResolutionMetadata: { contentType: 'application/did+ld+json' },
      didDocument
    }
  }

  build(): Record<string, DIDResolver> {
    return {
      stllr: this.resolve.bind(this)
    }
  }
}
export { getResolver }
