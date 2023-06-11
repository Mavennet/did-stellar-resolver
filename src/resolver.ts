import type {
  DIDDocument,
  DIDResolutionOptions,
  DIDResolutionResult,
  DIDResolver,
  ParsedDID,
  Resolvable
} from 'did-resolver'
import { StellarContract } from './StellarContract'
import { StrKey } from 'soroban-client'

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
    let account
    let network
    if (did.split(':').length === 3) {
      network = 2
      account = did.split(':')[2]
    } else {
      network = parseInt(did.split(':')[2])
      account = did.split(':')[3]
    }

    const contract = new StellarContract(network)

    const { owner } = await contract.identity(account)

    StrKey.decodeEd25519PublicKey(owner.toString())

    // TODO:   translate owner address to its JWK form

    const didDocument: DIDDocument = {
      '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
      id: did,
      verificationMethod: [
        {
          id: did,
          type: 'JsonWebKey2020',
          controller: `did:stllr:${owner.toString()}`,
          publicKeyJwk: {
            kty: 'OKP',
            crv: 'Ed25519',
            x: `${owner.toString()}` // this is not correct, it should be the x value
          }
        }
      ]
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
