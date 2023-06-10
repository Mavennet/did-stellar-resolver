import { Account, Address, Contract, Server, type xdr } from 'soroban-client'
import { defaultAddress, getNetwork } from './config'
import { getContractValue } from './interactWithNetwork'
import { scValToIdentity } from './convert'
import type { Identity } from './types'

export class StellarContract {
  private readonly server: Server
  private readonly contract: Contract
  private readonly account: Account
  constructor(networkId: number) {
    const network = getNetwork(networkId)
    this.server = new Server(network.url, {
      timeout: 30,
      allowHttp: networkId === 3
    })
    this.contract = new Contract(network.contractId)
    this.account = new Account(defaultAddress, '0')
  }

  public async identity(did: string): Promise<Identity> {
    const params: xdr.ScVal[] = [Address.fromString(did).toScVal()]

    const operation = this.contract.call('identity', ...params)

    const value = await getContractValue(this.server, this.account, operation)

    return scValToIdentity(value)
  }
}
