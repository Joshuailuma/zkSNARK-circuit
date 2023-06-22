# zkSNARK-circuit

This project generates zero-knowledge circuits, proofs, and solidity verifiers to show the the logic that an input with variable a = 0 and b = 1 will result to an output of c = 0 

## Getting started
The circuit is compiled and verified against a smart contract verifier

```
pragma circom 2.0.0;

/*This circuit template checks that an input of a = 0 and b = 1 results to c = 0.*/  

template Multiplier2 () {  

   // Declaration of signals.  
   signal input a;  
   signal input b;  
   signal output c;  

   // Constraints.  
   c <== b + a + a - b * b;
}
component main = Multiplier2();
```
### Install
`npm i`

### Compile
`npx hardhat compile` 
This will generate the **out** file with circuit intermediaries and geneate the **MultiplierVerifier.sol** contract

### Prove and Deploy
`npx hardhat run scripts/deploy.ts`
This script does 4 things  
1. Deploys the MultiplierVerifier.sol contract
2. Generates a proof from circuit intermediaries with `generateProof()`
3. Generates calldata with `generateCallData()`
4. Calls `verifyProof()` on the verifier contract with calldata

- Step 1 had the contract deployed to the Goerli testnet with contract address `0xe90339e369Bc9C15633e94E176285c736dB4dE64`

# Author
- Joshua Iluma
- Forked from [zardkat](https://github.com/gmchad/zardkat) 