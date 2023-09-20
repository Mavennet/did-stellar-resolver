"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetwork = exports.defaultAddress = void 0;
exports.defaultAddress = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF';
const defaultNetworks = [
    {
        id: 0,
        url: 'https://horizon.stellar.org',
        passPhrase: 'Public Global Stellar Network ; September 2015',
        contractId: 'CCAPJPN6WNLJ7ZPPZLZZLLLQUVB2MDLRHXAXPVHQOF5DYWFISBCFSKZD'
    },
    {
        id: 1,
        url: 'https://horizon-testnet.stellar.org',
        passPhrase: 'Test SDF Network ; September 2015',
        contractId: 'CCAPJPN6WNLJ7ZPPZLZZLLLQUVB2MDLRHXAXPVHQOF5DYWFISBCFSKZD'
    },
    {
        id: 2,
        url: 'https://rpc-futurenet.stellar.org',
        passPhrase: 'Test SDF Future Network ; October 2022',
        contractId: 'CDF7ETQM2PJKTJRMR4EZGMDYTRAU34WAPXQCM44ZMRELP6XYLB4NQTDP'
    },
    {
        id: 3,
        url: 'http://localhost:8000/soroban/rpc',
        passPhrase: 'Standalone Network ; February 2017',
        contractId: 'CA27WL6LYG2S73G2ESG3CNLCFEC23QNXN2GWZPEMJBPKTVYYVAY3GURK'
    }
];
const getNetwork = (networkId) => {
    if (networkId !== 2 && networkId !== 3) {
        throw new Error('network not supported');
    }
    return defaultNetworks[networkId];
};
exports.getNetwork = getNetwork;
//# sourceMappingURL=config.js.map