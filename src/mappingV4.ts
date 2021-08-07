import { Address, BigInt, BigDecimal, Bytes, ethereum } from "@graphprotocol/graph-ts"

import { 
    AugustusSwapperV4,
    Bought as BoughtEvent,
    Swapped as SwappedEvent,
    FeeTaken as FeeTakenEvent,
    // TransferTokensCall,
    SwapOnUniswapCall,
    SwapOnUniswapForkCall,
    BuyOnUniswapCall,
    BuyOnUniswapForkCall
} from "../generated/AugustusSwapperV4/AugustusSwapperV4";

import { 
    Bought,
    Fee,
    Swap,
    Token,
    buyOnUniswapFork,
    buyOnUniswap,
    swapOnUniswapFork,
    swapOnUniswap
} from "../generated/schema";

import { 
    getOrCreateAccount,
    getOrCreateToken,
    GENESIS_ADDRESS
} from "./core";

import { toDecimal, ONE, ZERO } from "./helpers/numbers";
let decimals = 18 as u32

// Event Handlers
export function handleBought(event: BoughtEvent): void {
    // params 
    let srcToken = getOrCreateToken(event.params.srcToken)
    srcToken.save()
    let destToken = getOrCreateToken(event.params.destToken)
    destToken.save()
    let beneficiary = getOrCreateAccount(event.params.beneficiary)
    beneficiary.save() 
    let initiator = getOrCreateAccount(event.params.initiator)
    initiator.save() 
    let receivedAmount = toDecimal(event.params.receivedAmount, decimals) 
    let srcAmount = toDecimal(event.params.srcAmount, decimals) 
    let referrer = event.params.referrer
    let transactionHashHex = event.transaction.hash.toHexString()

    let bought = Bought.load(transactionHashHex)
    if(bought == null){
        bought = new Bought(transactionHashHex)
        bought.initiator = initiator.id
        bought.beneficiary = beneficiary.id
        bought.srcToken = srcToken.id
        bought.destToken = destToken.id
        bought.srcAmount = srcAmount
        bought.receivedAmount = receivedAmount
        bought.referrer = referrer
        bought.timestamp = event.block.timestamp
        bought.transaction = event.transaction.hash
        bought.save()
    }

}

export function handleSwapped(event: SwappedEvent): void {
    // Params
    let srcToken = getOrCreateToken(event.params.srcToken)
    srcToken.save()
    let destToken = getOrCreateToken(event.params.destToken)
    destToken.save()
    let beneficiary = getOrCreateAccount(event.params.beneficiary)
    beneficiary.save() 
    let initiator = getOrCreateAccount(event.params.initiator)
    initiator.save()
    let expectedAmount = toDecimal(event.params.expectedAmount, decimals) 
    let receivedAmount = toDecimal(event.params.receivedAmount, decimals) 
    let srcAmount = toDecimal(event.params.srcAmount, decimals) 
    let referrer = event.params.referrer
    let transactionHashHex = event.transaction.hash.toHexString()

    let swapped = Swap.load(transactionHashHex)
    if(swapped == null){
        swapped = new Swap(transactionHashHex)
        swapped.initiator = initiator.id
        swapped.beneficiary = beneficiary.id
        swapped.srcToken = srcToken.id
        swapped.destToken = destToken.id
        swapped.srcAmount = srcAmount
        swapped.receivedAmount = receivedAmount
        swapped.expectedAmount = expectedAmount
        swapped.referrer = referrer
        swapped.timestamp = event.block.timestamp
        swapped.transaction = event.transaction.hash
        swapped.save()
    }

   
}

export function handleFeeTaken(event: FeeTakenEvent): void {
    let contract = AugustusSwapperV4.bind(event.address)
    let tryGetFeeWallet = contract.try_getFeeWallet()
    let tryGetPartnerRegistry = contract.try_getPartnerRegistry()
    
    let transactionHash = event.transaction.hash
    let transactionHashHex = event.transaction.hash.toHexString()
    let feeTaken = Fee.load(transactionHashHex)
    if(feeTaken == null){
        feeTaken = new Fee(transactionHashHex)
        feeTaken.transaction = transactionHash
        if(!tryGetFeeWallet.reverted){
            feeTaken.feeWallet = getOrCreateAccount(tryGetFeeWallet.value).id
            let fee = toDecimal(event.params.fee, decimals) 
            feeTaken.fee = fee
            let feePartnerShare = toDecimal(event.params.partnerShare, decimals)
            feeTaken.partnerShare = feePartnerShare
            let feeParaswapShare = toDecimal(event.params.paraswapShare, decimals)
            feeTaken.paraswapShare = feeParaswapShare
        }
        if(!tryGetPartnerRegistry.reverted){
            feeTaken.patner = getOrCreateAccount(tryGetPartnerRegistry.value).id
        }
        feeTaken.timestamp = event.block.timestamp
        feeTaken.save()
    }
}


// Call Handlers

