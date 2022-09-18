import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BaseURISet as BaseURISetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RoyaltySet as RoyaltySetEvent,
  SignerSet as SignerSetEvent,
  SuffixURISet as SuffixURISetEvent,
  Transfer as TransferEvent
} from "../generated/DigiDaigaku/DigiDaigaku"
import {
  Approval,
  ApprovalForAll,
  BaseURISet,
  OwnershipTransferred,
  RoyaltySet,
  SignerSet,
  SuffixURISet,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleBaseURISet(event: BaseURISetEvent): void {
  let entity = new BaseURISet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._baseTokenURI = event.params._baseTokenURI
  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleRoyaltySet(event: RoyaltySetEvent): void {
  let entity = new RoyaltySet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._receiver = event.params._receiver
  entity._feeNumerator = event.params._feeNumerator
  entity.save()
}

export function handleSignerSet(event: SignerSetEvent): void {
  let entity = new SignerSet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._signer = event.params._signer
  entity.save()
}

export function handleSuffixURISet(event: SuffixURISetEvent): void {
  let entity = new SuffixURISet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._suffixURI = event.params._suffixURI
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}
