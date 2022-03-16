const Migrations = artifacts.require("Migrations");
const token = artifacts.require("token");
const market = artifacts.require("market");
const TokenMain = artifacts.require("TokenMain");
module.exports =  async function (deployer) {
  let ad
  let contractA
  deployer.deploy(Migrations);
  contractA = deployer.deploy(token)
  contractA.then(async a=>{
    ad = a.address
    return( deployer.deploy(market,ad))
    
  }).then(b=> {
    console.log(ad)
   return( deployer.deploy(TokenMain,ad))
  });
  
};  




