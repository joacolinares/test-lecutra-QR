// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WorldTokenCongress is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;

    struct Ticket {
        uint256 id;
        bool claimed;
    }

    mapping(uint256 => string) public _tokenURIs;

    mapping(uint256 => string) public _typeURIs;

    event Minted(address indexed to, uint256[] types);

    constructor() ERC721("World Token Congress", "WTC") Ownable(msg.sender) {}

    function mint(address to, uint256[] memory _types) public onlyOwner {
        for (uint256 i=0; i < _types.length; i++){
            _tokenIdCounter.increment();
            _mint(to, _tokenIdCounter.current());
            _setTokenURI(_tokenIdCounter.current(), _typeURIs[_types[i]]);
        }
        emit Minted(to, _types);
    }

    function _setTokenURI(uint256 tokenId, string memory _uri) internal override {
        _tokenURIs[tokenId] = _uri;
    }

    function setUri(uint256 tokenId, string memory _uri) public onlyOwner {
        _tokenURIs[tokenId] = _uri;
    }

    function setTypeUri(uint256 _type, string memory _uri) public onlyOwner {
        _typeURIs[_type] = _uri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory _tokenURI = _tokenURIs[tokenId];
        return bytes(_tokenURI).length > 0 ? _tokenURI : "";
    }
}
