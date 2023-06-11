import { getResolver } from '.'
import { Resolver } from 'did-resolver'

describe('exports', () => {
  it('should export getResolver', () => {
    expect(getResolver).toBeDefined()
  })
})

describe('resolve', () => {
  it('should resolve a document with no network', async () => {
    const stellarResolver = getResolver()
    const resolver = new Resolver(stellarResolver)

    const { didDocument } = await resolver.resolve('did:stllr:GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4')

    expect(didDocument).toEqual({
      '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
      id: 'did:stllr:GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4',
      verificationMethod: [
        {
          id: 'did:stllr:GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4',
          type: 'JsonWebKey2020',
          controller: 'did:stllr:GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4',
          publicKeyJwk: {
            kty: 'OKP',
            crv: 'Ed25519',
            x: 'GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4'
          }
        }
      ]
    })
  })

  it('should resolve a document with a network identifier', async () => {
    const stellarResolver = getResolver()
    const resolver = new Resolver(stellarResolver)

    const { didDocument } = await resolver.resolve(
      'did:stllr:2:GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4'
    )

    expect(didDocument).toEqual({
      '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
      id: 'did:stllr:2:GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4',
      verificationMethod: [
        {
          id: 'did:stllr:2:GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4',
          type: 'JsonWebKey2020',
          controller: 'did:stllr:GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4',
          publicKeyJwk: {
            kty: 'OKP',
            crv: 'Ed25519',
            x: 'GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4'
          }
        }
      ]
    })
  })

  it('should not resolve a document on an unsupported network', async () => {
    const stellarResolver = getResolver()
    const resolver = new Resolver(stellarResolver)

    await expect(
      resolver.resolve('did:stllr:1:GDIY6AQQ75WMD4W46EYB7O6UYMHOCGQHLAQGQTKHDX4J2DYQCHVCR4W4')
    ).rejects.toThrow('network not supported')
  })
})
