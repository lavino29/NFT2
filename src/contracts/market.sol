// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ERC20.sol";


contract market is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _itemsMarket;
    Token private token;
    uint256 private listingPrice;
    address payable owner;
    address payable private contrato;
    uint256 [] private ListNft;
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(address =>  uint256[]) private listMyNFT;
       struct MarketItem {
      uint256 tokenId;
      address seller;
      address owner;
      uint256 price;
      bool sold;
    }


    event MarketItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );
    
    event MarketItemSold (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price
    );

    constructor(Token _token) ERC721("Metaverse Tokens", "METT") {
      owner = payable(msg.sender);
      token = _token;
      contrato = payable(address(this));
    }

    function balanceContrato() public view returns (uint) {
       return token.balanceOf(address(this));
    }
    //  function balance() public view returns (address) {
    //    return token.transferencia();
    // }
    /* Mints a token */
    function createToken(string memory tokenURI) public payable returns (uint) {
       uint256 precio = 50000 * 1 ether;
      require(token.balanceOf(msg.sender) >= precio  , "insufficient balance");
      
	  	 require(token.transferFrom(msg.sender, address(this), precio));

      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);

      listMyNFT[msg.sender].push(newTokenId);
      
     
      return newTokenId;
    }

    /* allows someone to resell a token they have purchased */
    function createMarketItem(uint256 tokenId, uint256 price) public  {
      require(ownerOf(tokenId) == msg.sender, "Only item owner can perform this operation");
      require(price > 0, "Price must be equal to listing price");
      
      _transfer(msg.sender, address(this), tokenId);
       _itemsMarket.increment();
       idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        msg.sender,
        address(this),
        price * 1 ether,
        false
      );
      uint256[] storage List = listMyNFT[msg.sender];

      for(uint i = 0; i <List.length; i++){
        if(ownerOf(List[i]) == msg.sender){
         List[i]  = i;
        }else{
            require(i < List.length);
            List[i]= List[List.length-1];   
            List.pop();
        }
      }
       listMyNFT[msg.sender] = List;
       
       
        emit MarketItemCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        false
      );
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
      uint256 tokenId
      ) public  {
      uint price = idToMarketItem[tokenId].price ;
      address seller = idToMarketItem[tokenId].seller;
      require(token.balanceOf(msg.sender) >= price , "Please submit the asking price in order to complete the purchase");
      require(idToMarketItem[tokenId].seller != msg.sender);
      token.transfer(seller, price);
      _transfer(address(this), msg.sender, tokenId);
      idToMarketItem[tokenId].owner = msg.sender;
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller =address(0);
      _itemsSold.increment();

     //------------------Remover el nft de la lista, agregarlo al comprador --------------

      uint256[] storage List = listMyNFT[seller];

      for(uint i = 0; i <List.length; i++){
        if(ownerOf(List[i]) == seller){
         List[i]  = i;
        }else{
            require(i < List.length);
            List[i]= List[List.length-1];   
            List.pop();
        }
      }
       listMyNFT[seller] = List;
       listMyNFT[msg.sender].push(tokenId);
       _itemsSold.current();
      emit MarketItemSold (
       tokenId,
       seller,
       owner,
       price
    );
 
      
    }
    /*  Return Todos los Nft que posee el dueño */
     function allMyNFT() public view returns (uint256[] memory) {
       uint256[] memory nft = new uint256[](listMyNFT[msg.sender].length);
       nft = listMyNFT[msg.sender];
    
        return nft;

     }
    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
      
      uint itemCount = _itemsMarket.current() - _itemsSold.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToMarketItem[i+1].owner == address(this)) {
          uint currentId = i+1 ;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
}