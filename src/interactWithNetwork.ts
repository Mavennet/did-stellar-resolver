import { type Server, TimeoutInfinite, TransactionBuilder, xdr } from 'soroban-client'

export const getContractValue = async (client: Server, account, operation): Promise<xdr.ScVal> => {
  const transaction = new TransactionBuilder(account, {
    fee: '100', // this can be a static number as we are always simulating a transaction and never actually sending it.
    networkPassphrase: (await client.getNetwork()).passphrase
  })
    .addOperation(operation)
    .setTimeout(TimeoutInfinite)
    .build()

  const { result, error } = await client.simulateTransaction(transaction)

  if (error || !result) {
    console.error({ error })
    throw new Error(`Could not get results from chain ${error}`)
  }
  return result.retval
}
