import type { DIDResolutionOptions, DIDResolutionResult, ParsedDID, Resolver } from 'did-resolver';
declare const getResolver: () => StllrDIDResolver;
declare class StllrDIDResolver {
    resolve(did: string, parsed?: ParsedDID, didResolver?: Resolver, options?: DIDResolutionOptions): Promise<DIDResolutionResult>;
}
export { getResolver };