export function handleSwapOnUniswap(call: SwapOnUniswapCall): void {
    let id = call.transaction.hash.toHexString()
    let initiator = getOrCreateAccount(call.transaction.from)
    initiator.save()
    let amountIn = toDecimal(call.inputs.amountIn, decimals)
    let amountOutMin = toDecimal(call.inputs.amountOutMin, decimals)
    let path = call.inputs.path
    let referrer = call.inputs.referrer
    let timestamp = call.block.timestamp
    let transaction = call.transaction.hash
    let block = call.block.number

    let swapOnUni = swapOnUniswap.load(id)
    if(swapOnUni == null) {
        swapOnUni = new swapOnUniswap(id)
        swapOnUni.initiator = initiator.id
        swapOnUni.amountIn = amountIn
        swapOnUni.amountOutMin = amountOutMin
        swapOnUni.path = path.map<string>(t => getOrCreateToken(t).id)
        swapOnUni.referrer = referrer
        swapOnUni.timestamp = timestamp
        swapOnUni.transaction = transaction
        swapOnUni.block = block
        swapOnUni.save()
    }
}

export function handleSwapOnUniswapFork(call: SwapOnUniswapForkCall): void {
    let id = call.transaction.hash.toHexString()
    let initiator = getOrCreateAccount(call.transaction.from)
    initiator.save()
    let amountIn = toDecimal(call.inputs.amountIn, decimals)
    let amountOutMin = toDecimal(call.inputs.amountOutMin, decimals)
    let factory = call.inputs.factory
    let initCode = call.inputs.initCode
    let path = call.inputs.path
    let referrer = call.inputs.referrer
    let timestamp = call.block.timestamp
    let transaction = call.transaction.hash
    let block = call.block.number

    let swapOnUniFork = swapOnUniswapFork.load(id)
    if(swapOnUniFork == null) {
        swapOnUniFork = new swapOnUniswapFork(id)
        swapOnUniFork.initiator = initiator.id
        swapOnUniFork.amountIn = amountIn
        swapOnUniFork.amountOutMin = amountOutMin
        swapOnUniFork.factory = factory
        swapOnUniFork.initCode = initCode
        swapOnUniFork.path = path.map<string>(t => getOrCreateToken(t).id)
        swapOnUniFork.referrer = referrer
        swapOnUniFork.timestamp = timestamp
        swapOnUniFork.transaction = transaction
        swapOnUniFork.block = block

        swapOnUniFork.save()
    }
}

export function handleBuyOnUniswap(call: BuyOnUniswapCall): void {
    let id = call.transaction.hash.toHexString()
    let initiator = getOrCreateAccount(call.transaction.from)
    initiator.save()
    let amountInMax = toDecimal(call.inputs.amountInMax, decimals)
    let amountOut = toDecimal(call.inputs.amountOut, decimals)
    let path = call.inputs.path
    let referrer = call.inputs.referrer
    let timestamp = call.block.timestamp
    let transaction = call.transaction.hash
    let block = call.block.number

    let buyOnUni = buyOnUniswap.load(id)
    if(buyOnUni == null) {
        buyOnUni = new buyOnUniswap(id)
        buyOnUni.initiator = initiator.id
        buyOnUni.amountInMax = amountInMax
        buyOnUni.amountOut = amountOut
        buyOnUni.path = path.map<string>(t => getOrCreateToken(t).id)
        buyOnUni.referrer = referrer
        buyOnUni.timestamp = timestamp
        buyOnUni.transaction = transaction
        buyOnUni.block = block
    
        buyOnUni.save()
    }
}

export function handleBuyOnUniswapFork(call: BuyOnUniswapForkCall): void {
    let id = call.transaction.hash.toHexString()
    let initiator = getOrCreateAccount(call.transaction.from)
    initiator.save()
    let amountInMax = toDecimal(call.inputs.amountInMax, decimals)
    let amountOut = toDecimal(call.inputs.amountOut, decimals)
    let factory = call.inputs.factory
    let initCode = call.inputs.initCode
    let path = call.inputs.path
    let referrer = call.inputs.referrer
    let timestamp = call.block.timestamp
    let transaction = call.transaction.hash
    let block = call.block.number

    let buyOnUniFork = buyOnUniswapFork.load(id)
    if(buyOnUniFork == null) {
        buyOnUniFork = new buyOnUniswapFork(id)
        buyOnUniFork.initiator = initiator.id
        buyOnUniFork.amountInMax = amountInMax
        buyOnUniFork.amountOut = amountOut
        buyOnUniFork.factory = factory
        buyOnUniFork.initCode = initCode
        buyOnUniFork.path = path.map<string>(t => getOrCreateToken(t).id)
        buyOnUniFork.referrer = referrer
        buyOnUniFork.timestamp = timestamp
        buyOnUniFork.transaction = transaction
        buyOnUniFork.block = block

        buyOnUniFork.save()
    }
}



