import { type Account, Address, Contract, Server, type xdr } from 'soroban-client'
import { ACCOUNT_ID, CONTRACT_ID, networks } from './config'
import { getContractValue } from './interactWithNetwork'
import { scValToIdentity } from './convert'
import type { Identity } from './types'

export class StellarContract {
  private readonly server: Server
  private readonly contract: Contract
  private account: Account
  constructor(network: string) {
    // initialize soroban client
    this.server = new Server(networks[network].url, {
      timeout: 30,
      allowHttp: network === 'standalone'
    })
    this.contract = new Contract(CONTRACT_ID)
  }

  async getAccount(): Promise<void> {
    this.account = await this.server.getAccount(ACCOUNT_ID)
  }

  public async identity(did: string): Promise<Identity> {
    const params: xdr.ScVal[] = [Address.fromString(did).toScVal()]

    const operation = this.contract.call('identity', ...params)

    const value = await getContractValue(this.server, this.account, operation)

    return scValToIdentity(value)
  }
}
