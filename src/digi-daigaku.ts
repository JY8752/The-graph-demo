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
import { log, ipfs, json, JSONValue, BigInt, Bytes } from "@graphprotocol/graph-ts";

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
  
  const tokenId = event.params.tokenId
  const metadata = getMetadata(tokenId)

  entity.tokenId = tokenId

  if(metadata) {
    const value = json.fromBytes(metadata).toObject()

    const description = value.get("description")
    if(description) {
      entity.description = description.toString()
    }

    const image = value.get("image")
    if(image) {
      entity.image = image.toString()
    }

    const attributes = value.get("attributes")
    if(attributes) {
      const attributeArray = attributes.toArray()
      for(let i = 0; i < attributeArray.length; i++) {
        const attr = attributeArray[i].toObject()
        const traitType = attr.get("trait_type")
        const value = attr.get("value")
        if(traitType && value) {
          if(traitType.toString() === "Name") {
            entity.name = value.toString()
          } else if(traitType.toString() === "Background") {
            entity.background = value.toString()
          } else if(traitType.toString() === "Outfit") {
            entity.outfit = value.toString()
          } else if(traitType.toString() === "Prop") {
            entity.prop = value.toString()
          } else if(traitType.toString() === "Hairstyle") {
            entity.hairStyle = value.toString()
          } else {
            entity.expression = value.toString()
          }
        }
      }
    }
  }

  entity.save()
}

function getMetadata(tokenId: BigInt): Bytes | null {
  const url = `https://digidaigaku.com/metadata/${tokenId}.json`
  return ipfs.cat(url)
}
