import { SorobanRpc, TimeoutInfinite, TransactionBuilder, xdr, Keypair, Account, BASE_FEE } from 'stellar-sdk'

export const getContractValue = async (server: SorobanRpc.Server, account: Account, operation): Promise<xdr.ScVal> => {
  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: (await server.getNetwork()).passphrase
  })
    .addOperation(operation)
    .setTimeout(TimeoutInfinite)
    .build()

  console.log({ transaction })

  const { result, error } = (await server.simulateTransaction(transaction)) as any
  console.log({ result, error })

  if (error || !result) {
    throw new Error(`Could not get results from chain ${error}`)
  }
  return result.retval
}

export const sendTransaction = async (
  server: SorobanRpc.Server,
  account: Account,
  operation
): Promise<SorobanRpc.Api.SendTransactionResponse> => {
  console.log({ account })
  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: (await server.getNetwork()).passphrase
  })
    .addOperation(operation)
    .setTimeout(TimeoutInfinite)
    .build()

  const preparedTransaction = await server.prepareTransaction(transaction)

  preparedTransaction.sign(Keypair.fromSecret(''))

  const response = await server.sendTransaction(preparedTransaction)
  if (response.status === 'ERROR' && response.errorResult) {
    throw new Error(response.errorResult.toString())
  }
  return response
}
