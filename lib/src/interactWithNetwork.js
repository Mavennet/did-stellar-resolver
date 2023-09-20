"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractValue = exports.sendContractTransaction = void 0;
const soroban_client_1 = require("soroban-client");
const config_1 = require("./config");
const sendContractTransaction = async (client, account, operation, params) => {
    const transaction = new soroban_client_1.TransactionBuilder(account, {
        fee: '100',
        networkPassphrase: config_1.networks.standalone.passPhrase
    })
        .addOperation(operation)
        .setTimeout(soroban_client_1.TimeoutInfinite)
        .build();
    const preparedTransaction = await client.prepareTransaction(transaction);
    preparedTransaction.sign(config_1.keyPair);
    const result = await client.sendTransaction(preparedTransaction);
    if (result.errorResultXdr !== null && result.errorResultXdr !== undefined) {
        console.log(handleTransactionError(result));
    }
    const txHash = result.hash;
    let response = await client.getTransaction(txHash);
    while (response.status !== 'SUCCESS') {
        response = await client.getTransaction(txHash);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (response.resultXdr !== null && response.resultXdr !== undefined) {
        console.log(handleGetTransactionResult(response.resultXdr));
    }
    return response;
};
exports.sendContractTransaction = sendContractTransaction;
const getContractValue = async (client, account, operation) => {
    const transaction = new soroban_client_1.TransactionBuilder(account, {
        fee: '100',
        networkPassphrase: config_1.networks.standalone.passPhrase
    })
        .addOperation(operation)
        .setTimeout(soroban_client_1.TimeoutInfinite)
        .build();
    const { results } = await client.simulateTransaction(transaction);
    if (results.length !== 1) {
        throw new Error('unexpected results length');
    }
    return soroban_client_1.xdr.ScVal.fromXDR(results[0].xdr, 'base64');
};
exports.getContractValue = getContractValue;
const handleTransactionError = (result) => {
    return soroban_client_1.xdr.TransactionResult.fromXDR(result.errorResultXdr, 'base64').result().switch();
};
const handleGetTransactionResult = (resultXdr) => {
    const results = soroban_client_1.xdr.TransactionResult.fromXDR(resultXdr, 'base64').result().results();
    if (results.length > 1) {
        throw new Error('too many results, expected 1');
    }
    const value = results[0].value();
    if (value?.switch() !== soroban_client_1.xdr.OperationType.invokeHostFunction()) {
        throw new Error('unexpected operation type');
    }
    return value.invokeHostFunctionResult().success()[0].value()?.toString();
};
//# sourceMappingURL=interactWithNetwork.js.map