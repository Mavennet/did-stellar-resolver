import { type Address } from 'stellar-sdk';
export interface Identity {
    owner: Address;
    delegates: Map<Address, Delegation>;
    attributes: Map<string, Attribute>;
}
export interface Delegation {
    delegate_type: string;
    valid_to: number;
}
export interface Attribute {
    value: string;
    valid_to: number;
}
