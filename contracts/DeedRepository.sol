// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

/**
 * @title Repository of ERC721 Deeds
 * This contract contains the list of deeds registered by users.
 * This is a demo to show how tokens (deeds) can be minted and added 
 * to the repository.
 */
contract DeedRepository is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /**
    * @dev Created a DeedRepository with a name and symbol
    * @param _name string represents the name of the repository
    * @param _symbol string represents the symbol of the repository
    */
    constructor(string memory _name, string memory _symbol) ERC721 (_name, _symbol) {

    }
    
    /**
    * @dev Public function to register a new deed and Call the ERC721Token minter
    * @param _uri string containing metadata/uri
    */
    function registerDeed(string memory _uri) public {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _uri);
        emit DeedRegistered(msg.sender, newItemId);
    }

     /**
    * @dev Public function to get the total number of deeds
    */
    function getDeedCount() public view returns (uint256) {
        return _tokenIds.current();
    }


    /**
    * @dev Event is triggered if deed/token is registered
    * @param _by address of the registrar
    * @param _tokenId uint256 represents a specific deed
    */
    event DeedRegistered(address _by, uint256 _tokenId);
}
