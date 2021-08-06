import { BigDecimal, Bytes, Address, ethereum } from '@graphprotocol/graph-ts'
import { ERC20 } from '../generated/AugustusSwapperV4/ERC20'

import { Account, Token } from '../generated/schema'

import { toDecimal, ONE, ZERO } from './helpers/numbers'
export const GENESIS_ADDRESS = '0x0000000000000000000000000000000000000000'

export function getOrCreateToken(address: Address): Token {
    let addressHex = address.toHexString()
    let token = Token.load(addressHex)
    if (token != null) {
        return token as Token
    }
  
    token = new Token(addressHex)
    token.address = address
    let tokenInstance = ERC20.bind(address)
    let tryName = tokenInstance.try_name()
    if (!tryName.reverted) {
        token.name = tryName.value
    }
    let trySymbol = tokenInstance.try_symbol()
    if (!trySymbol.reverted) {
        token.symbol = trySymbol.value
    }
    let tryDecimals = tokenInstance.try_decimals()
    token.decimals = tryDecimals.reverted ? 18 : tryDecimals.value
    let initialSupply = tokenInstance.try_totalSupply()
    token.totalSupply = initialSupply.reverted ? ZERO.toBigDecimal() : toDecimal(initialSupply.value, token.decimals)
    
    return token as Token
  }

  export function getOrCreateAccount(accountAddress: Bytes): Account {
    let accountId = accountAddress.toHexString()
    let existingAccount = Account.load(accountId)
  
    if (existingAccount != null) {
      return existingAccount as Account
    }
  
    let newAccount = new Account(accountId)
    newAccount.address = accountAddress
    
    return newAccount
  }
  
  