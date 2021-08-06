# Paraswap Subgraph
visit: https://thegraph.com/explorer/subgraph?id=0xa64f266a5e3471dcf51b21426b7872b277a7e20a-2&view=Overview  
ParaSwap aggregates decentralized exchanges and other DeFi services in one comprehensive interface to streamline and facilitate users' interactions with Ethereum's decentralized finance.

## Entities  
### Account  
  **id:** *The hexadecimal string representation of the users account address*  
  **address:** *The users account address in bytes*  
  **buys:** *Lists all the account's buys*  
  **swaps:** *List all the account's swap*  
  **swapsOnUniswap:** *Lists all the account's swaps via uniswap proxy*  
  **swapsOnUniswapFork:** *Lists all the account's swaps via uniswap fork proxy*  
  **buysOnUniswap:** *Lists all the account's buys via uniswap proxy*  
  **buysOnUniswapFork:** *List all the account's buys via uniswap fork proxy*  
### Token  
  **id:** *The token address in hex string*  
  **address:** *The token address in bytes*  
  **decimals:** *Number of decimals the token uses in integer*  
  **name:** *Human-readable name of the token in string*  
  **symbol:** *Symbol of the token in string*  
  **totalSupply:** *Total token supply in bigdecimals*  
### Bought  
  **id:** *The hash of the transaction in hex string*  
  **initiator:** *The account info of the initiator of the transaction*  
  **beneficiary:** *The account info of the beneficiary of the transaction*  
  **srcToken:** *The info of the token spent in the purchase*  
  **destToken:** *The info of the token received at the purchase*  
  **srcAmount:** *The amount used for the purchase in bigDecimal*  
  **receivedAmount:** *The amount received at the purchase in bigDecimal*  
  **referrer:** *Referrer id in string*  
  **timestamp:** *The timestamp of the transaction in seconds(BigInt)*  
  **transaction:** *The hash of the transaction in bytes*
### Swap  
  **id:** *The hash of the transaction in hex string*  
  **initiator:** *The account info of the initiator of the transaction*    
  **beneficiary:** *The account info of the beneficiary of the transaction*  
  **srcToken:** *The info of the token spent in the swap*  
  **destToken:** *The info of the token received at the swap*  
  **srcAmount:** *The amount used for the swap in bigDecimal*  
  **receivedAmount:** *The amount received at the swap in bigDecimal*   
  **expectedAmount:** *The amount expected from swap in bigDecimal*  
  **referrer:** *Referrer id in string*  
  **timestamp:** *The timestamp of the transaction in seconds(BigInt)*  
  **transaction:** *The hash of the transaction in bytes*  
### Fee  
  **id:** *The hash of the transaction in hex string*  
  **transaction:** *The hash of the transaction in bytes*   
  **feeWallet:** *Account info of the fee wallet*  
  **partner:** *Account info of the partners wallet*  
  **fee** *Total fee deducted from transaction*  
  **partnerShare:** *Partner share of the fee*  
  **paraswapShare:** *Paraswap share of the fee*  
  **timestamp:** *The timestamp of the transaction in seconds(BigInt)*  
### swapOnUniswap  
  **id:** *The hash of the transaction in hex string*  
  **initiator:** *The account info of the initiator of the transaction*  
  **amountIn:** *The amount used for the swap in bigDecimal*   
  **amountOutMin:** *The minimum amount received at the swap in bigDecimal*  
  **path:** *List of addresses involved in the swap in bytes*  
  **referrer:** *Referrer id in string*  
  **timestamp:** *The timestamp of the transaction in seconds(BigInt)*  
  **transaction:** *The hash of the transaction in bytes*  
  **block:** *the block number where the transaction occurred*  
### swapOnUniswapFork  
  **id:** *The hash of the transaction in hex string*  
  **initiator:** *The account info of the initiator of the transaction*  
  **factory:** *Factory address of uniswap fork*  
  **initCode:**   
  **amountIn:** *The amount used for the swap in bigDecimal*   
  **amountOutMin:** *The minimum amount received at the swap in bigDecimal*  
  **path:** *List of addresses involved in the swap in bytes*  
  **referrer:** *Referrer id in string*   
  **timestamp:** *The timestamp of the transaction in seconds(BigInt)*  
  **transaction:** *The hash of the transaction in bytes*  
  **block:** *the block number where the transaction occurred*  
### buyOnUniswap 
  **id:** *The hash of the transaction in hex string*  
  **initiator:** *The account info of the initiator of the transaction*  
  **amountInMax:** *The maximum amount used for the purchase in bigDecimal*   
  **amountOut:** *The minimum amount received at the purchase in bigDecimal*  
  **path:** *List of addresses involved in the swap in bytes*  
  **referrer:** *Referrer id in string*  
  **timestamp:** *The timestamp of the transaction in seconds(BigInt)*  
  **transaction:** *The hash of the transaction in bytes*  
  **block:** *the block number where the transaction occurred*  
### buyOnUniswapFork  
  **id:** *The hash of the transaction in hex string*  
  **initiator:** *The account info of the initiator of the transaction*  
  **factory:** *Factory address of uniswap fork*  
  **initCode:**   
  **amountInMax:** *The maximum amount used for the purchase in bigDecimal*   
  **amountOut:** *The minimum amount received at the purchase in bigDecimal*  
  **path:** *List of addresses involved in the swap in bytes*  
  **referrer:** *Referrer id in string*  
  **timestamp:** *The timestamp of the transaction in seconds(BigInt)*  
  **transaction:** *The hash of the transaction in bytes*  
  **block:** *the block number where the transaction occurred*  
