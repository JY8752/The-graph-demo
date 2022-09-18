import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  BaseURISet,
  OwnershipTransferred,
  RoyaltySet,
  SignerSet,
  SuffixURISet,
  Transfer
} from "../generated/DigiDaigaku/DigiDaigaku"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBaseURISetEvent(_baseTokenURI: string): BaseURISet {
  let baseUriSetEvent = changetype<BaseURISet>(newMockEvent())

  baseUriSetEvent.parameters = new Array()

  baseUriSetEvent.parameters.push(
    new ethereum.EventParam(
      "_baseTokenURI",
      ethereum.Value.fromString(_baseTokenURI)
    )
  )

  return baseUriSetEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRoyaltySetEvent(
  _receiver: Address,
  _feeNumerator: BigInt
): RoyaltySet {
  let royaltySetEvent = changetype<RoyaltySet>(newMockEvent())

  royaltySetEvent.parameters = new Array()

  royaltySetEvent.parameters.push(
    new ethereum.EventParam("_receiver", ethereum.Value.fromAddress(_receiver))
  )
  royaltySetEvent.parameters.push(
    new ethereum.EventParam(
      "_feeNumerator",
      ethereum.Value.fromUnsignedBigInt(_feeNumerator)
    )
  )

  return royaltySetEvent
}

export function createSignerSetEvent(_signer: Address): SignerSet {
  let signerSetEvent = changetype<SignerSet>(newMockEvent())

  signerSetEvent.parameters = new Array()

  signerSetEvent.parameters.push(
    new ethereum.EventParam("_signer", ethereum.Value.fromAddress(_signer))
  )

  return signerSetEvent
}

export function createSuffixURISetEvent(_suffixURI: string): SuffixURISet {
  let suffixUriSetEvent = changetype<SuffixURISet>(newMockEvent())

  suffixUriSetEvent.parameters = new Array()

  suffixUriSetEvent.parameters.push(
    new ethereum.EventParam("_suffixURI", ethereum.Value.fromString(_suffixURI))
  )

  return suffixUriSetEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
