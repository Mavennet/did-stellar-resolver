import { Keypair } from 'soroban-client'

export const CONTRACT_ID = 'bdc0e4daa8737564eb01f3e4201346315751079d31b4e75d6d60c22501ef778f'
export const keyPair = Keypair.fromSecret('SAJWWMPTAOIIVFLAQLID3LUZBXPRSQR4PFFFZUJWE7MZPEMD57UY4LL5')
export const ACCOUNT_ID = 'GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV'

export const networks = {
  standalone: {
    url: 'http://localhost:8000/soroban/rpc',
    passPhrase: 'Standalone Network ; February 2017'
  },
  testnet: {
    url: 'https://horizon-testnet.stellar.org',
    passPhrase: 'Test SDF Network ; September 2015'
  },
  futurenet: {
    url: 'https://rpc-futurenet.stellar.org:443',
    passPhrase: 'Test SDF Future Network ; October 2022'
  }
}
