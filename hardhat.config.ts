import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("hardhat-deploy")
require("dotenv").config({ path: ".env" });
// https://github.com/projectsophon/hardhat-circom
import "hardhat-circom";
// circuits
import circuits = require('./circuits.config.json')

// set env var to the root of the project
process.env.BASE_PATH = __dirname;
const RPC_URL: string | undefined = process.env.GOERLI_URL;
const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY!;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

// tasks
import "./tasks/newcircuit.ts"

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.6.11",
      }
    ]
  },
  networks: {
    goerli: {
      url: RPC_URL,
      chainId: 5,
      accounts: [PRIVATE_KEY],
    },
    hardhat: {
      chainId: 31337,
    },

    localhost: {
      chainId: 31337,
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  circom: {
    // (optional) Base path for input files, defaults to `./circuits/`
    inputBasePath: "./circuits",
    // (required) The final ptau file, relative to inputBasePath, from a Phase 1 ceremony
    ptau: "powersOfTau28_hez_final_12.ptau",
    // (required) Each object in this array refers to a separate circuit
    circuits: JSON.parse(JSON.stringify(circuits))
  },
};

export default config;
