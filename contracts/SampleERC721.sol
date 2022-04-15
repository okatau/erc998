//SPDX-Lecinse-Identifeir: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyToken is ERC721 {
    uint256 tokenCount = 0;

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
}
