export declare const defaultAddress = "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF";
export interface INetwork {
    id: number;
    url: string;
    passPhrase: string;
    contractId: string;
}
export declare const getNetwork: (networkId: number) => INetwork;
