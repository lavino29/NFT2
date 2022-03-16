// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  // Owner del contrato 
    address public owner;


    // Direccion del Smart Contract 
    address public contrato;
	constructor() ERC20("Gold", "GLD") {

        _mint(msg.sender, 10000000000 * 10**18);
        owner = msg.sender;
        contrato = address(this);
    }
    function addSupplyToken(uint amount) external Unicamente(msg.sender) {
        _mint(msg.sender, amount);
    }
    
      // Modificador para hacer funciones solamente accesibles por el owner del contrato
    modifier Unicamente(address _direccion) {
        require (_direccion == owner, "No tienes permisos para ejecutar esta funcion.");
        _;
    }
}



