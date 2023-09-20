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
    static create = async (network, account) => {
        const stellarContract = new StellarContract();
        stellarContract.server = new soroban_client_1.Server(network.url, {
            timeout: 30,
            allowHttp: network.id === 3
        });
        stellarContract.contract = new soroban_client_1.Contract(network.contractId);
        if (account) {
            stellarContract.account = await stellarContract.server.getAccount(account);
        }
        else {
            stellarContract.account = new soroban_client_1.Account(config_1.defaultAddress, '0');
        }
        return stellarContract;
    };
    identity = async (did) => {
        const params = [soroban_client_1.Address.fromString(did).toScVal()];
        const operation = this.contract.call('identity', ...params);
        console.log({ params });
        const value = await (0, interactWithNetwork_1.getContractValue)(this.server, this.account, operation);
        console.log({ value });
        return (0, convert_1.scValToIdentity)(value);
    };
    changeOwner = async (did, currentOwner, newOwner) => {
        const operation = this.contract.call('transfer', soroban_client_1.Address.fromString(did).toScVal(), soroban_client_1.Address.fromString(currentOwner).toScVal(), soroban_client_1.Address.fromString(newOwner).toScVal());
        const response = await (0, interactWithNetwork_1.sendTransaction)(this.server, this.account, operation);
        return response;
    };
}
exports.StellarContract = StellarContract;
//# sourceMappingURL=StellarContract.js.map