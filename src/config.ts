// import { Keypair } from 'soroban-client'

// export const keyPair = Keypair.fromSecret('SAJWWMPTAOIIVFLAQLID3LUZBXPRSQR4PFFFZUJWE7MZPEMD57UY4LL5')
// export const defaultAddress = 'GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV'
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
