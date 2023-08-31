import { Account, Address, Contract, Server, type xdr } from 'soroban-client'
import { INetwork, defaultAddress, getNetwork } from './config'
import { getContractValue } from './interactWithNetwork'
import { scValToIdentity } from './convert'
import type { Identity } from './types'

export class StellarContract {
  private readonly server: Server
  private readonly contract: Contract
  private readonly account: Account
  constructor(network: INetwork) {
    this.server = new Server(network.url, {
      timeout: 30,
      allowHttp: network.id === 3
    })
    this.contract = new Contract(network.contractId)
    this.account = new Account(defaultAddress, '0')
  }

  public async identity(did: string): Promise<Identity> {
    const params: xdr.ScVal[] = [Address.fromString(did).toScVal()]

    const operation = this.contract.call('identity', ...params)

    console.log(params)
    const value = await getContractValue(this.server, this.account, operation)

    console.log(value)
    return scValToIdentity(value)
  }

  changeOwner = () => {}
  setAttribute = () => {}
}
