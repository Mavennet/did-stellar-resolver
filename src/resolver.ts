import type { DIDDocument, DIDResolutionOptions, DIDResolutionResult, ParsedDID, Resolver } from 'did-resolver'
import { StellarContract } from './StellarContract'
import { StrKey } from 'soroban-client'

const getResolver = (): StllrDIDResolver => {
  return new StllrDIDResolver()
}

class StllrDIDResolver {
  async resolve(
    did: string,
    parsed?: ParsedDID,
    didResolver?: Resolver,
    options?: DIDResolutionOptions
  ): Promise<DIDResolutionResult> {
    if (did.split(':')[1] !== 'stllr') {
      throw new Error('Unsupported DID method')
    }

    if (did.split(':')[2] === undefined) {
      throw new Error('Invalid DID')
    }

    const account = did.split(':')[2]

    const contract = new StellarContract('standalone')

    await contract.getAccount()

    const { owner } = await contract.identity(account)

    StrKey.decodeEd25519PublicKey(owner.toString())

    // TODO:   translate owner address to its JWK form

    const didDocument: DIDDocument = {
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
            x: '9GXjPGGvmRq9F6Ng5dQQ_s31mfhxrcNZxRGONrmH30k' // example while trying to get owner's JWK
          }
        }
      ]
    }

    return {
      didResolutionMetadata: { contentType: 'application/did+ld+json' },
      didDocument,
      didDocumentMetadata: {}
    }
  }
}
export { getResolver }
