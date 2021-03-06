let MyToken = artifacts.require("./MyToken.sol");
let MyTokenSales = artifacts.require("./MyTokenSale.sol");
let KycContract = artifacts.require("./KycContract.sol");
require("dotenv").config({path: "../.env"});
module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken,process.env.INTIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(MyTokenSales, 1, addr[0], MyToken.address, KycContract.address);
    let tokenInstance = await MyToken.deployed();
    await tokenInstance.transfer(MyTokenSales.address,process.env.INTIAL_TOKENS);

};