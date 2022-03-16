require('babel-register');
require('babel-polyfill');
require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { KEY, URL } = process.env

module.exports = {
  networks: {
    development: {
      provider: () => new HDWalletProvider(KEY, URL),
      network_id: 80001,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
    // development: {
    //     provider: () =>
    //       new HDWalletProvider({
    //         mnemonic: {
    //           phrase: KEY
    //         },
    //         providerOrUrl: URL,
    //         numberOfAddresses: 1,
    //         shareNonce: true,
    //         derivationPath: "m/44'/1'/0'/0/"
    //       }),
    //     network_id: '80001',
        
    //   }
    }
      // provider:  new HDWalletProvider(mnemonic, "https://polygon-mumbai.g.alchemy.com/v2/1e7OWaZ8QGcC-qJAnsjStK19vwNtu1ll")
      //   ,
      //  network_id: 80001,
      //  gas: 4500000,
      //  gasPrice: 10000000000,
      // host: "127.0.0.1",
      // port: 7545,
      // network_id: "*" // Match any network id
    // },

    // Mumbai : {
    //   provider: function() { 
    //    return new HDWalletProvider(mnemonic, "https://polygon-mumbai.g.alchemy.com/v2/1e7OWaZ8QGcC-qJAnsjStK19vwNtu1ll");
    //   },
    //   network_id: 80001,
    //   gas: 4500000,
    //   gasPrice: 10000000000,
    // }

  // }
  ,
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "^0.8.9",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
