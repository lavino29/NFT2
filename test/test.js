const { assert } = require("chai");
const market = artifacts.require('market');
// Llamada al contrato 'Main'
let contrato;
const TokenMain = artifacts.require('TokenMain');
const Token = artifacts.require('Token');
// contract('Token', accounts =>{
//     it('Funcion: transfer', async () => {
//         // Smart contract desplegado
//         let instance = await Token.deployed()
//       //  console.log(instance)
//      // await instance.sendCoin(accounts[2], 10000,{from: accounts[2]})
//       //const res = await instance.transferencia(accounts[1],accounts[0],50000,{from: accounts[3]}) 
//       const balance = await instance.balanceOf(accounts[2])
//       // console.log(balance.toString())
//     })

// })

contract('market', accounts =>{
    it('Funcion: createToken(string memory tokenURI)', async () => {
       // Smart contract desplegado
        let instance = await market.deployed()
        const contra = instance.address
        let instance2 = await Token.deployed()
        await instance2.approve(contra, 100000)
       const result = await instance2.allowance(instance2.address,contra)
        setTimeout(async ()=> {
          let balanceOwner
         await instance.createToken('2')
         await  instance.createToken('1')
          balanceOwner = await instance.balanceOf(accounts[0])
         return console.log(balanceOwner.toString())
        },1000 ) 
        console.log(result.toString())
        // const myNFT = await instance.allMyNFT()
        // const resMyNft =  myNFT.toString().split(',');
        // const balanceOwner = await instance.balanceOf(accounts[0])
        
        // console.log( balanceOwner.toString(),transation.toString())
      // assert.equal(resMyNft.length, balanceOwner)
        
    })
    // it('Funcion: createMarketSale(uint256 tokenId)', async () => {

    // })

})
// contract('Main', accounts => {
//     it('Funcion: getOwner()', async () => {
//         // Smart contract desplegado
//         let instance = await Main.deployed()
//         const direccionOwner = await instance.getOwner.call()
//         console.log('Accounts[0]: ',accounts[0])
//         console.log('Dirección del Owner: ',direccionOwner)
//         assert.equal(accounts[0], direccionOwner)


//     });

//     it ('Función: send_tokens(address _destinatario, uint _numTokens)', async () => {
//         // Smart contract desplegado
//         let instance = await Main.deployed()
//         // Balance inicial
//         inicial_balance_direccion = await instance.balance_direccion.call(accounts[0])
//         inicial_balance_contrato = await instance.balance_total.call()
//         console.log('Balance de accounts[0]:', inicial_balance_direccion)
//         console.log('Balance del Smart Contract:', inicial_balance_contrato)
//         // Envío de tokens
//         await instance.send_tokens(accounts[0], 10, {from: accounts[0]})
//         // Balance una vez hecha la transacción
//         balance_direccion = await instance.balance_direccion.call(accounts[0])
//         balance_contrato = await instance.balance_total.call()
//         console.log('Balance de accounts[0]:', balance_direccion)
//         console.log('Balance del Smart Contract:', balance_contrato)
//         // Verificaciones
//         assert.equal(balance_direccion, parseInt(inicial_balance_direccion) + 10)
//         assert.equal(balance_contrato, parseInt(inicial_balance_contrato) - 10)
//     });



// })