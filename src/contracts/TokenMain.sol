// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC20.sol";



contract TokenMain {
    // Instancia del contrato token 
    Token private token;
    // Owner del contrato 
    address payable public owner;
    mapping(address => bool) reward;
    mapping(address => bool) recivir;
    // Direccion del Smart Contract 
    address public contrato;
    
	constructor(Token _token) {
         token = _token;
         owner = payable(msg.sender);
         contrato = address(this);

    }
	function addSupply(uint amount) public Unicamente(msg.sender){
		token.addSupplyToken(amount);
	}
	   // Modificador para hacer funciones solamente accesibles por el owner del contrato
    modifier Unicamente(address _direccion) {
        require (_direccion == owner, "No tienes permisos para ejecutar esta funcion.");
        _;
    }
    function balance_total() public view returns (uint) {
        return token.totalSupply();
    }
	function DropInicial() public  {
       require(reward[msg.sender] == false);
       //require(recivir[msg.sender] == false);
       if(recivir[msg.sender] == false){
       reward[msg.sender] == true;
       recivir[msg.sender] = true;
	   token.transfer(msg.sender, 150000 * 1 ether);
       }
       

	}
    function myBalancen() public view returns (uint){
        return token.balanceOf(msg.sender);
    }

}