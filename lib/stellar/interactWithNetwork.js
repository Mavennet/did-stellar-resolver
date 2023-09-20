"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransaction = exports.getContractValue = void 0;
const soroban_client_1 = require("soroban-client");
const getContractValue = async (client, account, operation) => {
    const transaction = new soroban_client_1.TransactionBuilder(account, {
        fee: '100',
        networkPassphrase: (await client.getNetwork()).passphrase
    })
        .addOperation(operation)
        .setTimeout(soroban_client_1.TimeoutInfinite)
        .build();
    const { result, error } = (await client.simulateTransaction(transaction));
    if (error || !result) {
        console.error({ error });
        throw new Error(`Could not get results from chain ${error}`);
    }
    return result.retval;
};
exports.getContractValue = getContractValue;
const sendTransaction = async (client, account, operation) => {
    console.log({ account });
    const transaction = new soroban_client_1.TransactionBuilder(account, {
        fee: soroban_client_1.BASE_FEE,
        networkPassphrase: (await client.getNetwork()).passphrase
    })
        .addOperation(operation)
        .setTimeout(soroban_client_1.TimeoutInfinite)
        .build();
    const preparedTransaction = await client.prepareTransaction(transaction);
    console.log({ preparedTransaction });
    preparedTransaction.sign(soroban_client_1.Keypair.fromSecret(''));
    const response = await client.sendTransaction(preparedTransaction);
    if (response.status === 'ERROR') {
        throw new Error(response.errorResultXdr?.toString());
    }
    return response;
};
exports.sendTransaction = sendTransaction;
//# sourceMappingURL=interactWithNetwork.js.map