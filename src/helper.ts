import { StrKey } from 'soroban-client'
import crypto from 'crypto'

// from  https://keygen.sh/blog/how-to-use-hexadecimal-ed25519-keys-in-node/

export function toDer(key: Buffer): Buffer {
  // Ed25519's OID
  const oid = Buffer.from([0x06, 0x03, 0x2b, 0x65, 0x70])

  // Create a byte sequence containing the OID and key
  const elements = Buffer.concat([
    Buffer.concat([
      Buffer.from([0x30]), // Sequence tag
      Buffer.from([oid.length]),
      oid
    ]),
    Buffer.concat([
      Buffer.from([0x03]), // Bit tag
      Buffer.from([key.length + 1]),
      Buffer.from([0x00]), // Zero bit
      key
    ])
  ])

  // Wrap up by creating a sequence of elements
  const der = Buffer.concat([
    Buffer.from([0x30]), // Sequence tag
    Buffer.from([elements.length]),
    elements
  ])

  return der
}

export function toPublicKey(key: string): crypto.KeyObject {
  const keyBuffer = StrKey.decodeEd25519PublicKey(key)

  const der = toDer(keyBuffer)

  return crypto.createPublicKey({
    format: 'der',
    type: 'spki',
    key: der
  })
}

export function splitIdentifier(did: string) {
  const didComponents = did.split(':')
  let protocol: string, didMethod: string, networkId: number, address: string

  protocol = didComponents[0]
  didMethod = didComponents[1]

  if (didComponents.length >= 4) {
    networkId = parseInt(didComponents[2])
    address = didComponents[3]
  } else {
    // default to futurenet
    networkId = 2
    address = didComponents[2]
  }

  if (protocol !== 'did') {
    throw new Error('Not a DID')
  }

  if (didMethod !== 'stllr') {
    throw new Error('Unsupported DID method')
  }

  return { networkId, address }
}
