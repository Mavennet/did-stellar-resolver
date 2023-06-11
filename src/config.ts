export const defaultAddress = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'

const networks = [
  {
    id: 0,
    url: 'https://horizon.stellar.org',
    passPhrase: 'Public Global Stellar Network ; September 2015',
    contractId: 'bfe3a307860e15409c7209b5acf81205fec3d571967fa163f820c5d2326575e5'
  },
  {
    id: 1,
    url: 'https://horizon-testnet.stellar.org',
    passPhrase: 'Test SDF Network ; September 2015',
    contractId: 'bfe3a307860e15409c7209b5acf81205fec3d571967fa163f820c5d2326575e5'
  },
  {
    id: 2,
    url: 'https://rpc-futurenet.stellar.org',
    passPhrase: 'Test SDF Future Network ; October 2022',
    contractId: 'bfe3a307860e15409c7209b5acf81205fec3d571967fa163f820c5d2326575e5'
  },
  {
    id: 3,
    url: 'http://localhost:8000/soroban/rpc',
    passPhrase: 'Standalone Network ; February 2017',
    contractId: '4681247678bb9dc0739e5d97c2aa91c2a4f9efc0e59751cc02547bdbafb2c9c3'
  }
]

export const getNetwork = (networkId: number): any => {
  if (networkId !== 2 && networkId !== 3) {
    throw new Error('network not supported')
  }
  return networks[networkId]
}
