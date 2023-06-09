import { type Server, TimeoutInfinite, TransactionBuilder, xdr } from 'soroban-client'
import { keyPair, networks } from './config'

export const sendContractTransaction = async (client, account, operation, params): Promise<any> => {
  const transaction = new TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: networks.standalone.passPhrase
  })
    .addOperation(operation)
    .setTimeout(TimeoutInfinite)
    .build()

  const preparedTransaction = await client.prepareTransaction(transaction)

  preparedTransaction.sign(keyPair)

  const result = await client.sendTransaction(preparedTransaction)

  if (result.errorResultXdr !== null && result.errorResultXdr !== undefined) {
    console.log(handleTransactionError(result))
  }

  const txHash = result.hash
  let response = await client.getTransaction(txHash)

  while (response.status !== 'SUCCESS') {
    response = await client.getTransaction(txHash)

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  if (response.resultXdr !== null && response.resultXdr !== undefined) {
    console.log(handleGetTransactionResult(response.resultXdr))
  }

  return response
}

export const getContractValue = async (client: Server, account, operation): Promise<xdr.ScVal> => {
  const transaction = new TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: networks.standalone.passPhrase
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

const handleTransactionError = (result): any => {
  return xdr.TransactionResult.fromXDR(result.errorResultXdr, 'base64').result().switch()
}

const handleGetTransactionResult = (resultXdr): any => {
  const results = xdr.TransactionResult.fromXDR(resultXdr, 'base64').result().results()

  if (results.length > 1) {
    throw new Error('too many results, expected 1')
  }

  const value = results[0].value()

  if (value?.switch() !== xdr.OperationType.invokeHostFunction()) {
    throw new Error('unexpected operation type')
  }
  return value.invokeHostFunctionResult().success()[0].value()?.toString()
}
