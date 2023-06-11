import { type Server, TimeoutInfinite, TransactionBuilder, xdr } from 'soroban-client'

export const getContractValue = async (client: Server, account, operation): Promise<xdr.ScVal> => {
  const transaction = new TransactionBuilder(account, {
    fee: '100', // this can be a static number as we are always simulating a transaction and never actually sending it.
    networkPassphrase: (await client.getNetwork()).passphrase
  })
    .addOperation(operation)
    .setTimeout(TimeoutInfinite)
    .build()

  const { results } = await client.simulateTransaction(transaction)

  if (results.length !== 1) {
    throw new Error('unexpected results length')
  }

  return xdr.ScVal.fromXDR(results[0].xdr, 'base64')
}
