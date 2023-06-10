import { Address, type xdr } from 'soroban-client'
import type { Attribute, Delegation, Identity } from './types'

export function scvalToString(value: xdr.ScVal): string | undefined {
  return value.bytes().toString()
}

export function scValToIdentity(value: xdr.ScVal): Identity {
  const owner = Address.fromScVal(value.value()?.[2].val())

  const delegates = new Map<Address, Delegation>()
  const attributes = new Map<string, Attribute>()

  // TBD - parse the delegates and attributes into the maps

  return {
    owner,
    delegates,
    attributes
  }
}
