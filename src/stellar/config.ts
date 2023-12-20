import { Networks } from 'stellar-sdk'
export const defaultAddress = 'GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV'

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
    passPhrase: Networks.PUBLIC,
    contractId: 'CCAPJPN6WNLJ7ZPPZLZZLLLQUVB2MDLRHXAXPVHQOF5DYWFISBCFSKZD'
  },
  {
    id: 1,
    url: 'https://horizon-testnet.stellar.org',
    passPhrase: Networks.TESTNET,
    contractId: 'CADVHUKFQ5HF5SANSUARZO5QBGZSCYFFLICDCY5T2PHYLFQA32SA5QNG'
  },
  {
    id: 2,
    url: 'https://horizon-futurenet.stellar.org',
    passPhrase: Networks.FUTURENET,
    contractId: 'CDF7ETQM2PJKTJRMR4EZGMDYTRAU34WAPXQCM44ZMRELP6XYLB4NQTDP'
  },
  {
    id: 3,
    url: 'http://localhost:8000/soroban/rpc',
    passPhrase: Networks.STANDALONE,
    contractId: 'CA27WL6LYG2S73G2ESG3CNLCFEC23QNXN2GWZPEMJBPKTVYYVAY3GURK'
  }
]

export const getNetwork = (networkId: number): INetwork => {
  if (networkId !== 2 && networkId !== 3 && networkId !== 1) {
    throw new Error('network not supported')
  }
  return defaultNetworks[networkId]
}
