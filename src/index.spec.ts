import { getResolver } from '.'
import { Resolver } from 'did-resolver'

// describe('exports', () => {
//   it('should export getResolver', () => {
//     expect(getResolver).toBeDefined()
//   })
// })

describe('resolve', () => {
  it('should resolve a document with no network', async () => {
    const stellarResolver = getResolver()
    const resolver = new Resolver(stellarResolver)

    const { didDocument } = await resolver.resolve('did:stllr:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV')

    expect(didDocument).toEqual({
      '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
      id: 'did:stllr:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV',
      verificationMethod: [
        {
          id: 'did:stllr:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV',
          type: 'JsonWebKey2020',
          controller: 'did:stllr:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV',
          publicKeyJwk: {
            kty: 'OKP',
            crv: 'Ed25519',
            x: '0Y8CEP9swfLc8TAfu9TDDuEaB1ggaE1HHfidDxAR6ig'
          }
        }
      ]
    })
  })

  // it('should resolve a document with a network identifier', async () => {
  //   const stellarResolver = getResolver()
  //   const resolver = new Resolver(stellarResolver)

  //   const { didDocument } = await resolver.resolve(
  //     'did:stllr:2:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV'
  //   )

  //   expect(didDocument).toEqual({
  //     '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
  //     id: 'did:stllr:2:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV',
  //     verificationMethod: [
  //       {
  //         id: 'did:stllr:2:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV',
  //         type: 'JsonWebKey2020',
  //         controller: 'did:stllr:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV',
  //         publicKeyJwk: {
  //           kty: 'OKP',
  //           crv: 'Ed25519',
  //           x: '0Y8CEP9swfLc8TAfu9TDDuEaB1ggaE1HHfidDxAR6ig'
  //         }
  //       }
  //     ]
  //   })
  // })

  // it('should not resolve a document on an unsupported network', async () => {
  //   const stellarResolver = getResolver()
  //   const resolver = new Resolver(stellarResolver)

  //   await expect(
  //     resolver.resolve('did:stllr:0:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV')
  //   ).rejects.toThrow('network not supported')
  // })
})
