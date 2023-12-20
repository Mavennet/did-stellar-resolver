import { Account, Address, Contract, SorobanRpc, type xdr } from 'stellar-sdk'
import { INetwork, defaultAddress, getNetwork } from './config'
import { getContractValue, sendTransaction } from './interactWithNetwork'
import { scValToIdentity } from './convert'
import type { Identity } from './types'

export class StellarContract {
  private server: SorobanRpc.Server
  private contract: Contract
  private account: Account

  public static create = async (network: INetwork, account?: string) => {
    const stellarContract = new StellarContract()
    stellarContract.server = new SorobanRpc.Server(network.url, {
      timeout: 30,
      allowHttp: network.id === 3
    })
    stellarContract.contract = new Contract(network.contractId)

    if (account) {
      stellarContract.account = await stellarContract.server.getAccount(account)
    } else {
      stellarContract.account = new Account(defaultAddress, '0')
    }

    return stellarContract
  }

  /**
   *
   * @param {string} did - the did to resolve
   * @returns {Identity} the identity of the did on the network
   */

  public identity = async (did: string): Promise<Identity> => {
    const params: xdr.ScVal[] = [Address.fromString(did).toScVal()]

    const operation = this.contract.call('identity', ...params)

    const value = await getContractValue(this.server, this.account, operation)

    return scValToIdentity(value)
  }

  /**
   *
   * @param {string} did - the did to transfer ownership of
   * @param {string} currentOwner - the current owner of the did
   * @param {string} newOwner - the new owner of the did
   * @returns {SorobanRpc.SendTransactionResponse} the response from the network
   */

  public changeOwner = async (
    did: string,
    currentOwner: string,
    newOwner: string
  ): Promise<SorobanRpc.Api.SendTransactionResponse> => {
    const operation = this.contract.call(
      'transfer',
      Address.fromString(did).toScVal(),
      Address.fromString(currentOwner).toScVal(),
      Address.fromString(newOwner).toScVal()
    )

    const response = await sendTransaction(this.server, this.account, operation)
    return response
  }
}
