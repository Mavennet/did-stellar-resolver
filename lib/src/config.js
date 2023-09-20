"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networks = exports.ACCOUNT_ID = exports.keyPair = exports.CONTRACT_ID = void 0;
const soroban_client_1 = require("soroban-client");
exports.CONTRACT_ID = 'bdc0e4daa8737564eb01f3e4201346315751079d31b4e75d6d60c22501ef778f';
exports.keyPair = soroban_client_1.Keypair.fromSecret('SAJWWMPTAOIIVFLAQLID3LUZBXPRSQR4PFFFZUJWE7MZPEMD57UY4LL5');
exports.ACCOUNT_ID = 'GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV';
exports.networks = {
    standalone: {
        url: 'http://localhost:8000/soroban/rpc',
        passPhrase: 'Standalone Network ; February 2017'
    },
    testnet: {
        url: 'https://horizon-testnet.stellar.org',
        passPhrase: 'Test SDF Network ; September 2015'
    },
    futurenet: {
        url: 'https://rpc-futurenet.stellar.org:443',
        passPhrase: 'Test SDF Future Network ; October 2022'
    }
};
//# sourceMappingURL=config.js.map