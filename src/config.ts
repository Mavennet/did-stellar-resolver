export const defaultAddress = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'

export interface INetwork {
  id: number
  url: string
  passPhrase: string
  contractId: string
}

const defaultNetworks: INetwork[] = [
  {
    id: 0,
    url: 'https://horizon.stellar.org',
    passPhrase: 'Public Global Stellar Network ; September 2015',
    contractId: 'CCAPJPN6WNLJ7ZPPZLZZLLLQUVB2MDLRHXAXPVHQOF5DYWFISBCFSKZD'
  },
  {
    id: 1,
    url: 'https://horizon-testnet.stellar.org',
    passPhrase: 'Test SDF Network ; September 2015',
    contractId: 'CCAPJPN6WNLJ7ZPPZLZZLLLQUVB2MDLRHXAXPVHQOF5DYWFISBCFSKZD'
  },
  {
    id: 2,
    url: 'https://rpc-futurenet.stellar.org',
    passPhrase: 'Test SDF Future Network ; October 2022',
    contractId: 'CA2F3IPU2INVPNFUWLYLKKLXX65LX6FHU4J3U2NKENR2NW4RSIBUM4C2'
  },
  {
    id: 3,
    url: 'http://localhost:8000/soroban/rpc',
    passPhrase: 'Standalone Network ; February 2017',
    contractId: 'CA27WL6LYG2S73G2ESG3CNLCFEC23QNXN2GWZPEMJBPKTVYYVAY3GURK'
  }
]

export const getNetwork = (networkId: number): INetwork => {
  if (networkId !== 2 && networkId !== 3) {
    throw new Error('network not supported')
  }
  return defaultNetworks[networkId]
}
