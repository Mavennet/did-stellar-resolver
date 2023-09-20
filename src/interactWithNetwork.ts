import {
  type Server,
  TimeoutInfinite,
  TransactionBuilder,
  xdr,
  Keypair,
  Account,
  SorobanRpc,
  BASE_FEE
} from 'soroban-client'

export const getContractValue = async (client: Server, account: Account, operation): Promise<xdr.ScVal> => {
  const transaction = new TransactionBuilder(account, {
    fee: '100', // this can be a static number as we are always simulating a transaction and never actually sending it.
    networkPassphrase: (await client.getNetwork()).passphrase
  })
    .addOperation(operation)
    .setTimeout(TimeoutInfinite)
    .build()

  const { result, error } = (await client.simulateTransaction(transaction)) as any

  if (error || !result) {
    console.error({ error })
    throw new Error(`Could not get results from chain ${error}`)
  }
  return result.retval
}

export const sendTransaction = async (
  client: Server,
  account: Account,
  operation
): Promise<SorobanRpc.SendTransactionResponse> => {
  console.log({ account })
  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE, // this can be a static number as we are always simulating a transaction and never actually sending it.
    networkPassphrase: (await client.getNetwork()).passphrase
  })
    .addOperation(operation)
    .setTimeout(TimeoutInfinite)
    .build()

  const preparedTransaction = await client.prepareTransaction(transaction)
  console.log({ preparedTransaction })

  // TODO: sign with the correct key
  preparedTransaction.sign(Keypair.fromSecret(''))

  const response = await client.sendTransaction(preparedTransaction)
  if (response.status === 'ERROR') {
    throw new Error(response.errorResultXdr?.toString())
  }
  return response
}
