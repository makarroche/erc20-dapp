// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract StrawberryBlondeTokens is ERC20 {
    event TokensMinted(address receiver, uint amount);
    event TokensBurnt(uint amount);
    string choosenTokenName;
    string choosenTokenSymbol;

     constructor(string memory _choosenTokenName, string memory _choosenTokenSymbol) ERC20(_choosenTokenName,_choosenTokenSymbol) {
     }
    
    function safeMint(address _receiver, uint _amount) public {
        _mint(_receiver, _amount);
        emit TokensMinted(_receiver,_amount);
    }

    function safeBurn(uint256 _amount) public {
        _burn(msg.sender,_amount);
        emit TokensBurnt(_amount);
    }
}