"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StellarContract = void 0;
const soroban_client_1 = require("soroban-client");
const config_1 = require("./config");
const interactWithNetwork_1 = require("./interactWithNetwork");
const convert_1 = require("./convert");
class StellarContract {
    server;
    contract;
    account;
    constructor(network) {
        this.server = new soroban_client_1.Server(config_1.networks[network].url, {
            timeout: 30,
            allowHttp: network === 'standalone'
        });
        this.contract = new soroban_client_1.Contract(config_1.CONTRACT_ID);
    }
    async getAccount() {
        this.account = await this.server.getAccount(config_1.ACCOUNT_ID);
    }
    async identity(did) {
        const params = [soroban_client_1.Address.fromString(did).toScVal()];
        const operation = this.contract.call('identity', ...params);
        const value = await (0, interactWithNetwork_1.getContractValue)(this.server, this.account, operation);
        return (0, convert_1.scValToIdentity)(value);
    }
}
exports.StellarContract = StellarContract;
//# sourceMappingURL=StellarContract.js.map