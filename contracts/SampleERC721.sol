//SPDX-Lecinse-Identifeir: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SampleERC721 is ERC721 {
    uint256 tokenCount = 1;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function mint721(address _to) public {
        _mint(_to, tokenCount);
        tokenCount++;
    }

    function balance(address _owner) public view returns (uint256) {
        return balanceOf(_owner);
    }

    function STF(
        address _from,
        address _to,
        uint256 _tokenId
    ) public returns (bool success) {
        uint256 _balance1 = balance(_from);
        transferFrom(_from, _to, _tokenId);
        uint256 _balance2 = balance(_from);

        return (_balance2 < _balance1);
    }

    function ownerOfToken(uint256 _tokenId) public view returns (address) {
        address _owner = ownerOf(_tokenId);
        return _owner;
    }

    function get1() external pure returns (uint256) {
        return 1;
    }
}
